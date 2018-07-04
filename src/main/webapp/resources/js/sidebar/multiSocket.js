$(function(){
	if(sessionProjectNum != 'null') connect();
});

var wsocket;

/**
* @함수명 : connect()
* @작성일 : 2018. 06. 27.
* @작성자 : 김 진 원
* @설명 : 캘린더,칸반,차트에서 사용될 websocket 연결을 위한 함수
**/
function connect() {
	wsocket = new WebSocket("ws://localhost:8090/multiWebSocket?projectNum="+sessionProjectNum);
	wsocket.onopen = onOpen;
	wsocket.onmessage = onMessage;
	wsocket.onclose = onClose;
}

/**
* @함수명 : disconnect()
* @작성일 : 2018. 06. 27.
* @작성자 : 김 진 원
* @설명 : 멀티소켓에서 빠져나갈때 실행
**/
function disconnect() {
	wsocket.close();
}

function onOpen(evt) {}

/**
* @함수명 : onMessage(evt)
* @작성일 : 2018. 06. 27.
* @작성자 : 김 진 원
* @설명 : 소켓에서 건네오는 데이터를 가공하여 실행 시킬 함수를 정의하는 곳.
* @param evt - 소켓에서 건네오는 데이터가 담긴 json
**/
function onMessage(evt) {
	var skill = '';
	if(window.location.pathname.indexOf('calendar') > -1){
		skill = 'calendar';
	}else if(window.location.pathname.indexOf('kanban') > -1){
		skill = 'kanban';
	}else if(window.location.pathname.indexOf('position') > -1){
		skill = 'position';
	}else if(window.location.pathname.indexOf('chart') > -1){
		skill = 'chart';
	}
	
	if(evt.data == '1'){ //1 = 카드 생성 삭제 위치이동 시
		if(skill == 'kanban') showKanban();
		else if(skill == 'calendar') dragCardCalendar();
		else if(skill == 'chart') allList();
		else if(skill == 'position') {
			showKanban();
			dragCardCalendar();
			allList();
		}
	}else if(evt.data == '2'){ //2 = 캘린더 생성 수정 위치이동 시 
		dragCardCalendar();
	}else if(evt.data == '3'){ //3 = 캘린더 삭제 시
		dragCardCalendar();
	}else if(evt.data == '4'){ //4 = 체크리스트 체크ed 변환시
		if(skill == 'position') checkListLength();
		else if(skill == 'chart') checkListLength();
	}else if(evt.data == '5'){ //5 = 카드 수정 , 수정취소, 생성취소 시
		showKanban();
	}
}

function onClose(evt) {}

/**
* @함수명 : send(msg)
* @작성일 : 2018. 06. 27.
* @작성자 : 김 진 원
* @설명 : 소켓으로 보낼 데이터를 받아 보내주는 곳
* @param msg - 소켓으로 보낼 데이터 값
**/
function send(msg) {
	wsocket.send(msg);
}