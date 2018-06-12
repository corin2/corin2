$(function() {

	//Firebase 초기화
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

	function addData() {
		var folder = db.child('projects');
		folder.push({
			projectnum: 100,
			projectname: "호올스"
		});
	}

	$('#sendMessage').click(function() {
		addData();
		alert("데이터 들어감");
	});

}); // end - jQuery
