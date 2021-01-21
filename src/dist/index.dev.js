'use strict';

var _BusinessMember = _interopRequireDefault(require("./BusinessMember"));

var _FixedTable = _interopRequireDefault(require("./FixedTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user = new _BusinessMember["default"]('taro', 'yamada', 'G社');
window.addEventListener('load', function () {
  var tableLists = Array.from(document.getElementsByClassName('js-fixedTable'));
  var tableInstance = tableLists.map(function (table) {
    var item = new _FixedTable["default"](table);
    item.init();
    return item;
  }); // console.log(tableInstance)
});