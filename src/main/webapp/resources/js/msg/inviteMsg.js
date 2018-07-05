$(function(){
	showMsg();
	
	$('.dropdown-menu').click(function(e) {
	    e.stopPropagation();
	});
});

//메시지가 존재하는지 알람~
/**
* @함수명 : existMsg()
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 자신에게 메세지가 존재하는지 확이하여 알림표시를 해준다
**/
function existMsg(){
	var liLength = $('#inviteMsg').children('li').length;
    if(liLength > 0) {
        var content = '<span class="badge">'+$('#inviteMsg').children('li').length+'</span>';
        $('#inviteMsg').closest('li').children('a').append(content);
        $('#inviteMsg').children('li:eq(0)').css({
            'border-top-left-radius': '5px',
            'border-top-right-radius': '5px'
        });
        $('#inviteMsg').children('li:eq('+(liLength-1)+')').css({
             'border-bottom-left-radius': '5px',
             'border-bottom-right-radius': '5px'
        });
    }else {
    	 $('#inviteMsg').closest('li').children('a').children('span').remove();
    }
}

/**
* @함수명 : showMsg()
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 자신에게 있는 모든메세지를 비동기로 확이하여 뿌려준다.
**/
function showMsg(){
	$.ajax({
		type : "post",
		url  : "showMsg",
		datatype:"JSON",
		data : {receptionId : $('#hiddenUserId').val()},
		success : function(data){
			$('#inviteMsg').empty();
			
			if($('#inviteMsg').closest('li').children('label').children().is('span')) {
				$('#inviteMsg').closest('li').children('label').children('span').remove();
			}
			
			var htmltext = '';
			$.each(data.data, function(index, elt) {
				htmltext += '<li style="height: 79px;"><div class="col-sm-2"><span class="invitemsgprofile">'
						 + '<img src="'+profileStorageURL+elt.projectDate+'" class="img-circle" width="50" height="50"></span></div>'
						 + '<div class="col-sm-8 invitemsgcontent"><span class="invitemsgspan">'+elt.languageNum+'님 께서<br>프로젝트'+elt.projectName+'에 초대하셨습니다.</span></div>' // LANGUAGENUM = sendId , PROJECTDATE = userprofile
						 + '<div class="col-sm-2"><span class="btnSpan"><button class="btn-2a btn" onclick="msgaccept('+elt.projectNum+')">Y</button>'
						 + '<button class="btn-2b btn" onclick="msgreject('+elt.projectNum+')">N</button></span></div>'
						 + '</li>';
				if(index != data.data.length-1)htmltext += '<hr class="whitehr">';
			});
			
			if(data.data.length == 0) htmltext += '<span class="notmsg">초대메시지가 없습니다</span>';
			$('#inviteMsg').html(htmltext);
			existMsg();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : msgaccept(projectNum)
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 초대받은 프로젝트에 수락을 누르면 해당 메세지는 삭제되며 프로젝트의 팀원이 된다.
* @param projectNum - 프로젝트넘버
**/
function msgaccept(projectNum) {
	var param = {
		userId : $('#hiddenUserId').val(),
		projectNum : projectNum
	}
	$.ajax({
		url : "msgagree",
		datatype : "JSON",
		data : param,
		success : function(data) {
			showMsg();
			if (sessionProjectNum == 'null')
				languageColorView();
			sendHeader('1:' + projectNum);
		},
		error : function() {
			swal({
				type : 'error',
				title : 'Oops...',
				text : 'Something went wrong!',
				footer : '<a href>Why do I have this issue?</a>'
			})
		}
	})
}

/**
* @함수명 : msgreject(projectNum)
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 초대받은 프로젝트에 거절을 누르면 해당 메세지는 삭제된다.
* @param projectNum - 프로젝트넘버
**/
function msgreject(projectNum) {
	var param = {
		receptionId : $('#hiddenUserId').val(),
		projectNum : projectNum
	}
	$.ajax({
		url : "msgdel",
		datatype : "JSON",
		data : param,
		success : function(data) {
			showMsg();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

/**
* @함수명 : autoComplete()
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 초대 할 user를 검색할 때 모든 user를 검색하여 오토컴플릿으로 보여준다
**/
function autoComplete() {
	 $.ajax({
 		url : "allUser",
 		datatype : "JSON",
 		success : function (data) {
 			var id = [];
 			$.each(data.data, function(i, elt) {
 				id.push(elt.userId)
 			});
			$('#emailSearch').autocomplete({
				 source: id,
				 appendTo: "#friend",
				 minLength: 2
			});
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

/**
* @함수명 : memberinvite()
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 초대 한 user가 있는 회원인지 없는 회원인지 구분
**/
function memberinvite() {
	if($("#emailSearch").val().trim().indexOf('@') > -1){
		$.ajax({
			url : "idcheck",
			type: "post",
			data : $("#emailSearch").val().trim(),
			contentType: "application/json; charset=utf-8",
			success : function (data) {
				console.log(data.trim())
				if(data.trim() === 'true') isInviteMsg();
				else swal('없는 회원입니다');
			},
			error: function() {
	            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
	        }
		})
	}else {
		swal('이메일 형식이 아닙니다.');
	}
}

/**
* @함수명 : isInviteMsg()
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 초대 한 user가 팀에 속해있는지&메세지가 있는지 체크
**/
function isInviteMsg(){
	$.ajax({
		url :"isTeamAndisMsg",
		data : {
				projectNum : sessionProjectNum,
				receptionId : $("#emailSearch").val().trim()
			   },
		success : function(data) {
			if(data.data == '0') inviteMsg();
			else swal('이미 프로젝트에 참여하고 있거나 \n해당프로젝트의 메시지가 이미 회원에게 있습니다.');
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : inviteMsg()
* @작성일 : 2018. 06. 12.
* @작성자 : 김 진 원
* @설명 : 초대메세지 보내기
**/
function inviteMsg(){
	$.ajax({
		url :"inviteMsg",
		data : {
				projectNum : sessionProjectNum,
				receptionId : $("#emailSearch").val().trim(),
				sendId : $('#hiddenUserId').val()
			   },
		success : function(datas) {
			swal('초대메시지 발송이 완료되었습니다');
			sendMsg($("#emailSearch").val().trim());
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

function notHideAuto(e) {
	e.stopPropagation()
}