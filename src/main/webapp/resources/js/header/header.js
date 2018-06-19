$(function(){
	projectMemberProfile();
});

//프로젝트에 속한 멤버 리스트 뿌려주기
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
		}
	});
}

//프로젝트에 속한 멤버 리스트 뿌려주기 (기능)
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
						htmltext += '<div class="dropdown" style="float:left;">'
							+ '<a data-toggle="dropdown" style="font-size: 25pt; top: 7px; cursor: pointer;"><img style="width: 50px;height:50px" class="img-circle" src = "resources/images/profile/'+elt2.userProfile+'" /></a>'
							+ '<ul class="dropdown-menu" style="cursor: pointer;">';
						if(elt.gradeNum == 'G400' && elt.userId != userId){
							if(myGrade == 'G300'){
								htmltext += '<li><input type="hidden" value="'+ elt.userId +'"><a onclick="memberToKickOut(this)">맴버제명</a></li>'
								+ '<li><input type="hidden" value="'+ elt.userId +'"><a onclick="ownerChange(this)">팀장위임</a></li>';
							}
						}else if (userId ==  elt.userId && elt.gradeNum=='G400') {
							htmltext += '<li><a onclick="memberDelete()">멤버탈퇴</a></li>';
						}
						
						htmltext += '<li><a>'+ elt2.userName+'</a></li>'
						+ '</ul></div>';
						
						return false;
					}
				});
			});
			$('#headerProjectMemberProfile').html(htmltext);
			projectNameView();
		}
	});
}

//프로젝트의 이름을 보여준다.
function projectNameView(){
	$.ajax({
		type : "post",
		url  : "showProject",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			$('#headerProjectName').empty();
			
			$('#headerProjectName').html(data.data.projectName);
		}
	});
}

//오너위임(팀장위임)
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
			}
	});
}

//팀원제명
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
		}
	});
}

//팀탈퇴
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
		}
	});
}

//js 파일에서 ContextPath 가져오기
function getContextPath() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
};