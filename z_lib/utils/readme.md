# 使用js原生代码时,可使用的简单通用库

处理了ie6-8关于数组部分方法的兼容性: indexOf,map,slice
给数组加了一个去重的方法,z_unique.
对于DOM常用的方法进行了归纳总结:
```
return{
	isModernBrowser,
	z_typeof,
	browser,
	// dom操作
	offset,
	win,
	children,
	firstChild,
	lastChild,
	prev,
	next,
	prevAll,
	nextAll,
	sibling,
	siblings,
	index,
	append,
	prepend,
	insertBefore,
	insertAfter,
	// 类名操作
	hasClass,
	addClass,
	removeClass,
	getElementsByClassName,
	// css操作
	css
}

```
