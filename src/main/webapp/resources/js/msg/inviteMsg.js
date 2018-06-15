$(function(){
	showMsg();
});

//메시지가 존재하는지 알람~
function existMsg(){
	console.log("2222222222")
	if($('#inviteMsg').children('li').length > 0) {
		console.log("33333")
		var content = '<span class="glyphicon glyphicon-exclamation-sign" style="color:red;"></span>';
		$('#inviteMsg').closest('li').children('a').append(content);
	}
}

//모든 메시지를 보여준다
function showMsg(){
	console.log("111111111111")
	$.ajax({
		type : "post",
		url  : "showMsg",
		datatype:"JSON",
		data : {receptionId : $('#hiddenUserId').val()},
		success : function(data){
			$('#inviteMsg').empty();
			
			if($('#inviteMsg').closest('li').children('a').children().is('span')) {
				$('#inviteMsg').closest('li').children('a').children('span').remove();
			}
			
			var htmltext = '';
			$.each(data.data, function(index, elt) {
				htmltext += '<li><a><label>'+elt.projectName+'에 초대받았습니다</label>';
				var byte = byteInt(elt.projectName);
				if(byte > 1) htmltext += '<br>';
				htmltext += '<button class="btn-warning" onclick="msgaccept('+elt.projectNum+')">Y</button>'
						 + '<button class="btn-success" onclick="msgreject('+elt.projectNum+')">N</button>'
						 + '</a></li>';
			});
			
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
			console.log(data)
			if(data.trim() === 'true') isInviteMsg();
			else alert('없는 회원입니다');
		}
	})
}

//팀에 속해있는지&메세지가 있는지 체크
function isInviteMsg(){
	$.ajax({
		url :"isTeamAndisMsg",
		data : {
				projectNum : $('#hiddenProjectNum').val(),
				receptionId : $("#emailSearch").val().trim()
			   },
		success : function(data) {
			if(data.data == '0') inviteMsg();
			else alert('이미 프로젝트에 참여하고 있거나 \n해당프로젝트의 메시지가 이미 회원에게 있습니다.');
		}
	});
}

//초대메세지 보내기
function inviteMsg(){
	$.ajax({
		url :"inviteMsg",
		data : {
				projectNum : $('#hiddenProjectNum').val(),
				receptionId : $("#emailSearch").val().trim(),
				sendId : $('#hiddenUserId').val()
			   },
		success : function(datas) {
			alert('초대메시지 발송이 완료되었습니다');
			sendMsg($("#emailSearch").val().trim());
		}
	});
}

function notHideAuto(e) {
	e.stopPropagation()
}