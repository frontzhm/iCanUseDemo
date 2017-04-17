根据路径名得到文件的suffixMIME
eg."demo/index.html" -> "text/html"
// js
var mime = getSuffixMIME(pathname);

// nodejs
var getMime = require('./getSuffixMIME');
var mime = getMime.getSuffixMIME(pathname)

