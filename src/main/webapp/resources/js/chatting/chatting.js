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
	//var users;
	var messages;
	var currentProject;
	var currentUser = "테스트";
	var currentUserUid = "-LEvfIYw9ZVRaiXNUDRB";
	const MAKE_UID = "@make@";
	const TARGET_UID = "@target@";
	//const TIME_NOW = "@time@";
	
	// 프로젝트 내 멤버 정보 가져오기
	function getUsers(projectNum) {
		$.ajax({
			url:"showMemberUserProfile",
			datatype:"JSON",
			data:{projectNum:projectNum},
			success:function(data){
				console.log(data);
				$.each(data.data, function(index, obj) {
					console.log("오브젝트: " + obj.userName);
					var userUid = initialData(obj);
					updateInfo(userUid, projectNum);
				});
			}
		});
	}
	
	// 멤버 가져오기 함수 콜
	getUsers(69);
	
	// 초기 데이터 생성
	function initialData(obj) {
		db.child('users').push({
			'userid': obj.userId,
			'username': obj.userName,
			'userprofile': obj.userProfile,
/*			'projects': {
				1: true,
				2: true
			}*/
		});
		
		db.child('users').on('child_changed', function(snapshot) {
			return snapshot.key;
		});
		
		/*db.child('projects/1').set({
			'projectname': '테스트',
			'users': {
				'-LF-nn2JnUBU_2yQ6B4Q': true
			}
		});*/
	}
	
	// updateInfo
	function updateInfo(userUid, projectNum) {
		var updateProject = {};
		updateProject[projectNum] = true;
		db.child('users/' + userUid).update(updateProject);
		
		var updateUser = {};
		updateUser[userUid] = true;
		
		db.child('projects/' + projectNum + '/users').update(updateUser);
	}
	
	//initialData();
	
	// User 데이터 읽기
	/*db.child('users').on('child_added', function(snapshot) {
		var user = snapshot.val();
		user.key = snapshot.key;
		console.log("유저 키: " + user.key);
		console.log("유저아이디: " + user.userid);
		db.child('users/' + user.key + '/project')
	});*/
	
	
	
	
	// 프로젝트 생성
	$('#createProjectBtn').click(function() {
		db.child('projects').push({
			projectNum: $('#projectNum').val(),
			projectName: $('#projectName').val()
		}, function() {
			alert('프로젝트 생성 완료!');
		})
	});

	// 프로젝트가 추가 되었을 때
	db.child('projects').on('child_added', function(snapshot) {
		// 프로젝트 데이터
		var project = snapshot.val();

		// Firebase DB의 data key
		project.key = snapshot.key;

		$('#projectList').append("<div id=" + project.key + ">" + "<h3>" + project.projectName + "</h3>" + "</div>");

		// 팀원 보기
		function showTeam() {
			for(var prop in project.team) {

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
		}
		
		// 프로젝트 클릭 시
		$('#' + project.key).click(function() {
			console.log("프로젝트 키: " + project.key)
			console.log("프로젝트 제목: " + project.projectName)
			$('#userList').empty();
			$('#userList').html("<h1>Users</h1>");
			showTeam();
			selectProject();
			$('#currentUser').append(currentUser);
		});

		// 프로젝트 선택했을 때
		function selectProject() {
			alert("눌러짐");
			$('#mainDialogs').empty();
			messages = db.child('messages/' + project.key);
			messages.on('child_added', showMessage);
		}

		// 사용자가 추가 될 때 프로젝트에 입력
		db.child('users').on('child_added', function(snapshot) {
			var user = snapshot.val();
			user.key = snapshot.key;

			var userUpdates = {};
			userUpdates[user.key] = true;

			// db.child('projects/' + project.key + "/team").update(userUpdates);
		});
	});

	// 사용자 명
	//users = db.child('users');

	// 사용자 추가
	function addUser() {
		db.child('users').push({
			userid: $('#userid').val(),
			username: $('#username').val(),
			userprofile: "",
			gradenum: "G200"
		});
	}

	// 이메일 입력 시 사용자 추가
	$('#register').click(function() {
		addUser();

		alert("사용자가 추가되었습니다.");

		$('#userid').val('');
	});

	// 메시지 변수
	//messages = db.child('messages/' + 'test');

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
