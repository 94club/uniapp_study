"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var _maskView,
  _contentView,
  _downloadTask,
  _screenHeight = plus.screen.resolutionHeight,
  _screenWidth = plus.screen.resolutionWidth, 
  _config = { logoUrl: "/static/auto_updater.png", releaseNotes: "", noteAglin: "left", loadingColor: "#ff6666", cancelText: "\u53D6\u6D88",
  cancelColor: "#000000", confirmText: "\u5347\u7EA7", confirmColor: "#ff6666", windowHeight: 220, packageUrl: "" }, 
_calculatePosition = function () {
  var a = (_screenHeight - _config.windowHeight) / 2, b = .1 * _screenWidth / 2; 
  return { top: a, left: b, width: _screenWidth - 2 * b, right: b } 
},
_createMask = function () {
  _maskView = new plus.nativeObj.View("maskView", { top: "0px", left: "0px", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.2)" })
},
_createContentView = function () {
  var a = _calculatePosition();
  _contentView = new plus.nativeObj.View("contentView", { top: a.top + "px", left: a.left + "px", height: _config.windowHeight + "px", width: a.width + "px" }), 
  _contentView.drawRect(
    { color: "#ffffff", radius: "10px" },
    { width: "100%", height: "100%" },
    "roundedRect"
  );
  var b = (a.width - 50) / 2;
  _contentView.drawBitmap(_config.logoUrl, {}, 
    { top: "10px", width: "50px", height: "50px", left: b + "px" }, 
    "autoUpdaterIcon"
  ), 
  _contentView.drawText(_config.releaseNotes,
    { height: _config.windowHeight - 120 + "px", left: "10px", right: "10px", top: "65px" },
    { size: "14px", color: "#2f2f2f", align: _config.noteAglin, verticalAlign: "top", whiteSpace: "normal", overflow: "ellipsis" },
    "autoUpdaterContent"
  ), 
  _createLoading(-1); 
  var c = _config.windowHeight - 50 + 15; 
  _contentView.drawRichText("<font style=\"font-size:20px;\" color=\"" + _config.cancelColor + "\">" + _config.cancelText + "</font>", 
    { width: "50%", top: c + "px", left: "0px" },
    { align: "center", onClick: function () { close() } 
  }, "cancel"), 
  _contentView.drawRichText("<font color=\"" + _config.confirmColor + "\" style=\"font-size:20px;\">" + _config.confirmText + "</font>",
    { width: "50%", right: "0px", top: c + "px" },
    { align: "center", 
    onClick: function () { 
      _config.packageUrl ? "android" === plus.os.name.toLowerCase() ? _createTask() : plus.runtime.openURL(_config.packageUrl) : uni.showToast({ title: "\u5B89\u88C5\u5305\u5730\u5740\u4E3A\u7A7A", icon: "none" }) } }, "submit") 
}, 
_createLoading = function (a) {
  var b = _calculatePosition(),
      c = _config.windowHeight - 60,
      d = (b.width - 100) / 2,
      e = 100 <= a ? "\u4E0B\u8F7D\u5B8C\u6210" : "\u4E0B\u8F7D\u4E2D...",
      f = 0 <= a ? e + "(" + a + "%)" : "";
_contentView.drawRichText("<font color=\"" + _config.loadingColor + "\">" + f + "</font>",
  { width: "100px", top: c + "px", left: d + "px" },
  { align: "center" }, "loading") 
},
_createTask = function () {
  _downloadTask = uni.downloadFile({ 
    url: _config.packageUrl, 
    success: function (a) {
      if (200 === a.statusCode) { 
        var b = a.tempFilePath; 
        plus.runtime.install(b) 
      } 
    }
  }),
  _downloadTask.onProgressUpdate(function (a) {
    _createLoading(a.progress) 
  }) 
},
init = function (a) { 
  var b = a.windowHeight,
      c = a.logo,
      d = a.content,
      e = a.contentAlign,
      f = a.loadingColor,
      g = a.cancel,
      h = a.cancelColor,
      i = a.confirm,
      j = a.confirmColor,
      k = a.packageUrl; 
  b && (_config.windowHeight = b),
  c && (_config.logoUrl = c),
  d && (_config.releaseNotes = d),
  e && (_config.noteAglin = e),
  f && (_config.loadingColor = f),
  g && (_config.cancelText = g),
  h && (_config.cancelColor = h),
  i && (_config.confirmText = i),
  j && (_config.confirmColor = j),
  k && (_config.packageUrl = k),
  _createMask(),
  _createContentView() 
},
show = function () {
  _maskView && _maskView.show(),
  _contentView && _contentView.show() 
},
close = function () {
  _downloadTask && (_downloadTask.abort(), _downloadTask = null, _createLoading(-1)),
  _maskView && _maskView.hide(),
  _contentView && _contentView.hide() 
};
 exports.default = { init: init, show: show, close: close };