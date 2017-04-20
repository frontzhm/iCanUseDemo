运行
  node server.js
  地址栏访问 localhost/index.html
  
 
##node server.js 的注意点
1. 返回数据是字符串
2. 404的文件
3. 404的接口
4. 注意内容没有的情况
5. 接受post传来数据的时候，req.on('data',function(chunk){}) rea.on('end',function(){})
6. 返回内容之前 写头文件 res.writeHead(404, { 'content-type': 'text/plain;charset=utf-8' });
