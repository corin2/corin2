$(function(){
	connect();
});

var wsocket;

function connect() {
	wsocket = new WebSocket("ws://"+ document.domain +":8090/controller/msgWebSocket?userId=" + $("#hiddenUserId").val());
	wsocket.onopen = onOpen;
	wsocket.onmessage = onMessage;
	wsocket.onclose = onClose;
}

function disconnect() {
	wsocket.close();
}

function onOpen(evt) {}

function onMessage(evt) {
	var data = evt.data;
	showMsg();
}

function onClose(evt) {}

function send(msg) {
	wsocket.send(msg);
}