/**
	파일명: chatting.js
    설명: Firebase를 사용한 채팅 구현
    작성일: 2018. 6. 5.
    작성자: 강 성 훈
*/

$(function() {
	// FirebaseDB 권한 정책에 따름
	'use strict';
		
	// Firebase 초기화
	// [초기화 시작]
	
	// 아래 키는 Firebase 콘솔에서 권한 정책 변경을 통해 보안 설정이 가능하므로 별도 관리하지 않음
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
	var currentUser = $('#hiddenUserId').val(); // 현재 사용자
	var currentUserName; // 현재 사용자 이름
	var currentMessages; // 현재 메시지
	var messages; // 새로운 메시지
	var chatUserList; // 유저리스트
	
	const PROJECT_NUM = "@project@"; // 프로젝트 구분 문자
	const PRIVATE_STR = "@private@"; // 1:1채팅 구분 문자
	
	// 채팅 페이지 시작 시, 함수 콜
	$('#conversation').empty(); // 대화창 초기화
	if(sessionProjectNum != 'null') {
		getChatUsers(); // 멤버 가져오기 함수
	}
	
	// 사용자명 툴팁
	$('[data-toggle="tooltip"]').tooltip(); //TODO 수정할 것
	
	// getChatUsers함수를 $(function() {...}) 함수 범위 밖에서 사용 선언
	window.getChatUsers = getChatUsers;
	
	/**
	    * @함수명 : getChatUsers
	    * @작성일 : 2018. 6. 22.
	    * @작성자 : 강 성 훈
	    * @설명 : 현재 프로젝트 사용자 정보 수집 및 목록 표시
	*/
	function getChatUsers() {
		$('.sideBar').empty(); // 채팅 유저리스트 초기화
		getChatAllIcon(); // 전체채팅 아이콘 불러오기
		
		messages = db.child('messages/' + sessionProjectNum); // 전체채팅 메시지 경로
		chatUserList = []; // 채팅 유저리스트 배열
		
		$.ajax({
			url:"showMemberUserProfile",
			datatype:"JSON",
			data:{projectNum:sessionProjectNum},
			async: false,
			success:function(data){
				$.each(data.data, function(index, obj) {
					// 현재 프로젝트의 사용자들의 FirebaseDB용 Uid를 md5형식으로 변환
					var userUid = md5(obj.userId);
					
					showCurrentChatUserProfile(obj); // 프로필 이미지 표시
					initialData(userUid, obj); // 초기 데이터 생성
					getChatUserList(userUid, obj); // 채팅 사용자 목록 불러오기
					updateInfo(userUid); // DB 정보 수정
					
					chatUserList.push(obj);
				});
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
			}
		});
		
		showMessage(); // 기존 채팅 메시지 출력
		selectAllChat(); // 전체채팅 선택
		selectPrivateChat(); // 1:1채팅 선택
	}
	
	/**
	    * @함수명 : showCurrentChatUserProfile
	    * @작성일 : 2018. 6. 12.
	    * @작성자 : 강 성 훈
	    * @설명 : 현재 사용자의 프로필 이미지 표시 함수
	    * @param : obj
	*/
	function showCurrentChatUserProfile(obj) {
		if(currentUser == obj.userId) {
            currentUserName = obj.userName; // 현재 사용자의 이름
			
			// 현재 사용자의 이름 표시
			$('#currentUserName').html(obj.userName);
			// 현재 사용자의 프로필 이미지 표시
			$('#currentChatUserProfile').attr("src",  obj.userProfile);
		}
	}
	
	/**
	    * @함수명 : initialData
	    * @작성일 : 2018. 6. 12.
	    * @작성자 : 강 성 훈
	    * @설명 : 초기 데이터 생성
	    * @param : userUid, obj
	*/
	function initialData(userUid, obj) {
		db.child('users/' + userUid).update({
			'userid': obj.userId,
			'username': obj.userName,
			'userprofile': obj.userProfile,
		});
	}

	/**
	    * @함수명 : getChatAllIcon
	    * @작성일 : 2018. 6. 18.
	    * @작성자 : 강 성 훈
	    * @설명 : 프로젝트 전체 채팅 아이콘 불러오기
	*/
	function getChatAllIcon() {
		$('.sideBar').append(
				'<div class="row sideBar-body" id="allUsers" style="background-color: #FFF;">'
	            + '<div class="col-sm-3 col-xs-3 sideBar-avatar">'
	            + '<div class="avatar-icon">'
	            + '<img src="resources/images/chatting/all.png">'
	            + '</div>'
	            + '</div>'
	            + '</div>'
		);
	}

	/**
	    * @함수명 : getChatUserList
	    * @작성일 : 2018. 6. 12.
	    * @작성자 : 강 성 훈
	    * @설명 : 채팅 사용자 목록 불러오기
	    * @param : userUid, obj
	*/
	function getChatUserList(userUid, obj) {
		$('.sideBar').append(
				'<div class="row sideBar-body" id=' + userUid + ' data-toggle="tooltip" title="' + obj.userName + '">'
				+ '<div class="col-sm-3 col-xs-3 sideBar-avatar">'
				+ '<div class="avatar-icon">'
				+ '<img src="'+"resources/images/profile/" + obj.userProfile +'">'
				+ '</div>'
				+ '</div>'
				+ '</div>'
		);
	}

	/**
	    * @함수명 : updateInfo
	    * @작성일 : 2018. 6. 13.
	    * @작성자 : 강 성 훈
	    * @설명 : 채팅 사용자 목록 불러오기
	    * @param : userUid
	*/
	// DB 정보 수정
	function updateInfo(userUid) {
		// 유저DB 내 프로젝트 정보 수정
		var updateProject = {};
		updateProject[sessionProjectNum] = true;
		db.child('users/' + userUid + '/projects').update(updateProject);
		
		// 프로젝트DB 내 유저 정보 수정
		var updateUser = {};
		updateUser[userUid] = true;
		db.child('projects/' + sessionProjectNum + '/users').update(updateUser);
	}

	/**
	    * @함수명 : selectAllChat
	    * @작성일 : 2018. 6. 13.
	    * @작성자 : 강 성 훈
	    * @설명 : All 버튼 클릭 시 전체 채팅 시작
	*/
	function selectAllChat() {
		$('#allUsers').click(function() {
			changeColor('#allUsers'); // 클릭 시 색상변경
			messages = db.child('messages/' + sessionProjectNum); // 전체채팅 메시지 경로
			showMessage(); // 메시지 출력
		});
	}
	
	/**
	    * @함수명 : selectPrivateChat
	    * @작성일 : 2018. 6. 19.
	    * @작성자 : 강 성 훈
	    * @설명 : 사용자 클릭 시 1:1 채팅 시작
	*/
	function selectPrivateChat() {
		db.child('users').on('child_added', function(snapshot) {
			var user = snapshot.val();
			user.key = snapshot.key;
			
			// 사용자 클릭 시
			$('#' + user.key).click(function() {
				changeColor('#' + user.key); // 클릭 시 색상변경
				privateChat(user); // 1:1 대화
			});
		});
	}

	/**
	    * @함수명 : privateChat
	    * @작성일 : 2018. 6. 19.
	    * @작성자 : 강 성 훈
	    * @설명 : 1:1 대화
	    * @param : user
	*/
	function privateChat(user) {
		// 현재 사용자의 FirebaseDB용 Uid를 md5형식으로 변환
		var currentUid = md5(currentUser);
				
		// FirebaseDB 내 저장될 1:1대화방 Uid 명
		var userSort = [user.key, currentUid].sort().join('@sort@');
		var roomPath = PROJECT_NUM + sessionProjectNum + PRIVATE_STR + userSort;
		
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

	/**
	    * @함수명 : searchPrivateRoom
	    * @작성일 : 2018. 6. 19.
	    * @작성자 : 강 성 훈
	    * @설명 : 1:1 대화방 검색
	    * @param : userRoom, roomPath
	    * @return : true || false
	*/
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

	/**
	    * @함수명 : makePrivateRoom
	    * @작성일 : 2018. 6. 19.
	    * @작성자 : 강 성 훈
	    * @설명 : 1:1 대화방 생성
	    * @param : roomPath, currentUid, user
	*/
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
	
	/**
	    * @함수명 : sendMessage
	    * @작성일 : 2018. 6. 15.
	    * @작성자 : 강 성 훈
	    * @설명 : 메시지 보내기
	*/
	function sendMessage() {
		var text = $('#messageText'); // 메시지 내용
		
		// 공백 입력시 처리
		if(text.val() == "") {
			return false;
		}

		messages.push({
			'userid': currentUser,
			'username': currentUserName,
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
	
	/**
	    * @함수명 : showMessage
	    * @작성일 : 2018. 6. 15.
	    * @작성자 : 강 성 훈
	    * @설명 : Firebase DB변동 시 메시지 출력 함수
	*/
	function showMessage() {
		$('#conversation').empty(); // 대화창 초기화
		
		if (currentMessages) {
			currentMessages.off('child_added', makeMessage);
		}
		messages.on('child_added', makeMessage); // DB변동 시 메시지 출력
		currentMessages = messages;
	}
	
	/**
	    * @함수명 : showTxMessage
	    * @작성일 : 2018. 6. 26.
	    * @작성자 : 강 성 훈
	    * @설명 : 보낸메시지 출력
	    * @param : message
	*/
	function showTxMessage(message) {
		$('#conversation').append(
				'<div class="row message-body">'
				+ '<div class="col-sm-12 message-main-sender">'
				+ '<div class="sender">'
				+ '<div class="message-text">'
				//+ emojione.toImage(message.text)
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
	
	/**
	    * @함수명 : showRxMessage
	    * @작성일 : 2018. 6. 26.
	    * @작성자 : 강 성 훈
	    * @설명 : 받은메시지 출력
	    * @param : message, obj
	*/
	function showRxMessage(message, obj) {
		$('#conversation').append(
				'<div class="row message-body">'
				+ '<div class="col-sm-12 message-main-receiver">'
				+ '<div class="col-sm-3 heading-avatar-icon">'
				+ '<img src="' + obj.userProfile + '">'
				+ '</div><div class="col-sm-9 heading-avatar-name">'
				+ '<span style="font-size: 15px; margin-right :20%; font-weight:bold;">' + obj.userName +'</span>'
				+ '<div class="receiver bubble">'
				+ '<div class="message-text">'
				//+ emojione.toImage(message.text)
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

	/**
	    * @함수명 : makeMessage
	    * @작성일 : 2018. 6. 26.
	    * @작성자 : 강 성 훈
	    * @설명 : 메시지 생성 함수
	    * @param : snapshot
	*/
	function makeMessage(snapshot) {
		var message = snapshot.val();
		
		if(message.userid == currentUser) {
			showTxMessage(message); // 보낸 메시지
		}else {
			$.each(chatUserList, function(index, obj) {
				if(obj.userId != currentUser && obj.userId == message.userid) {
					showRxMessage(message, obj); // 받은 메시지
				}
			});
		}
		
		// 대화창 스크롤을 항상 아래로
		$(".chatWindow").scrollTop($(".chatWindow")[0].scrollHeight);
	}
	
	//////////// [유틸 함수] ////////////
	
	/**
	    * @함수명 : makeMessage
	    * @작성일 : 2018. 6. 22.
	    * @작성자 : 강 성 훈
	    * @설명 : 버튼 클릭시 색 변경
	    * @param : btnId
	*/
	function changeColor(btnId) {
		$('.sideBar-body').css('background-color', '');
		$(btnId).css('background-color', '#FFF');
	}
	
	/**
	    * @함수명 : makeMessage
	    * @작성일 : 2018. 6. 11.
	    * @작성자 : 강 성 훈
	    * @설명 : 10미만 숫자 앞에 0 붙이기
	    * @param : n
	*/
    function pad(n) {
        return n > 9 ? "" + n: "0" + n;
    }
	
	/**
	    * @함수명 : convertTime
	    * @작성일 : 2018. 6. 11.
	    * @작성자 : 강 성 훈
	    * @설명 : timestamp를 날짜 시간 으로 변환
	    * @param : timestamp
	*/
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