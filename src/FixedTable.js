'use strict';

export default class FixedTable {
	constructor(el) {
		this.wrap = el
		this.originWrap = null
		this.originTable = null
		this.cloneWrap = null
		this.cloneTable = null
	}

	init() {
		this.setInitStyle()
	}
	// ----------------------------
	// オリジナルのテーブルを複製してクローン作成
	// ----------------------------
	setInitStyle() {
		console.log(this.wrap)
		this.originWrap = this.wrap.children[0]
		this.originTable = this.originWrap.children[0]


		let cloneTableWrap = this.originWrap.cloneNode(true)
		cloneTableWrap.setAttribute("class", "fixedTable-clone-wrap")
		this.wrap.appendChild(cloneTableWrap);
		this.cloneWrap = this.wrap.children[1]
		this.cloneTable = this.cloneWrap.children[0]

		this.originTable.setAttribute("class", "fixedTable-origin-table")
		this.cloneTable.setAttribute("class", "fixedTable-clone-table")
	}
}