# 函数式编程
## 纯函数

> 纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用,也就是一一对应

```
// 不好的代码
var x = 1;
var add = function(t){
  return x+1;
}

add(1); // 2
add(1); // 3

// 好的代码
var add = function(t){
  var x = 1;
  return x+1;
}
add(1); // 2
add(1); // 2
```
一一对应的原则,纯函数很像是无数键值对的组合  add = {1:2,2:3...}
想一下y=x^2,其实纯函数如果x轴和y轴可以表示数字以外的东西,那么就可以在坐标轴上画出来
如果是多个参数的话其实也是一样的,我们可以把它们打包放到数组里，或者把 arguments 对象看成是输入
纯函数就是数学上的函数，而且是函数式编程的全部


## 纯函数的好处
1.可缓存性(Cacheable),相同的输入的话直接取值,不用再执行函数
```
  function add(x,y){
    return x+y;
  }
  var memoize = function(f) {
    var cache = {};
    return function() {
      var arg_str = JSON.stringify(arguments);
      cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
      return cache[arg_str];
    };
  };
  var cacheAdd = memoize(add)
  cacheAdd(1,1)
  cacheAdd(1,1)
```
2.可移植性／自文档化（Portable / Self-Documenting）
  纯函数是完全自给自足的,不受外界干扰,也不影响外界

3.可测试性（Testable）
  输入输出一一对应

4.合理性（Reasonable)
  引用透明性（referential transparency）

5.并行


## 纯函数的工具curry
Currying中文有咖喱的意思,但这里和咖喱没有一毛钱关系；它来自一位数学家的名字Haskell Curry。Haskell编程语言也是以他的名字命名的,在这个语言自身中内置了柯里化，并且所有函数默认都是柯里化的.
> curry 的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。可以一次性地调用 curry 函数，也可以每次只传一个参数分多次调用



```

function new(x){
  return function(y){
    return x+y;
  }
}



// 普通函数
function add(x, y) {
  return x + y;
}
// 柯理化之后得到新的函数
var addFive = curry(add, 5);addFive(4); // 9
// 换种玩法
curry(add, 5)(4); // 9
curry(add)(5)(4); // 9

// 更多参数的玩法
function add(a, b, c, d, e) {
  return a + b + c + d + e;
}
// 可以这样
curry(add, 1, 2, 3)(5, 5); // 16
// 也可以这样,中间产生新函数
var addOne = curry(add, 1);
addOne(10, 10, 10, 10); // 41
// ...
var addSix = curry(addOne, 2, 3);
addSix(5, 5); // 16
// ...
curry(add)(1)(2)(3)(4)(5)



// 只需传一个参数就能得到一个新的函数

```
何种场景使用柯里化(When to Use Currying)?
当你发现你调用同一个的函数，而传递的参数大部分都是一样的时候，那么这个参数就是一个很好的可以柯里化的候选函数。
你可以动态创建一个新函数，部分应用(partial application)一组参数到你的函数。接着新函数会存储重复的参数(那么你就不用每次都传递)，并且会用它们去填充原始函数需要的参数列表。

## 组合函数(flow)

```
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };
// 一般想到的组合
var shout = function(x){
  return exclaim(toUpperCase(x));
}
// 更酷的组合,从左到右或者从右到左,有种flow的概念,一个数据交给一个函数处理得到的结果再继续给下一个函数,一直到最后
// pointfree 模式指的是，永远不必说出你的数据
var shout = compose(exclaim, toUpperCase);

shout("send in the clowns");
//=> "SEND IN THE CLOWNS!"
```

>参考资料:https://jigsawye.gitbooks.io/mostly-adequate-guide/content/ch4.html
http://blog.csdn.net/qq838419230/article/details/8535978


## 延迟执行
```
function yc(f){
  return function(){
    f.apply(this,arguments);
  }
}

function add(x,y){
  return x+y;
}

yc(add)(1,2) === add(1,2);

// =>function(){
      add.apply(this,arguments);
     }

```





## 回忆数学
` 结合律:(a+b)+c = a+(b+c)
` 交换律: a+b = b+a
` 同一律: a+0 = a
` 分配律: c*(a+b) = c*a+c*b


## 函数式表达法

```
function add(a,b){
  return a+b
}

function multiply(a,b){
  return a*b
}


// 结合律（assosiative）
add(add(x, y), z) == add(x, add(y, z));

// 交换律（commutative）
add(x, y) == add(y, x);

// 同一律（identity）
add(x, 0) == x;

// 分配律（distributive）
multiply(x, add(y,z)) == add(multiply(x, y), multiply(x, z));

```

## 函数的身份
函数其实和其他对象一样,你可以像对待任何其他数据类型一样对待它们——把它们存在数组里，当作参数传递，赋值给变量...等等。

看个简单的demo:
```
var hi = function(name){
  return "Hi " + name;
};

var greeting = function(name) {
  return hi(name);
};
```
hi(name) 等于 Hi " + name
也就是完全可以写成:
var greeting = hi

看个稍微复杂些的demo

```
var getServerStuff = function(callback){
  return ajaxCall(function(json){
    return callback(json);
  });
};
// 简化下
var getServerStuff = function(callback){
  return ajaxCall(callback);
};
// 继续简化
var getServerStuff = ajaxCall;

```