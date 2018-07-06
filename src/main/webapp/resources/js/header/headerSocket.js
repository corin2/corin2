$(function(){
	headerconnect();
});

var wHeaderSocket;

/**
* @함수명 : headerconnect()
* @작성일 : 2018. 06. 15.
* @작성자 : 김 진 원
* @설명 : 헤더에서 사용될 websocket 연결을 위한 함수
**/
function headerconnect() {
	wHeaderSocket = new WebSocket("ws://localhost:8090/headerWebSocket?projectNum="+ sessionProjectNum);
	wHeaderSocket.onopen = onHeaderOpen;
	wHeaderSocket.onmessage = onHeaderMessage;
	wHeaderSocket.onclose = onHeaderClose;
}

/**
* @함수명 : disHeaderconnect()
* @작성일 : 2018. 06. 15.
* @작성자 : 김 진 원
* @설명 : 헤더소켓에서 빠져나갈때 실행
**/
function disHeaderconnect() {
	wHeaderSocket.close();
}

function onHeaderOpen(evt) {}

/**
* @함수명 : onHeaderMessage(evt)
* @작성일 : 2018. 06. 15.
* @작성자 : 김 진 원
* @설명 : 소켓에서 건네오는 데이터를 가공하여 실행 시킬 함수를 정의하는 곳.
* @param evt - 소켓에서 건네오는 데이터가 담긴 json
**/
function onHeaderMessage(evt) {
	var data = evt.data;
	getChatUsers(); // 채팅 유저 리스트 불러오기
	
	if(data.split(':')[0] == '1'){
		projectMemberProfile();
	}else if(data.split(':')[0] == '2'){
		if(data.split(':')[2] == $('#hiddenUserId').val()){
			location.href=getContextPath()+'/project';
			swal({title:'해당 프로젝트에서 제명 되었습니다.'});
		}else{
			projectMemberProfile(); // 프로젝트 팀원 불러오기
		}
	}else if(data.split(':')[0] == '3'){
		if(data.split(':')[2] == $('#hiddenUserId').val()){
			location.href=getContextPath()+'/project';
			swal({title:'프로젝트에서 탈퇴 하였습니다.'});
		}else{
			projectMemberProfile(); // 프로젝트 팀원 불러오기
		}
	}
}

function onHeaderClose(evt) {}

/**
* @함수명 : sendHeader(msg)
* @작성일 : 2018. 06. 15.
* @작성자 : 김 진 원
* @설명 : 소켓으로 보낼 데이터를 받아 보내주는 곳
* @param msg - 소켓으로 보낼 데이터 값
**/
function sendHeader(msg) {
	wHeaderSocket.send(msg);
}