/**
 * [formatInput input在输入的时候，在指定的位置加上指定的字符串]
 * @author zhm
 * @anotherdate 2017-06-19T11:34:04+0800
 * @param       {[node]} el [input元素]
 * @param       {[number]} [gap] [在哪几个位置，可以多个参数]
 * @param       {[string]} [splitStr] [不传默认就是空格]
 * @return      {[type]} [description]
 */
function formatInput(el) {
  if (el.nodeType !== 1) {
    throw new Error('el必须是元素');
  }
  var len = arguments.length,
    splitStr = ' ',
    gapArr;

  if (len === 1) {
    throw new Error('请传入插入分隔符的位置');
  }
  if (typeof arguments[len - 1] === 'string') {
    splitStr = arguments[len - 1];
    gapArr = Array.prototype.slice.call(arguments, 1, -1);
  } else {
    gapArr = Array.prototype.slice.call(arguments, 1);
  }

  el.oninput = function() {
    // 得到去掉分隔符之后的数组
    var numbers = this.value.split(splitStr).join('').split('');
    var back = '';

    // 格式化的值赋值给back，在第三个值和第八个值后面加上空格
    numbers.forEach(function(item, index) {
      // back += item + ((index === 2 || index === 6) ? ' ' : '');
      back += item;
      if (gapArr.indexOf(index + 1) !== -1) {
        back += splitStr
      }
    })

    // 如果最后一位是空格或者不是数字的话，干掉。如果你在输第一位的时候，那么第一位就是最后一位。
    var last = back.charAt(back.length - 1);
    if (last === splitStr || isNaN(last)) {
      back = back.substr(0, back.length - 1);
    }

    // 将back赋值给this.value这样就能看到格式化的样式
    this.value = back;
  }

}