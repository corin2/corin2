$(function(){
	if(sessionProjectNum != 'null') {
		projectMemberProfile();
		projectColorView();
	}
	
	// 채팅 아이콘 클릭 시
	$('#showChatting').click(function() {
		$('.sidebar-chat').animate({width: 'toggle'}); // 채팅창 애니메이션 효과 적용되면서 열림
		$(".chatWindow").scrollTop($(".chatWindow")[0].scrollHeight); // 대화창 스크롤을 항상 아래로
	});
	
	//alramicon hover
	$('#alramicona').hover(function(){
		$('#alramicona').css({"color":"#566270","background-color":"transparent","background":"#fff"});
		$('#alramicon').css({"color":"#566270","background-color":"transparent"});
	}, function(){
		$('#alramicona').css({"color":"#fff","background-color":"transparent","background":"#00ff0000"});
		$('#alramicon').css({"color":"#fff","background-color":"transparent"});
	});
	
	//chaticon hover
	$('.language-num').hover(function(){
		$('.language-num').css({"color":"#566270","background-color":"transparent","background":"#fff"});
		$('.chat').css({"color":"#566270","background-color":"transparent"});
	}, function(){
		$('.language-num').css({"color":"#fff","background-color":"transparent","background":"#00ff0000"});
		$('.chat').css({"color":"#fff","background-color":"transparent"});
	});
});

/**
* @함수명 : projectMemberProfile()
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : 프로젝트에 속한 멤버 리스트가 담겨있는 배열을 만든다.
**/
function projectMemberProfile(){
	var userProfiles = [];
	$.ajax({
		type : "post",
		url  : "showMemberUserProfile",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			$.each(data.data, function(index, elt) {
				userProfiles.push(elt);
			});
			
			projectMemberShow(userProfiles);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : projectMemberShow(userProfiles)
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : 프로젝트에 속해있는 멤버리스트를 다시 팀장인지 팀원지의 등급을 가져와서 각자의
* 		사용 할 수 있는 기능이 담긴 view를 비동기로 만들어 준다.
* @param userProfiles - 멤버 리스트가 담겨있는 배열
**/
function projectMemberShow(userProfiles){
	var userId = $('#hiddenUserId').val();
	$.ajax({
		type : "post",
		url  : "showMember",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			$('#headerProjectMemberProfile').empty();
			var htmltext = '';
			var projectName = '';
			var myGrade = '';
			$.each(data.data, function(index, elt) {
				if(elt.userId == userId) {
					myGrade = elt.gradeNum;
					return false;
				}
			});
			$.each(data.data, function(index, elt) {
				projectName = elt.projectName;
				$.each(userProfiles, function(i, elt2) {
					if(elt.userId == elt2.userId){
						htmltext += '<div class="dropdown headerFloatLeft headerprofilediv">';
						if(elt.gradeNum == 'G300')
							htmltext += '<span class="glyphicon glyphicon-king leader" aria-hidden="true"></span>';
						htmltext += '<a data-toggle="dropdown" class="profileDropdown">'
								 + '<img class="img-circle profileimg" src = "' + profileStorageURL + elt2.userProfile + '" /></a>'
								 + '<ul class="dropdown-menu headerCuror" id="profile-dropdown-menu">'
								 + '<li><a>'+ elt2.userName+'</a></li>';
						if(elt.gradeNum == 'G400' && elt.userId != userId){
							if(myGrade == 'G300'){
								htmltext += '<li><input type="hidden" value="'+ elt.userId +'"><a onclick="memberToKickOut(this)">맴버제명</a></li>'
								+ '<li><input type="hidden" value="'+ elt.userId +'"><a onclick="ownerChange(this)">팀장위임</a></li>';
							}
						}else if (userId ==  elt.userId && elt.gradeNum=='G400') {
							htmltext += '<li><a onclick="memberDelete()">멤버탈퇴</a></li>';
						}
						
						htmltext += '</ul></div>';
						
						return false;
					}
				});
			});
			$('#headerProjectMemberProfile').html(htmltext);
			projectNameView();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : projectNameView()
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : <div id=position> 안에 해당 프로젝트의 이름을 비동기로 가져와서 뿌려준다.
**/
function projectNameView(){
	$.ajax({
		type : "post",
		url  : "showProject",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			$('#position').empty();
			
			$('#position').html(data.data.projectName);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : projectColorView()
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : <div id=position>의 색을 해당 프로젝트의 언어에 맞는 색상으로 바꿔준다.
* @param titleName - 
* @param calendarNum - 
* @return String login
**/
function projectColorView() {
	$.ajax({
		type : "post",
		url  : "languageInfoByProjectNum",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			$('#position').css('border-color', data.list.languageColor); //프로젝트 언어 색상
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : ownerChange(obj)
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : 비동기로 자신이 선택한 팀원의 등급을 팀장로 바꿔주고 자기 자신의 등급을 팀원으로 바꿔준다.
* @param obj - 자신태그 (this)
**/
function ownerChange(obj) {
	$.ajax({
			url : "ownerChange",
			datatype : "JSON",
			data : {
					userId : $(obj).parent().children("input").val(),
					projectNum : sessionProjectNum,
					gradeNum : $('#hiddenUserId').val() // 오너위임시 자신도 팀원으로 돌아가기위해 gradeNum이지만 서비스에서 userId가 될 예정
			},
			success: function (data){
				sendHeader('1:'+sessionProjectNum);
			},
			error: function() {
	            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
	        }
	});
}

/**
* @함수명 : memberToKickOut(obj)
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : 자신이 선택한 팀원을 팀장의 권한으로 제명 시킨다
* @param obj - 자신태그 (this)
**/
function memberToKickOut(obj) {
	$.ajax({
		url : "tokickOut",
		datatype : "JSON",
		data : {
				userId : $(obj).parent().children("input").val(),
				projectNum : sessionProjectNum
		},
		success: function (data){
			sendHeader('2:'+sessionProjectNum+':'+$(obj).parent().children("input").val());
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : memberDelete()
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : 자신이 속한 프로젝트에서 탈퇴하는 비동기
**/
function memberDelete() {
	$.ajax({
		url : "tokickOut",
		datatype : "JSON",
		data : {
				userId : $('#hiddenUserId').val(),
				projectNum : sessionProjectNum
		},
		success: function (data){
			sendHeader('3:'+sessionProjectNum+':'+$('#hiddenUserId').val());
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : getContextPath()
* @작성일 : 2018. 06. 14.
* @작성자 : 김 진 원
* @설명 : js 파일에서 ContextPath 가져오기
**/
function getContextPath() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
};