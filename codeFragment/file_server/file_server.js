var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

// 项目根目录
var root = path.resolve(process.argv[2] || '.')
// 建服务器
var server = http.createServer(function(request, response) {
  // 得到地址栏的路径
  var pathname = url.parse(request.url).pathname;
  // 转化成服务器的路径
  var localPath = path.join(root, pathname);
  // 获取文件状态。如果不出错且是文件的话，就返回文件内容,否则404
  fs.stat(localPath, function(err,stats) {
    if((!err) && stats.isFile() ){
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead('200');
      // 将文件流导向response,response本身就是WriteStream
      fs.createReadStream(localPath).pipe(response);
    }else{
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead('404');
      response.end('404 file not found');
    }
  });

});
server.listen(8080);

console.log('server is listening port 8080')

/*

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var root = path.resolve(process.argv[2] || '.');
console.log(process.argv)
console.log(root)
var server = http.createServer(function(request, response) {
  // 根据url返回相应的文件内容
  // 1、找到url的所指的文件
  // 2. 判断是不是文件
  // 3. 将文件内容返回
  
  var filePath = url.parse(request.url).pathname;
  // 转化为服务器端的本地路径
  var serverPath = path.join(root, filePath);
  fs.stat(serverPath, function(err, data) {
    if(!err && data.isFile()){
      response.writeHead('200');
      // 没有必要手动读取文件内容。由于response对象本身是一个Writable Stream，直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
      fs.createReadStream(serverPath).pipe(response);
    }else{
      response.writeHead('404');
      response.end('404 Not Found');
    }
  })
})
server.listen(8080)
console.log('server is listening port 8080')*/