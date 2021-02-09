"use strict"; // ----------------------------
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
      if (this.wrap.classList.contains("js-fixedTable-vh")) {
        console.log("縦横");
        this.type = "vh";
        this.maxHeight = this.wrap.getAttribute("data-height");
        var flag = this.judgeOverflow();

        if (flag === true) {
          this.getScrollbarWidth();
          this.wrap.classList.add("scroll-vh");
          this.colneFourTable();
          this.setFirxedColRowStyle();
          this.setFirxedColRowEvent();
        } else if (flag === "h") {
          this.type = "h";
          this.wrap.classList.add("scroll-h");
          this.colneTable();
          this.setFirxedColStyle();
        } else if (flag === "v") {
          this.type = "v";
          this.wrap.classList.add("scroll-v");
          this.colneTable();
          this.setFirxedRowStyle();
        } // 横スクロールだったら

      } else if (this.wrap.classList.contains("js-fixedTable-horizontal")) {
        console.log("横");
        this.type = "h";
        this.colneTable();
        this.setFirxedColStyle(); // 縦スクロールだったら
      } else if (this.wrap.classList.contains("js-fixedTable-vertical")) {
        console.log("縦");
        this.type = "v";
        this.maxHeight = this.wrap.getAttribute("data-height");
        this.colneTable();
        this.setFirxedRowStyle(); // なんでもない
      } else if (this.fixedColNum == null && this.fixedRowNum == null) {
        console.log("なんでもない");
        return false;
      }
    } // ----------------------------
    // オリジナルのテーブルを複製してクローン作成
    // ----------------------------

  }, {
    key: "colneTable",
    value: function colneTable() {
      var cloneTableWrap = this.originTableWrap.cloneNode(true);
      this.originTableWrap.setAttribute("class", "fixedTable-origin-wrap");
      cloneTableWrap.setAttribute("class", "fixedTable-clone-wrap");
      this.wrap.appendChild(cloneTableWrap);
      this.cloneTableWrap = this.wrap.children[1];
      this.cloneTable = this.cloneTableWrap.children[0];
      this.originTable.setAttribute("class", "fixedTable-origin-table");
      this.cloneTable.setAttribute("class", "fixedTable-clone-table");
      this.cloneTableWrap.setAttribute("aria-hidden", "true");
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
      this.originTableWrap.setAttribute("class", "fixedTable-origin-wrap"); //左上

      topLeftTableNode.setAttribute("class", "fixedTable-tl-wrap");
      this.wrap.appendChild(topLeftTableNode);
      this.topLeftTableWrap = this.wrap.children[1]; //右上

      var topRightWrap = document.createElement("div"); // div要素作成

      topRightWrap.setAttribute("class", "fixedTable-tr-wrap");
      this.wrap.appendChild(topRightWrap);
      this.topRightTableWrap = this.wrap.children[2];
      this.topRightTableWrap.appendChild(topRightTableNode); //左下

      var bottomLeftWrap = document.createElement("div"); // div要素作成

      bottomLeftWrap.setAttribute("class", "fixedTable-bl-wrap");
      this.wrap.appendChild(bottomLeftWrap);
      this.bottomLeftTableWrap = this.wrap.children[3];
      this.bottomLeftTableWrap.appendChild(bottomLeftTableNode); //右下

      bottomRightTableNode.setAttribute("class", "fixedTable-br-wrap");
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
      this.originTableWrap.style.marginLeft = this.fixedColWidth + this.borderWidth + "px";
      this.originTable.style.marginLeft = -this.fixedColWidth - this.borderWidth + "px";
      this.cloneTableWrap.style.width = this.fixedColWidth + this.borderWidth + "px";
      this.cloneTableWrap.style.overflow = "hidden";
    } // ----------------------------
    // 縦スクロールのstyle指定
    // ----------------------------

  }, {
    key: "setFirxedRowStyle",
    value: function setFirxedRowStyle() {
      this.getFIxedColInfo();
      this.getBorderWidth();
      var scrollContHeight = this.wrap.getAttribute("data-height");
      this.originTableWrap.style.marginTop = "".concat(this.fixedColHeight + this.borderWidth, "px");
      this.originTableWrap.style.maxHeight = "".concat(scrollContHeight, "px");
      this.originTable.style.marginTop = "-".concat(this.fixedColHeight + this.borderWidth, "px");
      this.cloneTableWrap.style.height = "".concat(this.fixedColHeight + this.borderWidth, "px");
      this.cloneTableWrap.style.overflow = "hidden"; // overflowがかかってスクロールバーが表示されてからスクロールバーの幅を取得する

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
      var scrollContHeight = this.wrap.getAttribute("data-height");
      var fixedH = this.fixedColHeight + this.borderWidth;
      var fixedW = this.fixedColWidth + this.borderWidth;
      this.wrap.style.maxHeight = scrollContHeight + "px"; // 左上

      this.topLeftTableWrap.style.width = fixedW + "px";
      this.topLeftTableWrap.style.height = fixedH + "px"; // 右上

      this.topRightTableWrap.style.left = fixedW + "px";
      this.topRightTableWrap.style.height = "".concat(fixedH + this.scrollbarW, "px");
      this.topRightTableWrap.style.width = "".concat(this.wrap.offsetWidth - this.scrollbarW - fixedW, "px");
      this.topRightTableWrap.children[0].style.marginLeft = -fixedW + "px"; // 左下

      this.bottomLeftTableWrap.style.width = fixedW + this.scrollbarW + "px";
      this.bottomLeftTableWrap.style.top = fixedH + "px";
      this.bottomLeftTableWrap.style.height = "".concat(this.wrap.offsetHeight - this.scrollbarW - fixedH, "px");
      this.bottomLeftTableWrap.children[0].style.marginTop = -fixedH + "px"; // 右下

      this.bottomRightTableWrap.style.left = fixedW + "px";
      this.bottomRightTableWrap.style.top = fixedH + "px";
      this.bottomRightTableWrap.style.width = "".concat(this.wrap.offsetWidth - fixedW, "px");
      this.bottomRightTableWrap.style.height = "".concat(this.wrap.offsetHeight - fixedH, "px");
      this.bottomRightTableWrap.children[0].style.marginTop = -fixedH + "px";
      this.bottomRightTableWrap.children[0].style.marginLeft = -fixedW + "px";
    } // ----------------------------
    // 固定スクロール分の高さ・幅取得
    // ----------------------------

  }, {
    key: "getFIxedColInfo",
    value: function getFIxedColInfo() {
      this.fixedColWidth = 0;
      this.fixedColHeight = 0;
      var rowList = this.originTable.getElementsByTagName("tr");
      var rowLen = rowList.length;

      for (var i = 0; i < rowLen; i++) {
        var targetRow = rowList[i]; // 横固定分は一行目のみ計算できればOK

        if (i == 0) {
          for (var j = 0; j < targetRow.children.length; j++) {
            var targetCell = targetRow.children[j];

            if (targetCell.classList.contains("js-fixedHead")) {
              this.fixedColWidth += targetCell.offsetWidth;
            }
          }
        } // 縦固定分は各行の一つ目のセルが計算できればOK


        if (targetRow.children[0].classList.length != 0) if (targetRow.children[0].classList.contains("js-fixedHead")) {
          this.fixedColHeight += targetRow.children[0].offsetHeight;
        }
      }

      console.log("横固定幅：" + this.fixedColWidth);
      console.log("縦固定幅：" + this.fixedColHeight);
    } // ----------------------------
    // 枠線の幅取得
    // ----------------------------

  }, {
    key: "getBorderWidth",
    value: function getBorderWidth() {
      var target = this.originTable.getElementsByTagName("th")[0];
      var cssStyle = getComputedStyle(target, null);
      this.borderWidth = parseInt(cssStyle.getPropertyValue("border-left-width"), 10);
      console.log("枠線幅：" + this.borderWidth);
    } // ----------------------------
    // スクロールバーの幅取得
    // ----------------------------

  }, {
    key: "getScrollbarWidth",
    value: function getScrollbarWidth() {
      // if (this.scrollbarW) return
      if (this.type === "v") {
        this.scrollbarW = this.wrap.offsetWidth - this.originTable.offsetWidth;
      }

      if (this.type === "vh") {
        this.scrollbarW = this.wrap.offsetHeight - this.originTable.offsetHeight;
      }

      console.log("スクロールバーの幅:" + this.scrollbarW);
    } // ----------------------------
    // 表がスクロールするかしないか判定
    // ----------------------------

  }, {
    key: "judgeOverflow",
    value: function judgeOverflow() {
      var flag;

      if (this.type === "v") {
        flag = this.wrap.offsetHeight > this.maxHeight;
      } else if (this.type === "h") {
        flag = this.wrap.offsetWidth < this.originTable.offsetWidth;
      } else if (this.type === "vh") {
        if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.scrollHeight > this.maxHeight) {
          flag = true;
        } else if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.scrollHeight <= this.maxHeight) {
          // 縦横指定だけど、横スクしかしない時
          flag = "h";
        } else if (this.wrap.offsetWidth >= this.originTable.offsetWidth && this.wrap.scrollHeight > this.maxHeight) {
          // 縦横指定だけど、縦スクしかしない時
          flag = "v";
        }
      }

      console.log(flag);
      return flag;
    } // ----------------------------
    // 縦横スクロールの初回スクロールイベント付与
    // ----------------------------

  }, {
    key: "setFirxedColRowEvent",
    value: function setFirxedColRowEvent() {
      var _this = this;

      var scrollTargetEl;
      this.isScrolling = false;
      this.bottomRightTableWrap.addEventListener("scroll", doScrollLink);
      this.bottomLeftTableWrap.addEventListener("scroll", doScrollLink);
      this.topRightTableWrap.addEventListener("scroll", doScrollLink);
      this.bottomRightTableWrap.addEventListener("scroll", scrollEnd);
      this.bottomLeftTableWrap.addEventListener("scroll", scrollEnd);
      this.topRightTableWrap.addEventListener("scroll", scrollEnd); // ----------------------------
      // 縦横スクロールのスクロールイベント連動
      // 右上横スクロール時 = 右下と横スクロールが同期
      // 左下縦スクロール時 = 右下と縦スクロールが同期
      // 右下スクロール時 = 右上と横スクロール、左下と縦スクロールが同期
      // ----------------------------

      function doScrollLink(event) {
        scrollTargetEl = event.target;
        scrollStart(scrollTargetEl, _this.wrap); // 右下スクロールだったら

        if (scrollTargetEl.classList.contains("fixedTable-br-wrap")) {
          console.log("右下"); // 右上と左下をスクロールと同期させる

          _this.topRightTableWrap.scrollLeft = scrollTargetEl.scrollLeft;
          _this.bottomLeftTableWrap.scrollTop = scrollTargetEl.scrollTop; // 右上スクロールだったら
        } else if (scrollTargetEl.classList.contains("fixedTable-tr-wrap")) {
          console.log("右上");
          _this.bottomRightTableWrap.scrollLeft = scrollTargetEl.scrollLeft; // 左下スクロールだったら
        } else if (scrollTargetEl.classList.contains("fixedTable-bl-wrap")) {
          console.log("左下");
          _this.bottomRightTableWrap.scrollTop = scrollTargetEl.scrollTop;
        }
      } // ----------------------------
      // スクロール開始検知イベント
      // ・スクロール初回時にスクロール破棄
      // ----------------------------


      function scrollStart(target) {
        if (_this.isScrolling) {
          _this.isScrolling = true;
        } else {
          console.log("スクロール開始");
          removeScrollEvent(target);
          _this.isScrolling = true;
        }
      } // ----------------------------
      // 縦横スクロールのスクロールイベントを破棄
      // this => コンストラクタ
      // ----------------------------


      function removeScrollEvent(targetEl) {
        if (targetEl.classList.contains("fixedTable-br-wrap")) {
          _this.topRightTableWrap.removeEventListener("scroll", doScrollLink);

          _this.bottomLeftTableWrap.removeEventListener("scroll", doScrollLink);

          console.log("remove");
        } else if (targetEl.classList.contains("fixedTable-tr-wrap")) {
          _this.bottomRightTableWrap.removeEventListener("scroll", doScrollLink);
        } else if (targetEl.classList.contains("fixedTable-bl-wrap")) {
          _this.bottomRightTableWrap.removeEventListener("scroll", doScrollLink);
        }
      } // ----------------------------
      // スクロール終了検知イベント
      // ----------------------------


      function scrollEnd() {
        _this.isScrollTimerId;
        window.clearTimeout(_this.isScrollTimerId);
        _this.isScrollTimerId = setTimeout(function () {
          console.log("スクロール終了");
          reSetScrollEvent(scrollTargetEl);
        }, 500);
      } // ----------------------------
      // スクロール終了検知したら再度スクロールイベントを付与する
      // this => イベントが発生したスクロール領域が格納されている
      // 引数でコンストラクタを参照する（this.self）
      // ----------------------------


      function reSetScrollEvent(targetEl) {
        console.log("スクロールイベント再付与");

        if (targetEl.classList.contains("fixedTable-br-wrap")) {
          _this.topRightTableWrap.addEventListener("scroll", doScrollLink);

          _this.bottomLeftTableWrap.addEventListener("scroll", doScrollLink);
        } else if (targetEl.classList.contains("fixedTable-tr-wrap")) {
          _this.bottomRightTableWrap.addEventListener("scroll", doScrollLink);
        } else if (targetEl.classList.contains("fixedTable-bl-wrap")) {
          _this.bottomRightTableWrap.addEventListener("scroll", doScrollLink);
        }
      }
    }
  }]);

  return FixedTable;
}();

exports["default"] = FixedTable;