$(function(){
	connectPosition();
});

var wsocketPosition;

function connectPosition() {
	wsocketPosition = new WebSocket("ws://"+ document.domain +":8090/controller/positionWebSocket?projectNum="+sessionProjectNum);
	wsocketPosition.onopen = onOpenPosition;
	wsocketPosition.onmessage = onMessagePosition;
	wsocketPosition.onclose = onClosePosition;
}

function disconnectPosition() {
	wsocketPosition.close();
}

function onOpenPosition(evt) {}

function onMessagePosition(evt) {
	var skill = '';
	if(window.location.pathname.indexOf('position') > -1){
		skill = 'position';
	}else if(window.location.pathname.indexOf('chart') > -1){
		skill = 'chart';
	}
	
	var data = evt.data;
	console.log(data)
	if(evt.data == '1'){ //1 = 카드 삭제, 생성, 카드이동 시
		if(skill == 'position') {allList(); console.log("asdfsad");}
		else if(skill == 'chart') allList();
	}else if(evt.data == '2'){ //2 = 체크리스트 체크ed 변환시
		if(skill == 'position') checkListLength();
		else if(skill == 'chart') checkListLength();
	}
}

function onClosePosition(evt) {}

function sendPosition(msg) {
	wsocketPosition.send(msg);
}