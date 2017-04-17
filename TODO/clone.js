(function(){
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]"
  }

  function cloneArray(arr) {
    var res = [];
    var i, length = arr.length;
    for (i = 0; i < length; i++) {
      if (Array.isArray(arr[i])) {
        res[i] = cloneArray(arr[i]);
      }else if(isPlainObject(arr[i])){
        res[i] = cloneObject(arr[i]);
      }else {
        res[i] = arr[i];
      }
    }
    return res;
  }

  function cloneObject(obj) {
    var res = {};
    var i;
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (isPlainObject(obj[i])) {
          res[i] = cloneObject(obj[i]);
        }else if (Array.isArray(obj[i])) {
          res[i] = cloneArray(obj[i]);
        } else {
          res[i] = obj[i];
        }
      }
    }
    return res;
  }

  function clone(param){

    if(Array.isArray(param)){
      return cloneArray(param);

    }
    if(isPlainObject(param)){
     return cloneObject(param)
    }

  }
  window.clone = clone;
})()