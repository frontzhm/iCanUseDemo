# es6十大特性

Default Parameters（默认参数） in ES6
Template Literals （模板文本）in ES6
Multi-line Strings （多行字符串）in ES6
Destructuring Assignment （解构赋值）in ES6
Enhanced Object Literals （增强的对象文本）in ES6
Arrow Functions （箭头函数）in ES6
Promises in ES6
Block-Scoped Constructs Let and Const（块作用域构造Let and Const）
Classes（类） in ES6
Modules（模块） in ES6


## 1.默认参数



```
// 以前的苦逼行为
var link = function(height,color){

	// 但是是有问题的,因为0也是false
	height = height || 0;
	color = color || 0;
}


// es6

var link = function (height = 50,color ='red'){
	
}


```

## 2.模板对象

```
// 以前
var name = 'Your name is ' + first + ' ' + last + '.';
var url = 'http://localhost:3000/api/messages/' + id;

// es6
var name = `Your name is ${first} ${last}.`
```

## 3.多行字符串

```
// 以前
var roadPoem = 'Then took the other, as just as fair,nt'
    + 'And having perhaps the better claimnt'
    + 'Because it was grassy and wanted wear,nt'
    + 'Though as for that the passing therent'
    + 'Had worn them really about the same,nt';


// es6
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`;


```

## 4.解构赋值

```
// 以前
// house 和 mouse是key，同时house 和mouse也是一个变量
var data = $('body').data(), // data has properties house and mouse
   house = data.house,
   mouse = data.mouse;


// es6
{house,mouse} = $('body').data();
// 同样适用数组
var [col1,col2] = $(".column");
var [line1,line2,line3] = file.split('n')

```

## 5.增强的对象字面量

```
// 典型的es5对象文本
var serviceBase = {port: 3000, url: 'azat.co'},
    getAccounts = function(){return [1,2,3]};
var accountServiceES5 = {
  port: serviceBase.port,
  url: serviceBase.url,
  getAccounts: getAccounts
}

// es6

var serviceBase = {port: 3000, url: 'azat.co'},
getAccounts = function(){return [1,2,3]};
var accountService = {
    __proto__: serviceBase,
    getAccounts
 }

```

## 6.箭头函数

```

// 以前
var logUpperCase = function() {
  var _this = this;
 
  this.string = this.string.toUpperCase();
  return function () {
    return console.log(_this.string);
  }
}
 
logUpperCase.call({ string: 'ES6 rocks' })();
// es6
var logUpperCase = function() {
  this.string = this.string.toUpperCase();
  return () => console.log(this.string);
}
logUpperCase.call({ string: 'ES6 rocks' })();

```

## 7.promise

```
// 以前
setTimeout(function(){
  console.log('Yay!');
}, 1000);

// es6

var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
}).then(function() {
  console.log('Yay!');
});
// 或者箭头函数
var wait1000 =  new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000);
}).then(()=> {
  console.log('Yay!');
});

```


## 8.块作用域和构造let和const

{} :形成块级作用域
let:设置块级作用域的变量
const:设置块级作用域常量

## 9.类

```
class baseModel {
  constructor(options, data) { // class constructor，node.js 5.6暂时不支持options = {}, data = []这样传参
    this.name = 'Base';
    this.url = 'http://azat.co/api';
    this.data = data;
    this.options = options;
   }
 
    getName() { // class method
        console.log(`Class name: ${this.name}`);
    }
}

```

## 10.模块

在ES6以前JavaScript并不支持本地的模块。人们想出了AMD，RequireJS，CommonJS以及其它解决方法。现在ES6中可以用模块import 和export 操作了

```

module.exports = {
  port: 3000,
  getAccounts: function() {
  }
}


```

## 如何使用ES6  (Babel)

ES6已经敲定，但并不是所有的浏览器都完全支持，详见：http://kangax.github.io/compat-table/es6/。要使用ES6，需要一个编译器例如：babel。你可以把它作为一个独立的工具使用，也可以把它放在构建中。grunt，gulp和webpack中都有可以支持babel的插件。

gulp:$ npm install --save-dev gulp-babel
```
var gulp = require('gulp'),
  babel = require('gulp-babel');
gulp.task('build', function () {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
})

```

## es6其他特性
ES6中还有很多可能都用不上（至少现在用不上）的可圈可点的特性，以下无特定顺序：
Math / Number / String / Array / Object中新的方法
二进制和八进制数据类型
自动展开多余参数
For of循环（又见面了CoffeeScript）
Symbols
尾部调用优化
generator
更新的数据结构（如Map和Set）

>参考[http://web.jobbole.com/87140/](http://web.jobbole.com/87140/)