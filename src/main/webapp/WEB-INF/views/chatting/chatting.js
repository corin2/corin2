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
	console.log("디비: " + db);
	// [초기화 끝]

	// 데이터 입력
	function addData() {
		var folder = db.child('projects');
		folder.push({
			projectnum: 100,
			projectname: "호올스"
		});
	}

	var user1 = "지너니";
	var user2 = "호올스";
	var messages = db.child('messages/' + 'test');

	// 메시지 보내기
	function sendMessage() {
		var text = $('#messageText');

		messages.push({
			username: user1,
			text: text.val(),
			timestamp: Date.now()
		});

		text.val('');
	}

	// 메시지 보기
	function showMessage(snapshot) {
		var message = snapshot.val();
		console.log("메시지: " + message.text);
		$('#mainDialogs').html(message.username + ": " + message.text + " (" + message.timestamp +")");
	}

	// 메시지 출력
	function showData(user, data) {
		for(var prop in data) {
			$('#mainDialogs').append(user + ": " + data);
		}
	}

	messages.on('child_added', showMessage);


	$('#sendMessage').click(function() {
		sendMessage();
	});

	$('#input').click(function() {
		addData();
		alert("데이터 들어감");
	});

}); // end - jQuery
