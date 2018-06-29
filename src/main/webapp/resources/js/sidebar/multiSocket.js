$(function(){
	if(sessionProjectNum != 'null') connect();
});

var wsocket;

function connect() {
	wsocket = new WebSocket("ws://localhost:8090/multiWebSocket?projectNum="+sessionProjectNum);
	wsocket.onopen = onOpen;
	wsocket.onmessage = onMessage;
	wsocket.onclose = onClose;
}

function disconnect() {
	wsocket.close();
}

function onOpen(evt) {}

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
	
	var data = evt.data;
	
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
		if(skill == 'kanban') showKanban();
	}
}

function onClose(evt) {}

function send(msg) {
	wsocket.send(msg);
}