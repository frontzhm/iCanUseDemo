(function() {
  var suffixObj = {
    aac: "audio/aac",
    mid: "audio/midi",
    midi: "audio/midi",
    oga: "audio/ogg",
    weba: "audio/webm",
    css: "text/css",
    csv: "text/csv",
    html: "text/html",
    ics: "text/calendar",
    avi: "video/x-msvideo",
    mpeg: "video/mpeg",
    opv: "video/ogg",
    // 3gp,3g2没有视频的就是audio/3gpp  audio/3gpp2
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    gif: "image/gif",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    svg: "image/svg+xml",
    tif: "image/tiff",
    tiff: "image/tiff",
    webp: "image/webp",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    abw: "application/x-abiword",
    arc: "application/octet-stream",
    bin: "application/octet-stream",
    azw: "application/vnd.amazom.ebook",
    bz: "application/x-bzip",
    bz2: "application/x-bzip2",
    csh: "application/x-csh",
    doc: "application/msword",
    epub: "application/epub+zip",
    jar: "application/java-archive",
    js: "application/javascript",
    json: "application/json",
    mpkg: "application/vnd.apple.installer+xml",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    ogg: "application/ogg",
    pdf: "application/pdf",
    rtf: "application/rtf",
    xml: "application/xml",
    sh: "application/x-sh",
    ppt: "application/vnd.ms-powerpoint",
    rar: "application/x-rar-compressed",
    swf: "application/x-shockwave-flash",
    tar: "application/x-tar",
    vsd: "application/vnd.visio",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xul: "application/vnd.mozilla.xul+xml",
    zip: "application/zip",
    "7z": "application/x-7z-compressed"
  };
  // 根据路径，得到想要文件的后缀
  function getSuffix(pathname) {
    return pathname.substring(pathname.lastIndexOf('.') + 1).toLowerCase();
  }
  // 根据后缀得到suffixMIME
  function getSuffixMIME(pathname) {
    var suffix = getSuffix(pathname);
    return suffixObj[suffix];
  }

  if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = { getSuffixMIME: getSuffixMIME };
  }

  // If there is a window object, that at least has a document property,
  // define jQuery and $ identifiers
  if (typeof window === "object" && typeof window.document === "object") {
    window.getSuffixMIME = getSuffixMIME;
  }
})();



/*
application:
	.abw	/x-abiword
	.arc/.bin	/octet-stream
	.azw	/vnd.amazom.ebook
	.bz		/x-bzip
	.bz2	/x-bzip2
	.csh	/x-csh
	.doc	/msword
	.epub	/epub+zip
	.jar	/java-archive
	.js		/javascript
	.json	/json
	.mpkg	/vnd.apple.installer+xml
	.odp	/vnd.oasis.opendocument.presentation
	.ods	/vnd.oasis.opendocument.spreadsheet
	.odt	/vnd.oasis.opendocument.text
	.ogg	/ogg
	.pdf	/pdf
	.rtf	/rtf
	.xml	/xml
	.sh		/x-sh
	.ppt	/vnd.ms-powerpoint
	.rar	/x-rar-compressed
	.swf	/x-shockwave-flash
	.tar	/x-tar
	.vsd	/vnd.visio
	.xhtml	/xhtml+xml
	.xls    /vnd.ms-excel
	.xul    /vnd.mozilla.xul+xml
	.zip	/zip
	.7z		/x-7z-compressed



font
	.ttf	/ttf
	.woff	/woff
	.woff2	/woff2
audio:
	.aac	/aac
	.mid/.midi	/midi
	.oga	/ogg
	.wav	/x-wav
	.weba	/webm
video
	.avi    /x-msvideo
	.mpeg	/mpeg
	.ogv	/ogg
	.3gp	video/3gpp  | audio/3gpp( if it doesn't contain video)
	.3g2	video/3gpp2  | audio/3gpp2( if it doesn't contain video)
image
	.gif    /gif
	.ico	/x-icon
	.jpeg	/jpeg
	.jpg 	/jpeg
	.svg	/svg+xml
	.tif	/tiff
	.tiff	/tiff
	.webp	/webp

text:
	.css	/css
	.csv	/csv
	.html	/html
	.ics	/calendar

*/
