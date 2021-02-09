"use strict";

var _BusinessMember = _interopRequireDefault(require("./BusinessMember"));

var _FixedTable = _interopRequireDefault(require("./FixedTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user = new _BusinessMember["default"]("taro", "yamada", "G社");
window.addEventListener("load", function () {
  var tableLists = Array.from(document.getElementsByClassName("js-fixedTable"));
  var tableInstance = tableLists.map(function (table) {
    var item = new _FixedTable["default"](table);
    item.init();
    return item;
  }); /// クリックリスナー登録。useCaptureは true に設定

  var footer = document.getElementById("footer");
  footer.addEventListener("click", showAlert); /// リスナーのコールバック関数

  function showAlert() {
    alert("Button is clicked");
    removeEvent();
  }

  function removeEvent() {
    footer.removeEventListener("click", showAlert);
  }
});