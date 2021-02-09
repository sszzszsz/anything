"use strict";

import BusinessMember from "./BusinessMember";
import FixedTable from "./FixedTable";

let user = new BusinessMember("taro", "yamada", "G社");

window.addEventListener("load", function () {
  let tableLists = Array.from(document.getElementsByClassName("js-fixedTable"));
  let tableInstance = tableLists.map(function (table) {
    let item = new FixedTable(table);
    item.init();
    return item;
  });

  /// クリックリスナー登録。useCaptureは true に設定
  var footer = document.getElementById("footer");
  footer.addEventListener("click", showAlert);

  /// リスナーのコールバック関数
  function showAlert() {
    alert("Button is clicked");
    removeEvent()
  }

  function removeEvent() {
    footer.removeEventListener("click", showAlert);
  }
});
