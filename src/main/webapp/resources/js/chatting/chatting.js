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

	//var users;
	var messages;
	var currentProject;
	var currentUser = "[no selected]";

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
							messages = db.child('messages/' + '-LEvfIYw9ZVRaiXNUDRB');
							var userRoomsUpdates = {
									'tergetUser': teamUser.key,
									'timestamp': Date.now()
							};
							db.child('userRooms/' + '-LEvfIYw9ZVRaiXNUDRB/' + teamUser.key).update(userRoomsUpdates);
							//currentUser = teamUser.username;
							//$('#selectedUser').html(currentUser);
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
			$('#currentUser').append("뚱이");
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

	// 메시지 뿌리기
	function showMessage(snapshot) {
		var message = snapshot.val();
		$('#mainDialogs').append("<p>" + message.username + ": " + message.text + " (" + message.timestamp +")" + "</p>");
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

}); // end - jQuery
