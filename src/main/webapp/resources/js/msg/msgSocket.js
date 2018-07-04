$(function(){
	Msgconnect();
});

var wMsgSocket;

/**
* @함수명 : Msgconnect()
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 메시지에서 사용될 websocket 연결을 위한 함수
**/
function Msgconnect() {
	wMsgSocket = new WebSocket("ws://localhost:8090/msgWebSocket?userId=" + $("#hiddenUserId").val());
	wMsgSocket.onopen = onMsgOpen;
	wMsgSocket.onmessage = onMsgMessage;
	wMsgSocket.onclose = onMsgClose;
}

/**
* @함수명 : disMsgconnect()
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 메시지소켓에서 빠져나갈때 실행
**/
function disMsgconnect() {
	wMsgSocket.close();
}

function onMsgOpen(evt) {}

/**
* @함수명 : onMsgMessage(evt)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 소켓에서 건네오는 데이터를 가공하여 실행 시킬 함수를 정의하는 곳.
* @param evt - 소켓에서 건네오는 데이터가 담긴 json
**/
function onMsgMessage(evt) {
	var data = evt.data;
	showMsg();
}

function onMsgClose(evt) {}

/**
* @함수명 : sendMsg(msg)
* @작성일 : 2018. 06. 13.
* @작성자 : 김 진 원
* @설명 : 소켓으로 보낼 데이터를 받아 보내주는 곳
* @param msg - 소켓으로 보낼 데이터 값
**/
function sendMsg(msg) {
	wMsgSocket.send(msg);
}