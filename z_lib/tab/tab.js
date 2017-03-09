~ function() {
  // 构造函数 每个tab都是一个对象 
  // tabSelector 是tab的容器
  // defaultIndex 是默认选中的索引
  function TabChange(tabSelector, defaultIndex) {
    // 这样的话 init函数里面的this也是实例
    this.init(tabSelector, defaultIndex);
  }
  TabChange.prototype = {
    // 一定记得写constructor
    constructor: TabChange,
    init: function(tabSelector, defaultIndex) {
      this.tab = tabSelector || null;
      this.head = utils.firstChild(tabSelector);
      this.body = utils.next(this.head);
      this.hdItems = utils.children(this.head);
      this.bdItems = utils.children(this.body);
      this.len = this.hdItems.length;
      this.defaultIndex = defaultIndex || 0;
      this.defaultIndexEvent();
      this.liveClick();

    },
    defaultIndexEvent: function() {
      utils.addClass(this.hdItems[this.defaultIndex], "cur");
      utils.addClass(this.bdItems[this.defaultIndex], "cur");
    },
    detailFn: function(clickEle) {
      // 注意这里的this指点击的元素 所以使用的时候要对应指向
      var index = utils.index(clickEle);
      utils.addClass(clickEle, "cur");
      for (var i = 0; i < this.len; i++) {
        if (i === index) {
          utils.addClass(this.bdItems[i], "cur");
        } else {
          utils.removeClass(this.hdItems[i], "cur");
          utils.removeClass(this.bdItems[i], "cur");
        }
      }
    },
    liveClick: function() {
      var _this = this;
      this.head.onclick = function(e) {
        // 这里面的this=实例.head
        e = e || window.event;
        e.target = e.target || e.srcElement;
        // 点击事件里面的单独放出来 这样方便复用
        if (e.target.tagName.toLowerCase() === "li") {
          _this.detailFn(e.target);
        }
      }
    }
  }
  window.TabChange = TabChange;
}();
