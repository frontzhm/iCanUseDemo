// 要拖拽元素的id  直接调用drag(id)
function drag(eleid) {
  function id(id) {
    return document.getElementById(id);
  }

  function c(str) {
    console.log(str);
  }
  // 鼠标按下的时候获得鼠标和该元素的相对位置
  function fndown(e, left, top) {
    var x = e.clientX,
      y = e.clientY;
    relx = x - left;
    rely = y - top;
    return {
      relx: relx,
      rely: rely
    }
  }
  // 鼠标移动的时候 一般情况下元素跟随鼠标移动 但是有最大范围
  function fnmove(e, relx, rely, neww, newh) {
    var moveleft = e.clientX - relx,
      movetop = e.clientY - rely,
      winx = document.documentElement.clientWidth || document.body.clientWidth,
      winh = document.documentElement.clientHeight || document.body.clientHeight,
      maxw = winx - neww,
      maxh = winh - newh;
    moveleft < 0 && (moveleft = 0);
    movetop < 0 && (movetop = 0);
    moveleft > maxw && (moveleft = maxw);
    movetop > maxh && (movetop = maxh);
    oele.style.left = moveleft + "px";
    oele.style.top = movetop + "px";
    left = moveleft;
    top = movetop;
  }

  // 将拖拽的元素设置成absolute 且放一个元素顶替其在正常流中的位置以免页面错乱
  var oele = id(eleid),
    w = oele.offsetWidth,
    h = oele.offsetHeight,
    left = oele.offsetLeft,
    top = oele.offsetTop,
    relx = null,
    rely = null,
    newitem = document.createElement("div");
  newitem.style.width = w + "px";
  newitem.style.height = h + "px";
  oele.parentNode.insertBefore(newitem, oele);
  oele.style.left = left + "px";
  oele.style.top = top + "px";
  oele.style.position = "absolute";
  // 定位之后新的宽高
  var neww = oele.offsetWidth,
    newh = oele.offsetHeight;
  // 鼠标按下
  oele.onmousedown = function(e) {
    e = e || window.event;
    fndown(e, left, top);
    console.log(left)
      // 鼠标移动
    document.onmousemove = function(e) {
        e = e || window.event;
        fnmove(e, relx, rely, neww, newh);
        console.log(left)
      }
      // 鼠标松开的时候
    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;

    }
  };

};
