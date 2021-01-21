/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BusinessMember.js":
/*!*******************************!*\
  !*** ./src/BusinessMember.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BusinessMember; });
/* harmony import */ var _Member__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Member */ "./src/Member.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var BusinessMember = /*#__PURE__*/function (_Member) {
  _inherits(BusinessMember, _Member);

  var _super = _createSuper(BusinessMember);

  function BusinessMember(firstName, lastName, company) {
    var _this;

    _classCallCheck(this, BusinessMember);

    _this = _super.call(this, firstName, lastName); // 親クラスのコンストラクタは、コンストラクタの1行目で記載する必要がある

    _this.company = company;
    return _this;
  }

  _createClass(BusinessMember, [{
    key: "getName",
    value: function getName() {
      return this.lastName + ' ' + this.firstName + '/' + this.company;
    }
  }, {
    key: "company",
    get: function get() {
      return this._company;
    },
    set: function set(value) {
      this._company = value;
    }
  }]);

  return BusinessMember;
}(_Member__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/FixedTable.js":
/*!***************************!*\
  !*** ./src/FixedTable.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FixedTable; });
 // ----------------------------
// ★メモ★
// col ... 列（たて）
// row ... 行（よこï）
// ----------------------------

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FixedTable = /*#__PURE__*/function () {
  function FixedTable(el) {
    _classCallCheck(this, FixedTable);

    this.wrap = el;
    this.originTableWrap = null;
    this.originTable = null;
    this.cloneTableWrap = null;
    this.cloneTable = null;
    this.type = null;
  }

  _createClass(FixedTable, [{
    key: "init",
    value: function init() {
      this.originTableWrap = this.wrap.children[0];
      this.originTable = this.originTableWrap.children[0];
      this.setFixedStyle();
    } // ----------------------------
    // テーブルの種類わけ
    // ----------------------------

  }, {
    key: "setFixedStyle",
    value: function setFixedStyle() {
      // 縦横スクロールだったら
      if (this.wrap.classList.contains('js-fixedTable-vh')) {
        console.log('縦横');
        this.type = 'vh';
        this.maxHeight = this.wrap.getAttribute('data-height');
        var flag = this.judgeOverflow();

        if (flag === true) {
          this.getScrollbarWidth();
          this.wrap.classList.add('scroll-vh');
          this.colneFourTable();
          this.setFirxedColRowStyle();
          this.setFirxedColRowEvent();
        } else if (flag === 'h') {
          this.type = 'h';
          this.wrap.classList.add('scroll-h');
          this.colneTable();
          this.setFirxedColStyle();
        } else if (flag === 'v') {
          this.type = 'v';
          this.wrap.classList.add('scroll-v');
          this.colneTable();
          this.setFirxedRowStyle();
        } // 横スクロールだったら

      } else if (this.wrap.classList.contains('js-fixedTable-horizontal')) {
        console.log('横');
        this.type = 'h';
        this.colneTable();
        this.setFirxedColStyle(); // 縦スクロールだったら
      } else if (this.wrap.classList.contains('js-fixedTable-vertical')) {
        console.log('縦');
        this.type = 'v';
        this.maxHeight = this.wrap.getAttribute('data-height');
        this.colneTable();
        this.setFirxedRowStyle(); // なんでもない
      } else if (this.fixedColNum == null && this.fixedRowNum == null) {
        console.log('なんでもない');
        return false;
      }
    } // ----------------------------
    // オリジナルのテーブルを複製してクローン作成
    // ----------------------------

  }, {
    key: "colneTable",
    value: function colneTable() {
      var cloneTableWrap = this.originTableWrap.cloneNode(true);
      this.originTableWrap.setAttribute('class', 'fixedTable-origin-wrap');
      cloneTableWrap.setAttribute('class', 'fixedTable-clone-wrap');
      this.wrap.appendChild(cloneTableWrap);
      this.cloneTableWrap = this.wrap.children[1];
      this.cloneTable = this.cloneTableWrap.children[0];
      this.originTable.setAttribute('class', 'fixedTable-origin-table');
      this.cloneTable.setAttribute('class', 'fixedTable-clone-table');
      this.cloneTableWrap.setAttribute('aria-hidden', 'true');
    } // ----------------------------
    // オリジナルのテーブルを4つ複製してクローン作成
    // ----------------------------

  }, {
    key: "colneFourTable",
    value: function colneFourTable() {
      var topLeftTableNode = this.originTableWrap.cloneNode(true);
      var topRightTableNode = this.originTableWrap.cloneNode(true);
      var bottomLeftTableNode = this.originTableWrap.cloneNode(true);
      var bottomRightTableNode = this.originTableWrap.cloneNode(true);
      this.originTableWrap.setAttribute('class', 'fixedTable-origin-wrap'); //左上

      topLeftTableNode.setAttribute('class', 'fixedTable-tl-wrap');
      this.wrap.appendChild(topLeftTableNode);
      this.topLeftTableWrap = this.wrap.children[1]; //右上

      var topRightWrap = document.createElement("div"); // div要素作成

      topRightWrap.setAttribute('class', 'fixedTable-tr-wrap');
      this.wrap.appendChild(topRightWrap);
      this.topRightTableWrap = this.wrap.children[2];
      this.topRightTableWrap.appendChild(topRightTableNode); //左下

      var bottomLeftWrap = document.createElement("div"); // div要素作成

      bottomLeftWrap.setAttribute('class', 'fixedTable-bl-wrap');
      this.wrap.appendChild(bottomLeftWrap);
      this.bottomLeftTableWrap = this.wrap.children[3];
      this.bottomLeftTableWrap.appendChild(bottomLeftTableNode); //右下

      bottomRightTableNode.setAttribute('class', 'fixedTable-br-wrap');
      this.wrap.appendChild(bottomRightTableNode);
      this.bottomRightTableWrap = this.wrap.children[4];
    } // ----------------------------
    // 横スクロールのstyle指定
    // 列見出しが固定になり、横にスクロールする
    // ----------------------------

  }, {
    key: "setFirxedColStyle",
    value: function setFirxedColStyle() {
      // 横固定分の幅取得
      this.getFIxedColInfo();
      this.getBorderWidth();
      this.originTableWrap.style.marginLeft = this.fixedColWidth + this.borderWidth + 'px';
      this.originTable.style.marginLeft = -this.fixedColWidth - this.borderWidth + 'px';
      this.cloneTableWrap.style.width = this.fixedColWidth + this.borderWidth + 'px';
      this.cloneTableWrap.style.overflow = 'hidden';
    } // ----------------------------
    // 縦スクロールのstyle指定
    // ----------------------------

  }, {
    key: "setFirxedRowStyle",
    value: function setFirxedRowStyle() {
      this.getFIxedColInfo();
      this.getBorderWidth();
      var scrollContHeight = this.wrap.getAttribute('data-height');
      this.originTableWrap.style.marginTop = "".concat(this.fixedColHeight + this.borderWidth, "px");
      this.originTableWrap.style.maxHeight = "".concat(scrollContHeight, "px");
      this.originTable.style.marginTop = "-".concat(this.fixedColHeight + this.borderWidth, "px");
      this.cloneTableWrap.style.height = "".concat(this.fixedColHeight + this.borderWidth, "px");
      this.cloneTableWrap.style.overflow = 'hidden'; // overflowがかかってスクロールバーが表示されてからスクロールバーの幅を取得する

      this.getScrollbarWidth();
      this.cloneTableWrap.style.width = "".concat(this.wrap.offsetWidth - this.scrollbarW, "px");
    } // ----------------------------
    // 縦横スクロールのstyle指定
    // ----------------------------

  }, {
    key: "setFirxedColRowStyle",
    value: function setFirxedColRowStyle() {
      this.getFIxedColInfo();
      this.getBorderWidth();
      var scrollContHeight = this.wrap.getAttribute('data-height');
      var fixedH = this.fixedColHeight + this.borderWidth;
      var fixedW = this.fixedColWidth + this.borderWidth;
      this.wrap.style.maxHeight = scrollContHeight + 'px'; // 左上

      this.topLeftTableWrap.style.width = fixedW + 'px';
      this.topLeftTableWrap.style.height = fixedH + 'px'; // 右上

      this.topRightTableWrap.style.left = fixedW + 'px';
      this.topRightTableWrap.style.height = "".concat(fixedH + this.scrollbarW, "px");
      this.topRightTableWrap.style.width = "".concat(this.wrap.offsetWidth - this.scrollbarW - fixedW, "px");
      this.topRightTableWrap.children[0].style.marginLeft = -fixedW + 'px'; // 左下

      this.bottomLeftTableWrap.style.width = fixedW + this.scrollbarW + 'px';
      this.bottomLeftTableWrap.style.top = fixedH + 'px';
      this.bottomLeftTableWrap.style.height = "".concat(this.wrap.offsetHeight - this.scrollbarW - fixedH, "px");
      this.bottomLeftTableWrap.children[0].style.marginTop = -fixedH + 'px'; // 右下

      this.bottomRightTableWrap.style.left = fixedW + 'px';
      this.bottomRightTableWrap.style.top = fixedH + 'px';
      this.bottomRightTableWrap.style.width = "".concat(this.wrap.offsetWidth - fixedW, "px");
      this.bottomRightTableWrap.style.height = "".concat(this.wrap.offsetHeight - fixedH, "px");
      this.bottomRightTableWrap.children[0].style.marginTop = -fixedH + 'px';
      this.bottomRightTableWrap.children[0].style.marginLeft = -fixedW + 'px';
    } // ----------------------------
    // 固定スクロール分の高さ・幅取得
    // ----------------------------

  }, {
    key: "getFIxedColInfo",
    value: function getFIxedColInfo() {
      this.fixedColWidth = 0;
      this.fixedColHeight = 0;
      var rowList = this.originTable.getElementsByTagName('tr');
      var rowLen = rowList.length;

      for (var i = 0; i < rowLen; i++) {
        var targetRow = rowList[i]; // 横固定分は一行目のみ計算できればOK

        if (i == 0) {
          for (var j = 0; j < targetRow.children.length; j++) {
            var targetCell = targetRow.children[j];

            if (targetCell.classList.contains('js-fixedHead')) {
              this.fixedColWidth += targetCell.offsetWidth;
            }
          }
        } // 縦固定分は各行の一つ目のセルが計算できればOK


        if (targetRow.children[0].classList.length != 0) if (targetRow.children[0].classList.contains('js-fixedHead')) {
          this.fixedColHeight += targetRow.children[0].offsetHeight;
        }
      }

      console.log('横固定幅：' + this.fixedColWidth);
      console.log('縦固定幅：' + this.fixedColHeight);
    } // ----------------------------
    // 枠線の幅取得
    // ----------------------------

  }, {
    key: "getBorderWidth",
    value: function getBorderWidth() {
      var target = this.originTable.getElementsByTagName('th')[0];
      var cssStyle = getComputedStyle(target, null);
      this.borderWidth = parseInt(cssStyle.getPropertyValue('border-left-width'), 10);
      console.log('枠線幅：' + this.borderWidth);
    } // ----------------------------
    // スクロールバーの幅取得
    // ----------------------------

  }, {
    key: "getScrollbarWidth",
    value: function getScrollbarWidth() {
      // if (this.scrollbarW) return
      if (this.type === 'v') {
        this.scrollbarW = this.wrap.offsetWidth - this.originTable.offsetWidth;
      }

      if (this.type === 'vh') {
        this.scrollbarW = this.wrap.offsetHeight - this.originTable.offsetHeight;
      }

      console.log('スクロールバーの幅:' + this.scrollbarW);
    } // ----------------------------
    // 表がスクロールするかしないか判定
    // ----------------------------

  }, {
    key: "judgeOverflow",
    value: function judgeOverflow() {
      var flag;

      if (this.type === 'v') {
        flag = this.wrap.offsetHeight > this.maxHeight;
      } else if (this.type === 'h') {
        flag = this.wrap.offsetWidth < this.originTable.offsetWidth;
      } else if (this.type === 'vh') {
        if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.scrollHeight > this.maxHeight) {
          flag = true;
        } else if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.scrollHeight <= this.maxHeight) {
          // 縦横指定だけど、横スクしかしない時
          flag = 'h';
        } else if (this.wrap.offsetWidth >= this.originTable.offsetWidth && this.wrap.scrollHeight > this.maxHeight) {
          // 縦横指定だけど、縦スクしかしない時
          flag = 'v';
        }
      }

      console.log(flag);
      return flag;
    } // ----------------------------
    // 縦横スクロールのスクロールイベント
    // ----------------------------

  }, {
    key: "setFirxedColRowEvent",
    value: function setFirxedColRowEvent() {
      var _this = this; // 右下スクロール時


      this.bottomRightTableWrap.addEventListener('scroll', function (e) {
        console.log('右下');
        _this.topRightTableWrap.scrollLeft = e.target.scrollLeft;
      }); // 右上スクロール時

      this.topRightTableWrap.addEventListener('scroll', function (e) {
        console.log('右上');
        _this.bottomRightTableWrap.scrollLeft = e.target.scrollLeft;
      }); // 左下スクロール時

      this.bottomRightTableWrap.addEventListener('scroll', function (e) {
        console.log('右上');
        _this.bottomRightTableWrap.scrollLeft = e.target.scrollLeft;
      });
    }
  }]);

  return FixedTable;
}();



/***/ }),

/***/ "./src/Member.js":
/*!***********************!*\
  !*** ./src/Member.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Member; });


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Member = /*#__PURE__*/function () {
  function Member(firstName, lastName) {
    _classCallCheck(this, Member);

    this.firstName = firstName;
    this.lastName = lastName;
  }

  _createClass(Member, [{
    key: "getName",
    value: function getName() {
      return this.lastName + ' ' + this.firstName;
    }
  }, {
    key: "firstName",
    get: function get() {
      return this._firstName;
    },
    set: function set(value) {
      this._firstName = value;
    }
  }, {
    key: "lastName",
    get: function get() {
      return this._lastName;
    },
    set: function set(value) {
      this._lastName = value;
    }
  }]);

  return Member;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BusinessMember__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BusinessMember */ "./src/BusinessMember.js");
/* harmony import */ var _FixedTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FixedTable */ "./src/FixedTable.js");




var user = new _BusinessMember__WEBPACK_IMPORTED_MODULE_0__["default"]('taro', 'yamada', 'G社');
window.addEventListener('load', function () {
  var tableLists = Array.from(document.getElementsByClassName('js-fixedTable'));
  var tableInstance = tableLists.map(function (table) {
    var item = new _FixedTable__WEBPACK_IMPORTED_MODULE_1__["default"](table);
    item.init();
    return item;
  }); // console.log(tableInstance)
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map