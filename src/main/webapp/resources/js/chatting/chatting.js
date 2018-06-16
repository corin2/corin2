$(function() {
		
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
	var messages;
	var currentProject;
	var currentUser = $('#hiddenUserId').val();
	const MAKE_UID = "_make_";
	const TARGET_UID = "_target_";
	
	console.log("현재 유저: " + currentUser);
	$('#tempId').html(currentUser);
	
	// 채팅 페이지 시작 시, 함수 콜
	getUsers(sessionProjectNum); // 멤버 가져오기 함수
	$('#mainDialogs').empty();
	
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
					
					initialData(userUid, obj);
					updateUserList(userUid, obj);
					updateInfo(userUid, projectNum);
				});
			}
		});
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
	db.child('users').on('child_added', function(snapshot) {
		var user = snapshot.val();
		user.key = snapshot.key;
		$('#' + user.key).click(function() {
			alert(user.username + "을 눌렀나요?");
			
			privateChat(user);
			
			alert(user.username + "님과 대화를 시작합니다.");
			$('#conversation').empty();
			messages.on('child_added', showMessage);
		});
	});
	
	// 1:1 대화
	function privateChat(user) {
		// 현재 사용자의 FirebaseDB용 Uid
		var currentUid = convertEmail(currentUser);
		
		if(currentUid == user.key) {
			alert("자기 자신입니다.");
			return;
		}

		var roomPath = MAKE_UID + currentUid + TARGET_UID + user.key;
		var reverseRoomPath = MAKE_UID + user.key + TARGET_UID + currentUid;
		console.log("roomPath: " + roomPath);
		console.log("reverseRoomPath: " + reverseRoomPath);
		
		// 최초 만들기
		/*db.child('privateChats').update({
			roomPath2 : {
				'roomUid': roomPath,
				'tergetUserUid': user.key,
				'targetUserName': user.username,
				'timestamp': Date.now()
			}
		});*/
		
		db.child('privateChats/').on('value', function(snapshot) {
			var userRoom = snapshot.val();
			userRoom.key = snapshot.key;
			//console.log("방 이름이? " + userRoom.key);
			
			// 방 검색
			var hasRoom = false;
			
			for(var prop in userRoom) {
				console.log("방 이름: " + prop);
				if(prop == roomPath) {
					console.log("룸패스와 동일: " + prop);
					messages = db.child('messages/' + roomPath);
					hasRoom = true;
				}else if(prop == reverseRoomPath) {
					console.log("@리버스룸패스와 동일: " + prop);
					messages = db.child('messages/' + reverseRoomPath);
					hasRoom = true;
				}
			}
			
			if(!hasRoom) {
				var createPrivateChat = {
						'roomUid': roomPath,
						'makeUserUid': currentUid,
						'makeUserUid': "추가예정",
						'tergetUserUid': user.key,
						'targetUserName': user.username,
						'timestamp': Date.now()
				};
				db.child('privateChats/' + roomPath).update(createPrivateChat);
				messages = db.child('messages/' + roomPath);
			}
			
			/*if(userRoom.key == "roomPath") {
				console.log("룸패스와 동일");
				//db.child('privateChats/').off();
			}else if(userRoom.key == "roomPath2") {
				console.log("@리버스룸패스와 동일");
				//db.child('privateChats/').off();
			}else {
				console.log("둘 다 동일하지 않음");
				//db.child('privateChats/').off();
			}*/
			
			/*if(userRoom.key == roomPath && userRoom.key == roomPath) {
				if(userRoom.key == roomPath) {
					alert(roomPath + "로 연결합니다.");
					messages = db.child('messages/' + roomPath);
				}else if(userRoom.key == reverseRoomPath) {
					alert("[변경]" + roomPath + "로 연결합니다.");
					messages = db.child('messages/' + reverseRoomPath);
				}else {
					var createPrivateChat = {
							'roomUid': roomPath,
							'tergetUserUid': user.key,
							'targetUserName': user.username,
							'timestamp': Date.now()
					};
					db.child('privateChats/' + roomPath).update(createPrivateChat);
					messages = db.child('messages/' + roomPath);
				}
			}*/
		});
	}
	
	/*$('#' + teamUser.key).click(function() {
		// 1:1 대화방 개설
		
		//var roomPath = MAKE_UID + '-LEvfIYw9ZVRaiXNUDRB' + TIME_NOW + yyyyMMddHHmmsss();
		var roomPath = MAKE_UID + currentUserUid + TARGET_UID + teamUser.key;
		var reverseRoomPath = MAKE_UID + teamUser.key + TARGET_UID + currentUserUid;
		if(db.child('messages/' + roomPath)) {
			console.log("뭔데: " + db.child('messages/' + roomPath));
			alert(roomPath + "로 연결합니다.");
			messages = db.child('messages/' + roomPath);
		}else if(db.child('messages/' + reverseRoomPath)) {
			alert(reverseRoomPath + "로 연결합니다.");
			messages = db.child('messages/' + reverseRoomPath);
		}else {
			var userRoomsUpdates = {
					'roomUid': roomPath,
					'tergetUserUid': teamUser.key,
					'targetUserName': teamUser.username,
					'timestamp': Date.now()
			};
			db.child('userRooms/' + roomPath).update(userRoomsUpdates);
		}
		
		alert(teamUser.username + "님과 대화를 시작합니다.");
		$('#mainDialogs').empty();
		messages.on('child_added', showMessage);
	});*/

	
	
	
	
	

	
    ////////////[메시지] ////////////
	
	// 메시지 보내기
	function sendMessage() {
		var text = $('#messageText');

		messages.push({
			username: currentUser,
			text: text.val(),
			timestamp: Date.now()
		});

		text.val('');
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
	
	// 메시지 출력
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
