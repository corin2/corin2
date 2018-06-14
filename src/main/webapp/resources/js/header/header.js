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
		data : {projectNum : $('#hiddenProjectNum').val()},
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
		data : {projectNum : $('#hiddenProjectNum').val()},
		success : function(data){
			$('#headerProjectMemberProfile').empty();
			var htmltext = '';
			var projectName = '';
			$.each(data.data, function(index, elt) {
				projectName = elt.projectName;
				$.each(userProfiles, function(i, elt2) {
					if(elt.userId == elt2.userId){
						htmltext += '<div class="dropdown" style="float:left;">'
							+ '<a data-toggle="dropdown" style="font-size: 25pt; top: 7px; cursor: pointer;"><img style="width: 50px;height:50px" class="img-circle" src = "resources/profile/'+elt2.userProfile+'" /></a>'
							+ '<ul class="dropdown-menu" style="cursor: pointer;">';
						
						if(elt.gradeNum == 'G400' && elt.userId != userId){
							htmltext += '<li><input type="hidden" value="'+ elt.userId +'"><a onclick="memberToKickOut(this)">맴버제명</a></li>'
							+ '<li><input type="hidden" value="'+ elt.userId +'"><a onclick="ownerChange(this)">팀장위임</a></li>';
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
		data : {projectNum : $('#hiddenProjectNum').val()},
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
					projectNum : $('#hiddenProjectNum').val()
			},
			success: function (data){
				projectMemberProfile();
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
				projectNum : $('#hiddenProjectNum').val()
		},
		success: function (data){
			projectMemberProfile();
		}
	});
}

//팀탈퇴
function memberDelete() {
	console.log('zzz')
	console.log($('hiddenUserId').val() + '/' + $('#hiddenProjectNum').val())
	$.ajax({
		url : "tokickOut",
		datatype : "JSON",
		data : {
				userId : $('hiddenUserId').val(),
				projectNum : $('#hiddenProjectNum').val()
		},
		success: function (data){
			console.log("qqqq")
			projectMemberProfile();
		}
	});
}