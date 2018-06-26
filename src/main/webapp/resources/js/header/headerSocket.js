$(function(){
	headerconnect();
});

var wHeaderSocket;

function headerconnect() {
	wHeaderSocket = new WebSocket("ws://localhost:8090/headerWebSocket?projectNum="+ sessionProjectNum);
	wHeaderSocket.onopen = onHeaderOpen;
	wHeaderSocket.onmessage = onHeaderMessage;
	wHeaderSocket.onclose = onHeaderClose;
}

function disHeaderconnect() {
	wHeaderSocket.close();
}

function onHeaderOpen(evt) {}

function onHeaderMessage(evt) {
	var data = evt.data;
	if(data.split(':')[0] == '1'){
		projectMemberProfile();
	}else if(data.split(':')[0] == '2'){
		if(data.split(':')[2] == $('#hiddenUserId').val()){
			location.href=getContextPath()+'/project';
			swal('해당 프로젝트에서 제명 되었습니다.');
		}else{
			projectMemberProfile();
		}
	}else if(data.split(':')[0] == '3'){
		if(data.split(':')[2] == $('#hiddenUserId').val()){
			location.href=getContextPath()+'/project';
			swal('프로젝트에서 탈퇴 하였습니다.');
		}else{
			projectMemberProfile();
		}
	}
}

function onHeaderClose(evt) {}

function sendHeader(msg) {
	wHeaderSocket.send(msg);
}