var utils = (function() {

  var isModernBrowser = "getComputedStyle" in window;

  // IE 6-8的兼容性
  if (!isModernBrowser) {
    function indexOf(item) {
      for (var i = 0; i < this.length; i++) {
        if (item === this[i]) {
          return i;
        }
      }
      return -1
    }

    function map(callback) {
      var res = [];
      for (var i = 0; i < this.length; i++) {
        callback(this[i], i, this);
      }
      return res;
    }



    function slice(start, end) {
      var len = this.length;
      start = start || 0;
      start = start < 0 ? len + start : start;
      end = end || len;
      end = end < 0 ? len + end : end;
      end = end > len ? len : end;
      var
        i,
        size = end - start,
        res = [];
      if (size > 0) {
        for (i = start; i < end; i++) {
          res[res.length] = this[i];
        }
      }
      return res;

    }
    Array.prototype.indexOf = indexOf;
    Array.prototype.map = map;
    Array.prototype.slice = slice;


    // JSON.parse
    function jsonParse(str) {
      return eval("(" + str + ")");
    }
  }

  // 检测类型
  function z_typeof(para) {
    if (typeof undefined === "undefined") {
      return "undefined"
    }
    if (typeof null === "null") {
      return "null"
    }
    return Object.prototype.toString.call(para).slice(8, -1).toLowerCase();
  }

  /*
    数组相关的方法
   */
  // 数组去重
  function z_unique() {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
      var cur = this[i];
      if (!cur in obj) {
        obj[cur] = cur;
      }
      cur = this[this.length - 1];
      this.length--;
      i--;
    }
    obj = null;
    return this;
  }
  Array.prototype.z_unique = z_unique;
  /*
    dom相关的
   */
  // 元素和body的offset
  function offset(ele) {
    var
      parent = ele.offsetParent,
      left = ele.offsetLeft,
      top = ele.offsetTop;
    while (parent) {
      if (!navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        left += parent.clientTop;
        top += parent.clientLeft;
      }
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {
      left: left,
      top: top
    }
  }
  // 浏览器的属性,只有scrollTop/Left可以设置,其余是只读属性
  function win(attr, value) {
    if (typeof value === "undefined") {
      return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
  }
  /**
   * DOM的方法
   */
  // 子节点,或者指定标签的子节点
  function children(ele, tagName) {
    if (isModernBrowser) {
      return Array.prototype.slice.call(ele.children);
    }
    var
      res = [],
      childNodes = ele.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      var cur = childNodes[i];
      if (cur.nodeType === 1) {
        if (typeof tagName === "undefined") {
          res[res.length] = i;
        }
        if (typeof tagName === "string" && cur.nodeName.toLowerCase() === tagName.toLowerCase()) {
          res[res.length] = i;
        }
      }
    }
    return res;
  }

  // 第一个子节点
  function firstChild(ele) {
    var kids = children(ele);
    return kids.length === 0 ? null : kids[0]
  }
  // 最后一个节点
  function lastChild(ele) {
    var kids = children(ele);
    return kids.length === 0 ? null : kids[kids.length - 1];
  }

  // 获得哥哥的节点
  function prev(ele) {
    if (isModernBrowser) {
      return ele.previousElementSibling;
    }
    var res = ele.previousSibling;
    while (res && res.nodeType !== 1) {
      res = res.previousSibling;
    }
    return res;
  }

  // 获得弟弟节点
  function next(ele) {
    if (isModernBrowser) {
      return ele.nextElementSibling;
    }
    var res = ele.nextSibling;
    while (res && res.nodeType !== 1) {
      res = res.nextSibling;
    }
    return res;
  }

  // 获得所有哥哥节点
  function prevAll(ele) {
    var
      res = [],
      prevNode = prev(ele);

    while (prevNode) {
      // 注意顺序
      res.unshift(prevNode);
      prevNode = prev(prevNode);
    }
    return res;
  }

  // 获得所有弟弟节点
  function nextAll(ele) {
    var
      res = [],
      nextNode = next(ele);

    while (nextNode) {
      // 注意顺序
      res[res.length] = nextNode;
      nextNode = next(nextNode);
    }
    return res;
  }

  // 获得相邻的哥哥弟弟节点
  function sibling(ele) {
    var res = [];
    if (prev(ele)) {
      res[res.length] = prev(ele);
    }
    if (next(ele)) {
      res[res.length] = next(ele);
    }
    return res;
  }


  // 获得所有兄弟的节点
  function siblings(ele) {
    return prevAll(ele).concat(nextAll(ele));
  }

  // 获得当前元素索引
  function index(ele) {
    return prevAll(ele).length;
  }

  // 向指定容器末尾追加元素
  function append(newEle, container) {
    container.appendChild(newEle);
  }
  // 向指定容器开头追加元素(原生的只提供 appendChild insertBefore)
  function prepend(newEle, container) {
    var first = firstChild(container);
    if (first) {
      container.insertBefore(newEle, first);
      return;
    }
    container.appendChild(newEle);
  }
  // 把新元素追加到指定元素前面(parentNode)
  function insertBefore(newEle, oldEle) {
    oldEle.parentNode.insertBefore(newEle, oldEle);
  }
  // 把新元素追加到指定元素后面
  function insertAfter(newEle, oldEle) {
    var nextNode = next(oldEle);
    if (nextNode) {
      oldEle.parentNode.insertBefore(newEle, nextNode);
      return;
    }
    oldEle.parentNode.appendChild(newEle);
  }

  // 判断类名的有无(className是属性)
  function hasClass(ele, className) {
    // className去掉首尾空格
    className = className.replace(/^ +| +$/g, "");
    var reg = new RegExp("(^| +)" + className + "( +|$)");
    var classes = ele.className;
    return reg.test(classes);
  }
  // 加类名,但需要判断是否已经有了该类名
  function addClass(ele, className) {
    className = className.replace(/^ +| +$/g, "");
    var newClasses = className.split(/ +/);
    newClasses.map(function(item, index, arr) {
        if (!hasClass(ele, item)) {
          ele.className += " " + item;
        }
      })
      /*   for (var i = 0; i < newClasses.length; i++) {
           var cur = newClasses[i];
           if(!hasClass(ele,cur)){
             ele.className += " " + cur;
           }
         }*/
  }

  // 删类名
  function removeClass(ele, className) {
    var newClasses = className.split(/ +/);
    newClasses.map(function(item) {
      if (hasClass(ele, item)) {
        var reg = new RegExp("(?:^| +)" + item + "(?: +|$)", "g");
        ele.className = ele.className.replace(reg, " ");
      }
    })
  }

  // 通过类名获得元素(原生的只有id tagName)
  function getElementsByClassName(className, context) {
    context = context || document;
    if (isModernBrowser) {
      return Array.prototype.slice.call(context.getElementsByClassName(className));
    }
    var nodes = Array.prototype.slice.call(context.getElementsByTagName("*")),
      res = [];
    nodes.map(function(item) {
      if (hasClass(item, className)) {
        res[res.length] = item;
      }
    })
    return res;
  }
  // 获取css
  function getCss(ele, attr) {
    var res;
    if (isModernBrowser) {
      res = window.getComputedStyle(ele, null)[attr];
    } else {
      if (attr === "opacity") {
        // filter:alpha(opacity=10.9),匹配小数 /\d+(?:\.\d+)?/
        var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
        res = ele.currentStyle["filter"];
        // 看是否存在
        res = reg.test(res) ? reg.exec(res)[1] / 100 : 1;
      } else {
        res = ele.currentStyle[attr];
      }
    }
    // 去单位
    var reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
    return reg.test(res) ? parseFloat(res) : res;
  }
  // 设置css
  function setCss(ele, attr, value, unit) {
    // 在js中设置float 也要设置兼容
    if (attr === "float") {
      // 现代浏览器
      ele["style"]["cssFloat"] = value;
      // ie6-8 opera
      ele["style"]["styleFloat"] = value;
      return;
    }
    // opacity在ie6-8不兼容 设置两套样式
    if (attr === "opacity") {
      // 现代浏览器
      ele["style"]["opacity"] = value;
      ele["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
      return;
    }

    // 对于某些样式属性 如果传递的值没有单位,需要把单位默认的补上,这样的话,方法更人性化
    // width height top bottom  leftright padding margin
    // 处理常用的属性
    var reg = /^(width)|(height)|(top)|(bottom)|(left)|(right)|((margin|padding)((Top|Bottom|Left|Right)?))$/;
    if (reg.test(attr)) {
      unit = unit || "px";
      // 判断传递进来的值是否是纯数字
      if (!isNaN(value))
        value += unit
    }

    ele["style"][attr] = value;
  }

  // 设置多项属性
  function groupCss(ele, options) {
    for (var key in options) {
      options.hasOwnProperty(key) && setCss(ele, key, options[key]);
    }
  }

  function css(ele) {
    // getCss(ele, attr)
    // setCss(ele, attr, val, unit)
    // groupCss(ele, options)
    if (arguments.length === 2) {
      if (typeof arguments[1] !== "string") {
        // groupCss(ele, options),这里还可以改写groupCss.call(ele, arguments[1]),这样的话上面三个函数里面的ele就要改成this
        groupCss(ele, arguments[1]);
        return;
      }
      return getCss(ele, arguments[1]);
    }
    var unit = arguments[3] || "px";
    setCss(ele, arguments[1], arguments[2], unit);
  }

  return {
    isModernBrowser: isModernBrowser,
    z_typeof: z_typeof,
    // 以下是dom的操作
    offset: offset,
    win: win,
    children: children,
    firstChild: firstChild,
    lastChild: lastChild,
    prev: prev,
    next: next,
    prevAll: prevAll,
    nextAll: nextAll,
    sibling: sibling,
    siblings: siblings,
    index: index,
    append: append,
    prepend: prepend,
    insertBefore: insertBefore,
    insertAfter: insertAfter,
    // 类名操作
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    getElementsByClassName: getElementsByClassName,
    // css操作
    css: css
  }
})();
