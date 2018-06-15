$(function(){
	Msgconnect();
});

var wMsgSocket;

function Msgconnect() {
	wMsgSocket = new WebSocket("ws://"+ document.domain +":8090/controller/msgWebSocket?userId=" + $("#hiddenUserId").val());
	wMsgSocket.onopen = onMsgOpen;
	wMsgSocket.onmessage = onMsgMessage;
	wMsgSocket.onclose = onMsgClose;
}

function disMsgconnect() {
	wMsgSocket.close();
}

function onMsgOpen(evt) {}

function onMsgMessage(evt) {
	var data = evt.data;
	showMsg();
}

function onMsgClose(evt) {}

function sendMsg(msg) {
	wMsgSocket.send(msg);
}