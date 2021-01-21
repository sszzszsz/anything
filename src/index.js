'use strict'

import BusinessMember from './BusinessMember'
import FixedTable from './FixedTable'

let user = new BusinessMember('taro', 'yamada', 'G社')


window.addEventListener('load', function () {
  let tableLists = Array.from(document.getElementsByClassName('js-fixedTable'))
  let tableInstance = tableLists.map(function (table) {
    let item = new FixedTable(table)
    item.init()
    return item
  })

  // console.log(tableInstance)
})
