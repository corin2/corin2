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
	const MAKE_UID = "@make@";
	const TARGET_UID = "@target@";
	
	console.log("현재 유저: " + currentUser);
	$('#tempId').html(currentUser);
	
	// 채팅 페이지 시작 시, 함수 콜
	$('#conversation').empty(); // 대화창 초기화
	getUsers(currentProject); // 멤버 가져오기 함수
	
	// 프로젝트 내 멤버 정보 가져오기
	function getUsers(projectNum) {
		messages = db.child('messages/' + projectNum);
		
		$.ajax({
			url:"showMemberUserProfile",
			datatype:"JSON",
			data:{projectNum:projectNum},
			success:function(data){
				console.log(data);
				$.each(data.data, function(index, obj) {
					var userUid = convertEmail(obj.userId);
					
					initialData(userUid, obj); // 초기 데이터 생성
					updateUserList(userUid, obj); // 팀원 추가
					updateInfo(userUid, projectNum); // DB 정보 수정
				});
			}
		});
		
		// DB변동 시 메시지 출력
		// messages.on('child_added', showMessage);
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
	
	// 사용자 클릭 시
	//db.child('projects/' + sessionProjectNum + '/users').on('child_added', function(snapshot) {
	/*db.child('users').on('value', function(snapshot) {
		var user = snapshot.val();
		
		for(var userUid in user) {
			$('#' + userUid).click(function() {
				console.log(user.username + "님을 클릭함");
				
				privateChat(user); // 1:1 대화
				
				console.log("현재 메시지 경로: " + messages);
				
		        if (messages) {
		            messages.off('child_added', showMessage); // 이전 메시지 경로 리스너를 삭제
		            $('#conversation').empty(); // 대화창 초기화
		        }
				
				// DB변동 시 메시지 출력
				messages.on('child_added', showMessage);
			});
		}
	});*/
	
	// 사용자 클릭 시
	db.child('users').on('child_added', function(snapshot) {
		var user = snapshot.val();
		user.key = snapshot.key;
		$('#' + user.key).click(function() {
			console.log(user.username + "님을 클릭함");
			
			privateChat(user); // 1:1 대화
			
			console.log("1 현재 메시지 경로: " + messages);
			
	        /*if (messages) {
	            messages.off('child_added', showMessage); // 이전 메시지 경로 리스너를 삭제
	            $('#conversation').empty(); // 대화창 초기화
	        }*/
			
			// DB변동 시 메시지 출력
			//messages.on('child_added', showMessage);
		});
	});
	
	// 1:1 대화
	function privateChat(user) {
		// 현재 사용자의 FirebaseDB용 Uid
		var currentUid = convertEmail(currentUser);
		
		// FirebaseDB 내 저장될 1:1대화방 Uid 명
		var roomPath = MAKE_UID + currentUid + TARGET_UID + user.key;
		var reverseRoomPath = MAKE_UID + user.key + TARGET_UID + currentUid;
		
		
		// FirebaseDB 검색
		//db.child('privateChats/').on('value', function(snapshot) {
		db.child('privateChats/').once('value',function(snapshot) {
			console.log("2 FirebaseDB 검색 발동됨");
			var userRoom = snapshot.val();
			var hasRoom = searchPrivateRoom(userRoom, roomPath, reverseRoomPath); // 1:1 대화방 검색
			
			if(!hasRoom) {
				makePrivateRoom(roomPath, currentUid, user); //1:1 대화방 생성
				messages = db.child('messages/' + roomPath);
			}
			console.log("3 현재메시지: " + messages);
			console.log("4 FirebaseDB 검색끝");
			
			
	        //messages.off('child_added', showMessage); // 이전 메시지 경로 리스너를 삭제
	        $('#conversation').empty(); // 대화창 초기화
	        
			messages.on('child_added', showMessage); // DB변동 시 메시지 출력
			
		});
		console.log("5 FirebaseDB 검색함수 끝");
		
	}
	
	// 1:1 대화방 검색
	function searchPrivateRoom(userRoom, roomPath, reverseRoomPath) {
		var hasRoom = false; // 방 존재여부
		
		for(var prop in userRoom) {
			if(prop == roomPath) {
				messages = db.child('messages/' + roomPath);
				hasRoom = true;
			}else if(prop == reverseRoomPath) {
				messages = db.child('messages/' + reverseRoomPath);
				hasRoom = true;
			}
		}
		
		return hasRoom;
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
	
	// 메시지 출력 함수
	function showMessage(snapshot) {
		var message = snapshot.val();
		//$('#mainDialogs').append("<p>" + message.username + ": " + message.text + " (" + convertTime(message.timestamp) +")" + "</p>");
		
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
	
	// DB변동 시 메시지 출력
	messages.on('child_added', showMessage);
	
	//////////// [유틸 함수] ////////////
	
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
