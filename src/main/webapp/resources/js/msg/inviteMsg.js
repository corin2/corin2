$(function(){
	showMsg();
	
	$('.dropdown-menu').click(function(e) {
	    e.stopPropagation();
	});
});

//메시지가 존재하는지 알람~
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
    }
}

//모든 메시지를 보여준다
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
				htmltext += '<li><label><div class="col-sm-2"><span class="invitemsgprofile">'
						 + '<img src="resources/images/profile/'+elt.projectDate+'" class="img-circle" width="50" height="50"></span></div>'
						 + '<div class="col-sm-8"><span class="invitemsgspan">'+elt.languageNum+'님 께서 프로젝트'+elt.projectName+'에 초대하셨습니다.</span></div>' // LANGUAGENUM = sendId , PROJECTDATE = userprofile
						 + '<div class="col-sm-2"><span class="btnSpan"><button class="btn-warning" onclick="msgaccept('+elt.projectNum+')">Y</button>'
						 + '<button class="btn-success" onclick="msgreject('+elt.projectNum+')">N</button></span></div>'
						 + '</label></li>';
				if(index != data.data.length-1)htmltext += '<hr class="whitehr">';
			});
			
			if(data.data.length == 0) htmltext += '<span class="notmsg">초대메시지가 없습니다</span>';
			$('#inviteMsg').html(htmltext);
			existMsg();
		}
	});
}

//초대승락
function msgaccept(projectNum){
	var param = {userId : $('#hiddenUserId').val(), projectNum : projectNum}
	$.ajax({
          url:"msgagree",
          datatype:"JSON",
          data:param,
          success:function(data){
        	  showMsg();
        	  if(sessionProjectNum == 'null') languageColorView();
        	  sendHeader('1:'+projectNum);
          }
	})
}

//초대거절
function msgreject(projectNum){
	var param = {receptionId : $('#hiddenUserId').val(), projectNum : projectNum}
	$.ajax({
          url:"msgdel",
          datatype:"JSON",
          data:param,
          success:function(data){
        	  showMsg();
          }
	})
}

//오토컴플릿
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
		}
	})
}

//초대아이디 체크하기
function memberinvite() {
	$.ajax({
		url : "idcheck",
		type: "post",
		data : $("#emailSearch").val().trim(),
		contentType: "application/json; charset=utf-8",
		success : function (data) {
			if(data.trim() === 'true') isInviteMsg();
			else swal('없는 회원입니다');
		}
	})
}

//팀에 속해있는지&메세지가 있는지 체크
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
		}
	});
}

//초대메세지 보내기
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
		}
	});
}

function notHideAuto(e) {
	e.stopPropagation()
}