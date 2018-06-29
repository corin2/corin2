$(function() {
	// FirebaseDB 권한 정책에 따름
	'use strict';
		
	// Firebase 초기화
	// [초기화 시작]
	var config = {
		apiKey: "AIzaSyDmfyvIHlY8QYVXO6shi6r85k3ocZWJAw4",
		authDomain: "testcorin2.firebaseapp.com",
		databaseURL: "https://testcorin2.firebaseio.com",
		projectId: "testcorin2",
		storageBucket: "testcorin2.appspot.com",
		messagingSenderId: "477164914852"
	};

	firebase.initializeApp(config);

	var db = firebase.database().ref();
	// [초기화 끝]
	
	// 변수, 상수 설정
	var currentProject = sessionProjectNum;
	var currentUser = $('#hiddenUserId').val();
	var currentUserName;
	var currentChatUserProfile;
	var messages;
	const PROJECT_NUM = "@project@";
	const PRIVATE_STR = "@private@";
	
	// 채팅 페이지 시작 시, 함수 콜
	$('#conversation').empty(); // 대화창 초기화
	if(sessionProjectNum != 'null') getUsers(currentProject); // 멤버 가져오기 함수
	
	// 사용자명 툴팁
	$('[data-toggle="tooltip"]').tooltip(); //TODO 수정할 것
	
	// All 버튼 클릭 시
	$('#allUsers').click(function() {
		changeColor('#allUsers'); // 클릭 시 색상변경
		messages = db.child('messages/' + currentProject); // 전체채팅 메시지 경로
		showMessage(); // 메시지 출력
	});
	
	// 프로젝트 내 멤버 정보 가져오기
	function getUsers(projectNum) {
		messages = db.child('messages/' + projectNum); // 전체채팅 메시지 경로
		$.ajax({
			url:"showMemberUserProfile",
			datatype:"JSON",
			data:{projectNum:projectNum},
			success:function(data){
				$.each(data.data, function(index, obj) {
					// 현재 프로젝트의 사용자들의 FirebaseDB용 Uid를 md5형식으로 변환
					var userUid = md5(obj.userId);
					
					showcurrentChatUserProfile(userUid, obj); // 프로필 이미지 표시
					initialData(userUid, obj); // 초기 데이터 생성
					updateUserList(userUid, obj); // 팀원 추가
					updateInfo(userUid, projectNum); // DB 정보 수정
				});
			}
		});
		
		showMessage(); // 메시지 출력
	}
	
	// 현재 사용자의 프로필 이미지 표시 함수
	function showcurrentChatUserProfile(userUid, obj) {
		var currentUserUid = md5(currentUser);
		if(userUid === currentUserUid) {
			currentUserName = obj.userName; // 현재 사용자의 이름
			currentChatUserProfile = obj.userProfile; // 현재 사용자의 프로필 이미지
			
			// 현재 사용자의 이름 표시
			$('#currentUserName').html(currentUserName);
			
			// 현재 사용자의 프로필 이미지 표시
			$('#currentChatUserProfile').attr("src","resources/images/profile/" + currentChatUserProfile);
		}
	}
	
	// 초기 데이터 생성
	function initialData(userUid, obj) {
		db.child('users/' + userUid).update({
			'userid': obj.userId,
			'username': obj.userName,
			'userprofile': obj.userProfile,
		});
	}
	
	// 팀원 추가
	function updateUserList(userUid, obj) {
		$('.sideBar').append(
				//TODO 수정할 것
				'<div class="row sideBar-body" id=' + userUid + ' data-toggle="tooltip" title="' + obj.userName + '">'
				+ '<div class="col-sm-3 col-xs-3 sideBar-avatar">'
				+ '<div class="avatar-icon">'
				+ '<img src="resources/images/profile/' + obj.userProfile +'">'
				+ '</div>'
				+ '</div>'
				+ '</div>'
		);
	}
	
	// DB 정보 수정
	function updateInfo(userUid, projectNum) {
		// 유저DB 내 프로젝트 정보 수정
		var updateProject = {};
		updateProject[projectNum] = true;
		db.child('users/' + userUid + '/projects').update(updateProject);
		
		// 프로젝트DB 내 유저 정보 수정
		var updateUser = {};
		updateUser[userUid] = true;
		db.child('projects/' + projectNum + '/users').update(updateUser);
	}
		
	// 사용자 검색
	db.child('users').on('child_added', function(snapshot) {
		var user = snapshot.val();
		user.key = snapshot.key;
		
		// 사용자 클릭 시
		$('#' + user.key).click(function() {
			changeColor('#' + user.key); // 클릭 시 색상변경
			privateChat(user); // 1:1 대화
		});
	});
	
	// 1:1 대화
	function privateChat(user) {
		// 현재 사용자의 FirebaseDB용 Uid를 md5형식으로 변환
		var currentUid = md5(currentUser);
				
		// FirebaseDB 내 저장될 1:1대화방 Uid 명
		var userSort = [user.key, currentUid].sort().join('@sort@');
		var roomPath = PROJECT_NUM + currentProject + PRIVATE_STR + userSort;
		
		// FirebaseDB 검색
		db.child('privateChats/').once('value',function(snapshot) {
			var userRoom = snapshot.val();
			var hasRoom = searchPrivateRoom(userRoom, roomPath); // 1:1 대화방 검색
			
			if(!hasRoom) { // hasRoom이 false이면
				makePrivateRoom(roomPath, currentUid, user); //1:1 대화방 생성
				messages = db.child('messages/' + roomPath);
			}
			
			showMessage(); // 메시지 출력
		});
	}
	
	// 1:1 대화방 검색
	function searchPrivateRoom(userRoom, roomPath) {
		// 1:1 대화방 존재 여부 확인
		
        for(var prop in userRoom) {
            if(prop === roomPath) {
                messages = db.child('messages/' + roomPath);
                return true; // 존재하면 true return
            }
        }
        
        return false; // 존재하지 않으면 false return
	}
	
	// 1:1 대화방 생성
	function makePrivateRoom(roomPath, currentUid, user) {
		var createPrivateChat = {
				'roomUid': roomPath,
				'makeUserUid': currentUid,
				'makeUserName': currentUserName,
				'tergetUserUid': user.key,
				'targetUserName': user.username,
				'timestamp': Date.now()
		};
		
		db.child('privateChats/' + roomPath).update(createPrivateChat);
	}
	
    ////////////[메시지] ////////////
	
	// 메시지 보내기
	function sendMessage() {
		var text = $('#messageText'); // 메시지 내용
		
		// 공백 입력시 처리
		if(text.val() == "") {
			return false;
		}

		messages.push({
			'userid': currentUser,
			'username': currentUserName,
			'userprofile': currentChatUserProfile,
			'text': text.val(),
			'timestamp': Date.now()
		});

		text.val(''); // 메시지 초기화
	}

	// 버튼 클릭 시 메시지 보내기
	$('#sendMessageBtn').click(function() {
		sendMessage();
	});

	// 엔터 입력 시 메시지 보내기
	$('#messageText').on('keypress', function(e) {
		if(e.keyCode == 13) {
			sendMessage();
		}
	})
	
	// DB변동 시 메시지 출력 함수
	var currentMessages;
	function showMessage() {
		$('#conversation').empty(); // 대화창 초기화
		
		if (currentMessages) {
			currentMessages.off('child_added', makeMessage);
		}
		messages.on('child_added', makeMessage); // DB변동 시 메시지 출력
		currentMessages = messages;
	}
	
	// 메시지 생성 함수
	function makeMessage(snapshot) {
		var message = snapshot.val();
		
		if(currentUser == message.userid) {
			// 보낸 메시지
			$('#conversation').append(
					'<div class="row message-body">'
					+ '<div class="col-sm-12 message-main-sender">'
					+ '<div class="sender">'
					+ '<div class="message-text">'
					+ message.text
					+ '</div>'
					+ '<span class="message-time pull-right">'
					+ convertTime(message.timestamp)
					+ '</span>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
			);
		}else {
			// 받은 메시지
			$('#conversation').append(
					'<div class="row message-body">'
					+ '<div class="col-sm-12 message-main-receiver">'
					+ '<div class="col-sm-3 heading-avatar-icon">'
					+ '<img src="resources/images/profile/' + message.userprofile + '">'
					+ '</div><div class="col-sm-9 heading-avatar-name">'
					+ '<span style="font-size: 15px; margin-right :20%; font-weight:bold;">' + message.username +'</span>'
					+ '<div class="receiver bubble">'
					+ '<div class="message-text">'
					+ message.text
					+ '</div>'
					+ '<span class="message-time pull-right">'
					+ convertTime(message.timestamp)
					+ '</span>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
					+ '</div>'
			);
		}
		
		// 대화창 스크롤을 항상 아래로
		$("#conversation").scrollTop($("#conversation")[0].scrollHeight);
	}
	
	//////////// [유틸 함수] ////////////
	
	// 버튼 클릭시 색 변경
	function changeColor(btnId) {
		$('.sideBar-body').css('background-color', '');
		$(btnId).css('background-color', '#FFF');
	}
	
    // 10미만 숫자 앞에 0 붙이기
    function pad(n) {
        return n > 9 ? "" + n: "0" + n;
    }
	
    // timestamp를 날짜 시간 으로 변환
    function convertTime(timestamp) {
        var date = new Date(timestamp),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            week = new Array('일', '월', '화', '수', '목', '금', '토');

        var convertDate = year + "."+month+"."+ day +"("+ week[date.getDay()] +") ";
        var convertHour="";
        if(hour < 12){
            convertHour = "오전 " + pad(hour) +":" + pad(minute);
        }else if(hour === 12){
            convertHour = "오후 " + pad(hour) +":" + pad(minute);
        }else{
            convertHour = "오후 " + pad(hour - 12) +":" + pad(minute);
        }

        return convertDate + convertHour;
    }

}); // end - jQuery
