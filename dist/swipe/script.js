var xPos = null;
var yPos = null;
var startXPos = null;
var touchFlag = false;

window.addEventListener("pointerdown", function (event) {
	startXPos = event.pageX;
	touchFlag = true;
	event.preventDefault();
	debag("pointerdown")
});

window.addEventListener("pointermove", function (event) {
	oldX = xPos;
	oldY = yPos;
	xPos = event.pageX;
	yPos = event.pageY;
	if (oldX == null && oldY == null) {
		return false;
	} else if (Math.abs(startXPos - xPos) > 10 && touchFlag) {
		event.preventDefault();
		debag("pointermove")
		return false;
	}
});

window.addEventListener("pointerup", function (event) {
	startXPos = null;
	touchFlag = false;
	event.preventDefault();
	debag("pointerup")
});


window.addEventListener('popstate', function(e) { 
	console.log('ボタンがクリックされました');
});


window.localStorage.setItem('name', 'suzu');
var test = window.localStorage.getItem('name');
console.log(test)

function debag(log) {
	var newElement = document.createElement("p"); // p要素作成
	var newContent = document.createTextNode(log); // テキストノードを作成
	newElement.appendChild(newContent); // p要素にテキストノードを追加
	var parentDiv = document.getElementById("log");
	parentDiv.insertBefore(newElement, parentDiv.firstChild);
}