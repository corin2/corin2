$(function() {
	
	// 채팅 페이지 시작 시, 함수 콜
	getUsers(69); // 멤버 가져오기 함수 TODO: projectNum 변경할 것.

	
	
	
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
	
	console.log("현재 유저: " + currentUser);
	$('#currentUser').html(currentUser);
	
	// 이메일주소 . -> *로 변경
	function convertEmail(userId) {
		return userId.replace(".", "*");
	}
	
	// 프로젝트 내 멤버 정보 가져오기
	function getUsers(projectNum) {
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
		$('#userList').append("<div id=" + userUid + ">" + "<h3>" + obj.userName + "</h3>" + "</div>");
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

	// 팀원 보기
	/*function showTeam() {
		

			// 팀원 추가
			db.child('users').on('child_added', function(snapshot) {
				var teamUser = snapshot.val();
				teamUser.key = snapshot.key;
				if(prop == teamUser.key) {
					$('#userList').append("<div id=" + teamUser.key + ">" + "<h3>" + teamUser.username + "</h3>" + "</div>");
					
					// 사용자 클릭 시
					$('#' + teamUser.key).click(function() {
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
					});
				}
			})
		}
	}*/


	// 메시지 변수
	messages = db.child('messages/' + 'test');

	// 메시지 보내기
	function sendMessage() {
		var text = $('#messageText');

		messages.update({
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

	// 메시지 뿌리기
	function showMessage(snapshot) {
		var message = snapshot.val();
		$('#mainDialogs').append("<p>" + message.username + ": " + message.text + " (" + convertTime(message.timestamp) +")" + "</p>");
	}

	// 메시지 출력 (안쓰고있음)
	function showData(user, data) {
		for(var prop in data) {
			$('#mainDialogs').append(user + ": " + data);
		}
	}

	// 변경된 사항이 있을 시 메시지 출력
	//messages.on('child_added', showMessage);

	$('#input').click(function() {
		addData();
		alert("데이터 들어감");
	});
	
	
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
    
    // 10미만 숫자 앞에 0 붙이기
    function pad(n) {
        return n > 9 ? "" + n: "0" + n;
    }
    
    // 현재 시간을 yyyyMMddHHmmsss 형식으로 맞추기
    function yyyyMMddHHmmsss() {
        var vDate = new Date();
        var yyyy = vDate.getFullYear().toString();
        var MM = (vDate.getMonth() + 1).toString();
        var dd = vDate.getDate().toString();
        var HH = vDate.getHours().toString();
        var mm = vDate.getMinutes().toString();

        var ss = vDate.getSeconds().toString();
        var sss= vDate.getMilliseconds().toString();
        return yyyy + (MM[1] ? MM : '0'+MM[0]) + (dd[1] ? dd : '0'+dd[0]) + (HH[1] ? HH : '0'+ HH[0])
            + (mm[1] ? mm : '0'+ mm[0]) + (ss[1] ? ss : '0'+ss[0])+ sss;
    };

}); // end - jQuery
