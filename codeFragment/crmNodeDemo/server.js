var
  http = require("http"),
  url = require("url"),
  fs = require("fs"),
  getMime = require("./getSuffixMIME");
var server = http.createServer(function(req, res) {
  var
    urlObj = url.parse(req.url, true),
    query = urlObj.query,
    pathname = urlObj.pathname;
  // 处理静态资源,这边通过是否有后缀名来判断是否是静态资源
  if (/\./.test(pathname)) {
    try {
      var conFile = fs.readFileSync('.' + pathname, "utf-8");
      res.writeHead(200, { 'content-type': getMime.getSuffixMIME(pathname) + ';charset=utf-8' })
      res.end(conFile);
    } catch (e) {
      res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8' });
      res.end('file in not found~');
    }
    return;
  }


  /* 处理API接口*/

  // 因为这些部分是共同的   所以提取出来
  var jsonPath = './json/data.json';
  // data.json里面是 正常数组，但读出来的时候就是字符串
  var conFile = fs.readFileSync(jsonPath, "utf-8");
  // 内容为空的时候，设置为空数组
  conFile.length === 0 && (conFile = "[]");
  // 返回的结果
  var result = null;
  // 将conFile字符串 转换成 数组
  var arr = JSON.parse(conFile);
  var jsonType = { 'content-type': 'text/json;charset=utf-8' };
  var plainType = { 'content-type': 'text/plain;charset=utf-8' };
  switch (pathname) {
    // 列表
    case "/list":
      // 0的话就是false
      result = arr.length ? { code: 1, message: "成功", content: { data: arr } } : { code: 0, message: "没有客户" };
      // 头信息必须写
      res.writeHead(200, jsonType);
      // 返回的数据必须是json字符串
      res.end(JSON.stringify(result));
      break;
      // 详情
    case '/detail':
      var id = query.id;
      // 没有传id
      if (typeof id === "undefined") {
        result = { code: 0, message: "缺少参数id" }
      } else {
        // 判断有没有id
        var hasIdIndex = null;
        var hasId = arr.some(function(item, index) {
          if (item.id == id) {
            hasIdIndex = index;
            return true;
          }
        });
        result = hasId ? { code: 1, message: "成功", content: { data: arr[hasIdIndex] } } : { code: 0, message: "该用户id不存在" };
      }
      res.writeHead(200, jsonType);
      res.end(JSON.stringify(result));
      break;
    case '/del':
      var id = query.id;
      // 没有传id
      if (typeof id === "undefined") {
        result = { code: 0, message: "缺少参数id" }
      } else {
        console.log(id)
        var hasId = arr.some(function(item, index) {
          if (item.id == id) {
            arr.splice(index, 1);
            // 写入需要用字符串
            fs.writeFileSync(jsonPath, JSON.stringify(arr), "utf-8");
            return true;
          }
        });
        result = hasId ? { code: 1, message: "删除成功" } : { code: 0, message: "该用户id不存在" };
      }
      res.writeHead(200, jsonType);
      res.end(JSON.stringify(result));
      break;
    case '/add':
      var data = "";
      req.on('data', function(chunk) {
        data += chunk;
        console.log("chunk " + data)
      });
      // 这边的监听是异步事件
      req.on('end', function(chunk) {
        if (!data.length) {
          // 参数没有
          result = { code: 0, message: "参数不完整" };
        } else {
          data = JSON.parse(data);
          data.id = arr[arr.length - 1].id - 0 + 1;
          arr[arr.length] = data;
          fs.writeFileSync(jsonPath, JSON.stringify(arr), "utf-8");
          result = { code: 1, message: "添加成功" };
        }
        res.writeHead(200, jsonType);
        res.end(JSON.stringify(result));
      })

      break;
    case '/modify':
      var data = "";
      req.on('data', function(chunk) {
        data += chunk;
        console.log("chunk " + data)
      });
      // 这边的监听是异步事件
      req.on('end', function(chunk) {
        console.log(data)
        console.log("data")
        if (!data.length) {
          // 参数没有
          result = { code: 0, message: "参数不完整" };
        } else {
        	data = JSON.parse(data);
        	var id = data.id;
          if (typeof id === "undefined") {
            result = { code: 0, message: "缺少参数id" }
          } else {
            var hasId = arr.some(function(item, index) {
              if (item.id == id) {
                arr[index] = data;
                // 写入需要用字符串
                fs.writeFileSync(jsonPath, JSON.stringify(arr), "utf-8");
                return true;
              }
            });
            result = hasId ? { code: 1, message: "修改成功" } : { code: 0, message: "该用户id不存在" };
          }
        }
        res.writeHead(200, jsonType);
        res.end(JSON.stringify(result));
      })
      break;
    default:
      // 如果请求的地址不是上述任何一个,则提示不存在
      res.writeHead(404, plainType);
      res.end("请求的数据接口不存在");
  }

})
server.listen(80, function() {
  console.log("listening 80 port")
})
