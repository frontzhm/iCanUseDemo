// This function creates a new anchor element and uses location
// properties (inherent) to get the desired URL data. Some String
// operations are used (to normalize results across browsers).
// (个人翻译:)通过创建a元素,使用内置的属性和方法来得到url上的数据,兼容ie6


function parseURL(url) {
  var a = document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function() {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
}
/*    file: (a.pathname.match( //([^/?#]+)$/i) || [,''])[1],
          hash: a.hash.replace('#', ''),
          path: a.pathname.replace(/^([^/])/, '/$1'),
          relative: (a.href.match(/tps?:/ / [ ^ /]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^/ / , '').split('/')
          };
        }
        // Usage
        var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');

        myURL.file; // = 'index.html'
        myURL.hash; // = 'top'
        myURL.host; // = 'abc.com'
        myURL.query; // = '?id=255&m=hello'
        myURL.params; // = Object = { id: 255, m: hello }
        myURL.path; // = '/dir/index.html'
        myURL.segments; // = Array = ['dir', 'index.html']
        myURL.port; // = '8080'
        myURL.protocol; // = 'http'
        myURL.source; // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
*/
/*

// https://www.baidu.com:80/app/pages/index.html?a=1&b=3&c=6#a#4
// href:"https://www.baidu.com:80/app/pages/index.html?a=1&b=3&c=6#a#4"
// protocol:"https:"
// host:"www.baidu.com:80"
// hostname:"www.baidu.com"
// port:"80"
// pathname:"/app/pages/index.html" 如果什么都不写 默认是"/"
// search:"?a=1&b=3&c=6"
// hash:"#a#4"


*/