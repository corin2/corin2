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
	var messages;
	const PROJECT_NUM = "@project@";
	const PRIVATE_STR = "@private@";
	
	console.log("현재 유저: " + currentUser);
	$('#currentUser').html(currentUser);
	
	// 채팅 페이지 시작 시, 함수 콜
	$('#conversation').empty(); // 대화창 초기화
	getUsers(currentProject); // 멤버 가져오기 함수
	
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
					var userUid = convertEmail(obj.userId);
					
					initialData(userUid, obj); // 초기 데이터 생성
					updateUserList(userUid, obj); // 팀원 추가
					updateInfo(userUid, projectNum); // DB 정보 수정
				});
			}
		});
		
		showMessage(); // 메시지 출력
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
		//$('#userList').append("<div id=" + userUid + ">" + "<h3>" + obj.userName + "</h3>" + "</div>");
		
		$('.sideBar').append(
				'<div class="row sideBar-body" id=' + userUid + '>'
				+ '<div class="col-sm-3 col-xs-3 sideBar-avatar">'
				+ '<div class="avatar-icon">'
				+ '<img src=' + "resources/profile/nogon.JPG" +'>'
				+ '</div>'
				+ '</div>'
				+ '<div class="col-sm-9 col-xs-9 sideBar-main">'
				+ '<div class="row">'
				+ '<div class="col-sm-8 col-xs-8 sideBar-name">'
				+ '<span class="name-meta">' + obj.userName
				+ '</span>'
				+ '</div>'
				+ '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">'
				+ '<span class="time-meta pull-right">today'
				+ '</span>'
				+ '</div>'
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
		// 현재 사용자의 FirebaseDB용 Uid
		var currentUid = convertEmail(currentUser);
		
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
				'makeUserUid': "추가예정",
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
		
		console.log("텍스트 " + text);
		// 공백 입력시 처리
		if(text.val() == "") {
			return false;
		}

		messages.push({
			username: currentUser,
			text: text.val(),
			timestamp: Date.now()
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
		
		if(currentUser == message.username) {
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
					+ '<div class="receiver">'
					+ '<div class="heading-avatar-icon">'
		            + '<img src="https://pbs.twimg.com/profile_images/887622532647469056/IG7Zk1wS_400x400.jpg">'
		            + '</div>'
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
		}
		
		// 대화창 스크롤을 항상 아래로
		$("#conversation").scrollTop($("#conversation")[0].scrollHeight);
	}
	
	//////////// [유틸 함수] ////////////
	
	// 버튼 클릭시 색 변경
	function changeColor(btnId) {
		$('.sideBar-body').css('background-color', '');
		$(btnId).css('background-color', '#c0daff');
	}
	
	// 이메일주소  -> Uid로 변경 
	function convertEmail(userId) {
		return userId.replace("@", "-").replace(".", "-");;
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

        var convertDate = year + "년 "+month+"월 "+ day +"일 ("+ week[date.getDay()] +") ";
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
