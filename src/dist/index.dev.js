"use strict";

var _BusinessMember = _interopRequireDefault(require("./BusinessMember"));

var _FixedTable = _interopRequireDefault(require("./FixedTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var user = new _BusinessMember["default"]("taro", "yamada", "G社");

var Footer =
/*#__PURE__*/
function () {
  function Footer() {
    _classCallCheck(this, Footer);

    this.init();
  }

  _createClass(Footer, [{
    key: "init",
    value: function init() {
      var footer = document.getElementById("footer");
      this.clickHandler = this.showAlert.bind(this);
      footer.addEventListener("click", this.clickHandler);
    }
  }, {
    key: "removeEvent",
    value: function removeEvent() {
      var footer = document.getElementById("footer");
      footer.removeEventListener("click", this.clickHandler);
    }
  }, {
    key: "showAlert",
    value: function showAlert() {
      alert("Button is clicked");
      this.removeEvent();
    }
  }]);

  return Footer;
}();

window.addEventListener("load", function () {
  var tableLists = Array.from(document.getElementsByClassName("js-fixedTable"));
  var tableInstance = tableLists.map(function (table) {
    var item = new _FixedTable["default"](table);
    item.init();
    return item;
  }); // /// クリックリスナー登録。useCaptureは true に設定
  // var footer = document.getElementById("footer");
  // footer.addEventListener("click", showAlert);
  // /// リスナーのコールバック関数
  // function showAlert() {
  //   alert("Button is clicked");
  //   removeEvent();
  // }
  // function removeEvent() {
  //   footer.removeEventListener("click", showAlert);
  // }

  var test = new Footer();
});