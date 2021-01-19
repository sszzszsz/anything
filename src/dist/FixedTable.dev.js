'use strict'; // ----------------------------
// ★メモ★
// col ... 列（たて）
// row ... 行（よこï）
// ----------------------------

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FixedTable =
/*#__PURE__*/
function () {
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

        if (this.judgeOverflow() === true) {
          this.colneFourTable();
          this.setFirxedColRowStyle();
          this.setFirxedColRowEvent();
        } else if (this.judgeOverflow() === 'h') {
          this.type = 'h';
          this.colneTable();
          this.setFirxedColStyle();
        } else if (this.judgeOverflow() === 'v') {
          this.type = 'v';
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

        if (this.judgeOverflow()) {
          this.colneTable();
          this.setFirxedRowStyle();
        } // なんでもない

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
      var topLeftTableWrap = this.originTableWrap.cloneNode(true);
      var topRightTableWrap = this.originTableWrap.cloneNode(true);
      var bottomLeftTableWrap = this.originTableWrap.cloneNode(true);
      var bottomRightTableWrap = this.originTableWrap.cloneNode(true);
      this.originTableWrap.setAttribute('class', 'fixedTable-origin-wrap');
      topLeftTableWrap.setAttribute('class', 'fixedTable-tl-wrap');
      topRightTableWrap.setAttribute('class', 'fixedTable-tr-wrap');
      bottomLeftTableWrap.setAttribute('class', 'fixedTable-bl-wrap');
      bottomRightTableWrap.setAttribute('class', 'fixedTable-br-wrap');
      this.wrap.appendChild(topLeftTableWrap);
      this.wrap.appendChild(topRightTableWrap);
      this.wrap.appendChild(bottomLeftTableWrap);
      this.wrap.appendChild(bottomRightTableWrap);
      this.topLeftTableWrap = this.wrap.children[1];
      this.topRightTableWrap = this.wrap.children[2];
      this.bottomLeftTableWrap = this.wrap.children[3];
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
      this.topLeftTableWrap.style.height = fixedH + 'px'; // 左下

      this.bottomLeftTableWrap.style.width = fixedW + 'px';
      this.bottomLeftTableWrap.style.top = fixedH + 'px';
      this.bottomLeftTableWrap.style.marginTop = -fixedH + 'px'; // 右上

      this.topRightTableWrap.style.marginLeft = fixedW + 'px';
      this.topRightTableWrap.children[0].style.marginLeft = -fixedW + 'px';
      this.topRightTableWrap.style.height = fixedH + 'px'; // 右下

      this.bottomRightTableWrap.style.marginLeft = fixedW + 'px';
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
        if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.offsetHeight > this.maxHeight) {
          flag = true;
        } else if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.offsetHeight <= this.maxHeight) {
          // 縦横指定だけど、横スクしかしない時
          flag = 'h';
        } else if (this.wrap.offsetWidth >= this.originTable.offsetWidth && this.wrap.offsetHeight > this.maxHeight) {
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
      // 右上スクロール時
      this.topRightTableWrap.addEventListener('scroll', function () {
        console.log('scroll');
      });
    }
  }]);

  return FixedTable;
}();

exports["default"] = FixedTable;