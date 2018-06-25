$(function(){
	connect();
});

var wsocket;

function connect() {
	wsocket = new WebSocket("ws://"+ document.domain +":8090/controller/kanbanWebSocket?projectNum="+sessionProjectNum);
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
	}
	
	var data = evt.data;
	
	if(evt.data == '1'){ //1 = 카드 생성 수정 삭제 위치이동 시
		if(skill == 'kanban') showKanban();
		else if(skill == 'calendar') dragCardCalendar();
		else { // 그리드스택에서 사용
			showKanban(); dragCardCalendar();
		}
	}else if(evt.data == '2'){ //2 = 캘린더 생성 수정 위치이동 시 
		calendarCardView();
	}else if(evt.data == '3'){ //3 = 캘린더 삭제 시
		dragCardCalendar();
	}
}

function onClose(evt) {}

function send(msg) {
	wsocket.send(msg);
}