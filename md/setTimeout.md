> 参照晚晴幽草轩轩主[<<你所不知道的setTimeout>>](http://www.jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/)

> 参照愚人码头的[<<你所不了解的setTimeout>>](http://www.css88.com/archives/5804)
# 仔细认识setTimeout

## setTimeout的基础

setTimeout表示在指定时间后执行某函数或某代码,返回一个定时器的编号,以便于取消它.
注意:如果放代码的话,必须是字符串形式,引擎内部使用eval,但为了安全和优化考虑,一般用函数名或函数的形式


语法: setTimeout(fn|code,delay)

demo:

```
var timer = setTimeout(function() {
  console.log(3)
}, 1000)

var timer2 = setTimeout("console.log(4)", 1000)
console.log(timer)
console.log(timer2)

// 依次输出1,2,3,4
```

### setTimeout其实不止两个参数
ie6-9的版本只支持两个参数,因此绝大部分都会只写两个参数(怪不得我没见过=.=)
其实,可以有更多的参数,第三个参数及以后的参数,会当做参数值依次传到函数里

demo:

```
function fn (a,b) {

	console.log(a+b);
}
// 3
setTimeout(fn,1000,1,2);


// 只能两个参数的话,要不借助另外一个函数
setTimeout(function(){
	fn(1,2)
},1000)

// 要不用bind(但ie6-8也不支持bind),bind方法第一个参数是undefined，表示将原函数的this绑定全局作用域，第二个参数是要传入原函数的参数。它运行后会返回一个新函数，该函数不带参数
setTimeout(fn.bind(null,1,2),1000)


```
> 0秒延迟，此回调将会放到一个能立即执行的时段进行触发。javascript代码大体上是自顶向下的，但中间穿插着有关DOM渲染，事件回应等异步代码，他们将组成一个队列，零秒延迟将会实现插队操作。
不写第二个参数，浏览器自动配置时间，在IE，FireFox中，第一次配可能给个很大的数字，100ms上下，往后会缩小到最小时间间隔，Safari，chrome，opera则多为10ms上下。

### setTimeout中回调函数中的this

首先看个demo

```
var obj = {

	fn:function () {
		console.log(this);
	}
}
var f = obj.fn;
// window
f();
// obj
obj.fn();

```
执行的时候,如果没有.,那么指的是全局环境.

setTimeout推迟执行的回调函数也是如此,开始只是绑定并未执行,执行的时候纯粹是函数在执行

```
var obj = {

	fn:function () {
		console.log(this);
	}
}
// window,这里相当于 f= obj.fn;f();
setTimeout(obj.fn,1000)

```
换言之,setTimeout的回调函数里面的this,没有特殊指定就是全局环境,特殊指定的话用bind

```
function User(login) {
  this.login = login;
  this.sayHi = function() {
    console.log(this.login);
  }
}
var user = new User('John');
// undefined
setTimeout(user.sayHi, 1000);

// 'John'
setTimeout(user.sayHi.bind(user), 1000);

// 'John'
setTimeout(function(){
	user.sayHi();
}, 1000);


```
说起来,顺手总结下,想要回调函数带参数和指定this,有两种方法,放在匿名函数中执行和bind



### setTimeout执行回调间隔时间长度

HTML 5标准规定，setTimeout的最短时间间隔是4毫秒。为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒。另外，如果笔记本电脑处于电池供电状态，Chrome和IE 9以上的版本，会将时间间隔切换到系统定时器，大约是15.6毫秒。

```
var startTime = new Date();
setTimeout(function () {
    console.log(new Date() - startTime);
}, 100)
// 改变i的值,时间就会不一样
for(var i=1;i<100000000;i++){
	var sum = 1;
	sum+=i;
}

```

请问最后打印的是多少?其正确答案是，取决于后面同步执行的js需要占用多少时间。
即为：MAX(同步执行的时间, 100)(在这两个值直接取最大的那个值)；缘何如此，就得看下setTimeout运行机制了。

## setTimeout的运行机制

setTimeout和setInterval的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。

看个栗子
```
setTimeout(someTask,100);
veryLongTask();

```
上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面立即运行的任务（当前脚本的同步任务））非常耗时，过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到前面的veryLongTask运行结束，才轮到它执行。


## setTimeout(func,0)

运行下面代码，func1和func2谁会先执行？很明显func2先执行；
```
setTimeout(function () {
    func1();
}, 0)
func2();

```
因为setTimeout运行机制说过，必须要等到当前脚本的同步任务和“任务队列”中已有的事件，全部处理完以后，才会执行setTimeout指定的任务。也就是说，setTimeout的真正作用是，在“任务队列”的现有事件的后面再添加一个事件，规定在指定时间执行某段代码。setTimeout添加的事件，会在下一次Event Loop执行。

setTimeout(f,0)将第二个参数设为0，作用是让f在现有的任务（脚本的同步任务和“任务队列”中已有的事件）一结束就立刻执行。也就是说，setTimeout(f,0)的作用是，尽可能早地执行指定的任务。

0毫秒实际上达不到的。根据HTML5标准，setTimeOut推迟执行的时间，最少是4毫秒。如果小于这个值，会被自动增加到4。这是为了防止多个setTimeout(f,0)语句连续执行，造成性能问题。
另一方面，浏览器内部使用32位带符号的整数，来储存推迟执行的时间。这意味着setTimeout最多只能推迟执行2147483647毫秒（24.8天），超过这个时间会发生溢出，导致回调函数将在当前任务队列结束后立即执行，即等同于setTimeout(f,0)的效果。



## setTimeout(f,0)应用

### 调整事件的发生顺序

网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。如果，我们先让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)

```
// <input type="button">
var input = document.getElementsByTagName('input')[0];
input.onclick = function A() {

  setTimeout(function B() {
    input.value +=' input';
  }, 0)
};
document.body.onclick = function C() {
  input.value += ' body'
};

```
上面代码在点击按钮后，先触发回调函数A，然后触发函数C。在函数A中，setTimeout将函数B推迟到下一轮Loop执行，这样就起到了，先触发父元素的回调函数C的目的了。

用户自定义的回调函数，通常在浏览器的默认动作之前触发。比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。

```
document.getElementById('input-box').onkeypress = function(event) {
  this.value = this.value.toUpperCase();
}
```
上面代码想在用户输入文本后，立即将字符转为大写。但是实际上，它只能将上一个字符转为大写，因为浏览器此时还没接收到文本，所以this.value取不到最新输入的那个字符。只有用setTimeout改写，上面的代码才能发挥作用。

```
// 将代码放入setTimeout之中，就能使得它在浏览器接收到文本之后触发
document.getElementById('my-ok').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
```

### 分割耗时任务

众所周知javascript是单线程的，特点就是容易出现阻塞。如果一段程序处理时间很长，很容易导致整个页面hold住。什么交互都处理不了怎么办？
简化复杂度？复杂逻辑后端处理？html5的多线程？...
上面都是ok的做法，但是setTimeout也是处理这种问题的一把好手。setTimeout一个很关键的用法就是分片，如果一段程序过大，我们可以拆分成若干细小的块。由于setTimeout(f,0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f,0)里面执行(分片塞入队列)，这样即使在复杂程序没有处理完时，我们操作页面，也是能得到即时响应的。其实就是将交互插入到了复杂程序中执行。

```
var div = document.getElementsByTagName('div')[0];
// 写法一
for(var i=0xA00000;i<0x100100;i++) {
  div.style.backgroundColor = '#'+i.toString(16);
}
// 写法二
var timer = setTimeout(func, 0);;
var i=0x100000;
function func() {
	clearInterval(timer);
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#'+i.toString(16);
  i++;
  if (i === 0x100100) clearInterval(timer);;
}

```
上面代码有两种写法，都是改变一个网页元素的背景色。写法一会造成浏览器“堵塞”，而写法二就能就不会，这就是setTimeout(f,0)的好处。即：可利用setTimeout实现一种伪多线程的概念。


## clearTimeout()

setTimeout和setInterval函数，都返回一个表示计数器编号的整数值，将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。

setTimeout和setInterval返回的整数值是连续的(一定环境下，比如浏览器控制台，或者js执行环境等)，也就是说，第二个setTimeout方法返回的整数值，将比第一个的整数值大1。利用这一点，可以写一个函数，取消当前所有的setTimeout。

> clearInterval()和clearTimeout()其实是通用的，就是说你可以用 clearInterval() 取消 setTimeout() 执行，clearTimeout()同样可以取消 setInterval() 执行。

```

(function() {

  var gid = setInterval(clearAllTimeouts, 0);
  function clearAllTimeouts() {
    var id = setTimeout(function() {}, 0);
    while (id > 0) {
      if (id !== gid) {
        clearTimeout(id);
      }
      id--;
    }
  }
})();

// 运行上面代码后，实际上再设置任何setTimeout都无效了。
```

下面是一个clearTimeout实际应用的例子。有些网站会实时将用户在文本框的输入，通过Ajax方法传回服务器，jQuery的写法如下。
```
$('textarea').on('keydown', ajaxAction);
```
这样写有一个很大的缺点，就是如果用户连续击键，就会连续触发keydown事件，造成大量的Ajax通信。这是不必要的，而且很可能会发生性能问题。正确的做法应该是，设置一个门槛值，表示两次Ajax通信的最小间隔时间。如果在设定的时间内，发生新的keydown事件，则不触发Ajax通信，并且重新开始计时。如果过了指定时间，没有发生新的keydown事件，将进行Ajax通信将数据发送出去。
这种做法叫做debounce（防抖动）方法，用来返回一个新函数。只有当两次触发之间的时间间隔大于事先设定的值，这个新函数才会运行实际的任务。假定两次Ajax通信的间隔不小于2500毫秒，上面的代码可以改写成下面这样。
```
$('textarea').on('keydown', debounce(ajaxAction, 2500))

```

利用setTimeout和clearTimeout，可以实现debounce方法。该方法用于防止某个函数在短时间内被密集调用，具体来说，debounce方法返回一个新版的该函数，这个新版函数调用后，只有在指定时间内没有新的调用，才会执行，否则就重新计时。
```
function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function(){
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(context, args);
    }, delay);
  };
}
// 用法示例
var todoChanges = debounce(batchLog, 1000);
Object.observe(models.todo, todoChanges);

```
现实中，最好不要设置太多个setTimeout和setInterval，它们耗费CPU。比较理想的做法是，将要推迟执行的代码都放在一个函数里，然后只对这个函数使用setTimeout或setInterval。


## 如何使用setTimeout

慎用.
setTimeout一般作为一个hack的方式使用,更多的出现是在框架和类库中,想去造一些轮子的话，setTimeout还是必不可少的工具。

