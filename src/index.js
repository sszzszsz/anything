'use strict';

import BusinessMember from './BusinessMember';
import FixedTable from './FixedTable';

let user = new BusinessMember('taro', 'yamada', 'G社');
console.log(user.getName());

window.addEventListener('load', function () {
    let tableLists = Array.from(document.getElementsByClassName('js-fixedTable'))
    console.log(tableLists)

    let tableInstance = tableLists.map(function (table) {
        let item = new FixedTable(table)
        item.init()
        return item
    })

    console.log(tableInstance)
})
