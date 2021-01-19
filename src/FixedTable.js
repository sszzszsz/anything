'use strict'
// ----------------------------
// ★メモ★
// col ... 列（たて）
// row ... 行（よこï）
// ----------------------------

export default class FixedTable {
  constructor(el) {
    this.wrap = el
    this.originTableWrap = null
    this.originTable = null
    this.cloneTableWrap = null
    this.cloneTable = null
    this.type = null
  }

  init() {
    this.originTableWrap = this.wrap.children[0]
    this.originTable = this.originTableWrap.children[0]

    this.setFixedStyle()
  }

  // ----------------------------
  // テーブルの種類わけ
  // ----------------------------
  setFixedStyle() {
    // 縦横スクロールだったら
    if (this.wrap.classList.contains('js-fixedTable-vh')) {
      console.log('縦横')
      this.type = 'vh'
      this.maxHeight = this.wrap.getAttribute('data-height')

      if (this.judgeOverflow() === true) {
        this.colneFourTable()
        this.setFirxedColRowStyle()
        this.setFirxedColRowEvent()
      } else if (this.judgeOverflow() === 'h') {
        this.type = 'h'
        this.colneTable()
        this.setFirxedColStyle()
      } else if (this.judgeOverflow() === 'v') {
        this.type = 'v'
        this.colneTable()
        this.setFirxedRowStyle()
      }
      // 横スクロールだったら
    } else if (this.wrap.classList.contains('js-fixedTable-horizontal')) {
      console.log('横')
      this.type = 'h'

      this.colneTable()
      this.setFirxedColStyle()

      // 縦スクロールだったら
    } else if (this.wrap.classList.contains('js-fixedTable-vertical')) {
      console.log('縦')
      this.type = 'v'
      this.maxHeight = this.wrap.getAttribute('data-height')

      if (this.judgeOverflow()) {
        this.colneTable()
        this.setFirxedRowStyle()
      }

      // なんでもない
    } else if (this.fixedColNum == null && this.fixedRowNum == null) {
      console.log('なんでもない')
      return false
    }
  }

  // ----------------------------
  // オリジナルのテーブルを複製してクローン作成
  // ----------------------------
  colneTable() {
    let cloneTableWrap = this.originTableWrap.cloneNode(true)
    this.originTableWrap.setAttribute('class', 'fixedTable-origin-wrap')
    cloneTableWrap.setAttribute('class', 'fixedTable-clone-wrap')
    this.wrap.appendChild(cloneTableWrap)

    this.cloneTableWrap = this.wrap.children[1]
    this.cloneTable = this.cloneTableWrap.children[0]

    this.originTable.setAttribute('class', 'fixedTable-origin-table')
    this.cloneTable.setAttribute('class', 'fixedTable-clone-table')
    this.cloneTableWrap.setAttribute('aria-hidden', 'true')
  }

  // ----------------------------
  // オリジナルのテーブルを4つ複製してクローン作成
  // ----------------------------
  colneFourTable() {
    let topLeftTableWrap = this.originTableWrap.cloneNode(true)
    let topRightTableWrap = this.originTableWrap.cloneNode(true)
    let bottomLeftTableWrap = this.originTableWrap.cloneNode(true)
    let bottomRightTableWrap = this.originTableWrap.cloneNode(true)

    this.originTableWrap.setAttribute('class', 'fixedTable-origin-wrap')
    topLeftTableWrap.setAttribute('class', 'fixedTable-tl-wrap')
    topRightTableWrap.setAttribute('class', 'fixedTable-tr-wrap')
    bottomLeftTableWrap.setAttribute('class', 'fixedTable-bl-wrap')
    bottomRightTableWrap.setAttribute('class', 'fixedTable-br-wrap')

    this.wrap.appendChild(topLeftTableWrap)
    this.wrap.appendChild(topRightTableWrap)
    this.wrap.appendChild(bottomLeftTableWrap)
    this.wrap.appendChild(bottomRightTableWrap)

    this.topLeftTableWrap = this.wrap.children[1]
    this.topRightTableWrap = this.wrap.children[2]
    this.bottomLeftTableWrap = this.wrap.children[3]
    this.bottomRightTableWrap = this.wrap.children[4]
  }

  // ----------------------------
  // 横スクロールのstyle指定
  // 列見出しが固定になり、横にスクロールする
  // ----------------------------
  setFirxedColStyle() {
    // 横固定分の幅取得
    this.getFIxedColInfo()
    this.getBorderWidth()

    this.originTableWrap.style.marginLeft = this.fixedColWidth + this.borderWidth + 'px'
    this.originTable.style.marginLeft = -this.fixedColWidth - this.borderWidth + 'px'
    this.cloneTableWrap.style.width = this.fixedColWidth + this.borderWidth + 'px'
    this.cloneTableWrap.style.overflow = 'hidden'
  }

  // ----------------------------
  // 縦スクロールのstyle指定
  // ----------------------------
  setFirxedRowStyle() {
    this.getFIxedColInfo()
    this.getBorderWidth()

    let scrollContHeight = this.wrap.getAttribute('data-height')
    this.originTableWrap.style.marginTop = `${this.fixedColHeight + this.borderWidth}px`
    this.originTableWrap.style.maxHeight = `${scrollContHeight}px`
    this.originTable.style.marginTop = `-${this.fixedColHeight + this.borderWidth}px`

    this.cloneTableWrap.style.height = `${this.fixedColHeight + this.borderWidth}px`
    this.cloneTableWrap.style.overflow = 'hidden'

    // overflowがかかってスクロールバーが表示されてからスクロールバーの幅を取得する
    this.getScrollbarWidth()
    this.cloneTableWrap.style.width = `${this.wrap.offsetWidth - this.scrollbarW}px`
  }

  // ----------------------------
  // 縦横スクロールのstyle指定
  // ----------------------------
  setFirxedColRowStyle() {
    this.getFIxedColInfo()
    this.getBorderWidth()
    let scrollContHeight = this.wrap.getAttribute('data-height')
    let fixedH = this.fixedColHeight + this.borderWidth
    let fixedW = this.fixedColWidth + this.borderWidth

    this.wrap.style.maxHeight = scrollContHeight + 'px'

    // 左上
    this.topLeftTableWrap.style.width = fixedW + 'px'
    this.topLeftTableWrap.style.height = fixedH + 'px'

    // 左下
    this.bottomLeftTableWrap.style.width = fixedW + 'px'
    this.bottomLeftTableWrap.style.top = fixedH + 'px'
    this.bottomLeftTableWrap.style.marginTop = -fixedH + 'px'

    // 右上
    this.topRightTableWrap.style.marginLeft = fixedW + 'px'
    this.topRightTableWrap.children[0].style.marginLeft = -fixedW + 'px'
    this.topRightTableWrap.style.height = fixedH + 'px'

    // 右下
    this.bottomRightTableWrap.style.marginLeft = fixedW + 'px'
  }

  // ----------------------------
  // 固定スクロール分の高さ・幅取得
  // ----------------------------
  getFIxedColInfo() {
    this.fixedColWidth = 0
    this.fixedColHeight = 0

    let rowList = this.originTable.getElementsByTagName('tr')
    let rowLen = rowList.length

    for (let i = 0; i < rowLen; i++) {
      let targetRow = rowList[i]
      // 横固定分は一行目のみ計算できればOK
      if (i == 0) {
        for (let j = 0; j < targetRow.children.length; j++) {
          let targetCell = targetRow.children[j]
          if (targetCell.classList.contains('js-fixedHead')) {
            this.fixedColWidth += targetCell.offsetWidth
          }
        }
      }

      // 縦固定分は各行の一つ目のセルが計算できればOK
      if (targetRow.children[0].classList.length != 0)
        if (targetRow.children[0].classList.contains('js-fixedHead')) {
          this.fixedColHeight += targetRow.children[0].offsetHeight
        }
    }
    console.log('横固定幅：' + this.fixedColWidth)
    console.log('縦固定幅：' + this.fixedColHeight)
  }

  // ----------------------------
  // 枠線の幅取得
  // ----------------------------
  getBorderWidth() {
    let target = this.originTable.getElementsByTagName('th')[0]
    let cssStyle = getComputedStyle(target, null)
    this.borderWidth = parseInt(cssStyle.getPropertyValue('border-left-width'), 10)
    console.log('枠線幅：' + this.borderWidth)
  }
  // ----------------------------
  // スクロールバーの幅取得
  // ----------------------------
  getScrollbarWidth() {
    // if (this.scrollbarW) return

    if (this.type === 'v') {
      this.scrollbarW = this.wrap.offsetWidth - this.originTable.offsetWidth
    }
    console.log('スクロールバーの幅:' + this.scrollbarW)
  }
  // ----------------------------
  // 表がスクロールするかしないか判定
  // ----------------------------
  judgeOverflow() {
    let flag
    if (this.type === 'v') {
      flag = this.wrap.offsetHeight > this.maxHeight
    } else if (this.type === 'h') {
      flag = this.wrap.offsetWidth < this.originTable.offsetWidth
    } else if (this.type === 'vh') {
      if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.offsetHeight > this.maxHeight) {
        flag = true
      } else if (this.wrap.offsetWidth < this.originTable.offsetWidth && this.wrap.offsetHeight <= this.maxHeight) {
        // 縦横指定だけど、横スクしかしない時
        flag = 'h'
      } else if (this.wrap.offsetWidth >= this.originTable.offsetWidth && this.wrap.offsetHeight > this.maxHeight) {
        // 縦横指定だけど、縦スクしかしない時
        flag = 'v'
      }
    }
    console.log(flag)
    return flag
  }
  // ----------------------------
  // 縦横スクロールのスクロールイベント
  // ----------------------------
  setFirxedColRowEvent() {
    // 右上スクロール時
    this.topRightTableWrap.addEventListener('scroll', () => {
      console.log('scroll')
    });

  }
}
