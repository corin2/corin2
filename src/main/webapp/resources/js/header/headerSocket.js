$(function(){
	if(sessionProjectNum != 'null') headerconnect();
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
			projectMemberProfile(); // 프로젝트 팀원 불러오기
			getChatUsers(); // 채팅 유저 리스트 불러오기
		}
	}else if(data.split(':')[0] == '3'){
		if(data.split(':')[2] == $('#hiddenUserId').val()){
			location.href=getContextPath()+'/project';
			swal('프로젝트에서 탈퇴 하였습니다.');
		}else{
			projectMemberProfile(); // 프로젝트 팀원 불러오기
			getChatUsers(); // 채팅 유저 리스트 불러오기
		}
	}
}

function onHeaderClose(evt) {}

function sendHeader(msg) {
	wHeaderSocket.send(msg);
}