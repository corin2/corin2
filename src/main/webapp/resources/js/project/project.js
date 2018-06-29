$(function () {
	languageColorView();
})
var projectcnt = 0;
//프로젝트 생성 함수
function addProject() {
	if($('input[name="language"]').is(':checked')&&$("#ProjectName").val()!=""){
	var radioVal = $('input[name="language"]:checked').val();
	var projectName = $("#ProjectName").val();
	$.ajax({
		url:"projectInsert",
		datatype:"JSON",
		data:{projectName:$("#ProjectName").val(), languageNum:radioVal},
		success:function(data){
			swal("프로젝트생성성공");
			projectProjectNum(projectName)
		}
		
	})
	}else if($("#ProjectName").val()==""){
		swal("프로젝트명을 입력하세요");
	}else
	{
		swal("주언어를 체크해주세요");
	}
}
//프로젝트넘필요
function projectProjectNum(projectName) {
	$.ajax({
		url:"selectProjectNum",
		datatype:"JSON",
		data:{projectName:projectName},
		success:function(data){
			insertTeamProject(data.projectNum);
		}
	})
}
//팀 생성함수
function insertTeamProject(projectNum) {
	$.ajax({
		url:"projectTeamInsert",
		datatype:"JSON",
		data:{userId:$("#hiddenUserId").val(), projectNum:projectNum},
		success:function(data){
			$('#ProjectName').val('');
			languageColorView();
			$("#myModal2").modal("hide");
		}
		
	})
}


//프로젝트 뿌려주기
function projectView(projectArray) {
	$("#projectbox").empty();
	$.ajax({
		url:"projectAllList",
		datatype : "JSON",
		data:{userId:$("#hiddenUserId").val()},
		success:function(data){
			var html ="";
			$("#projectbox").empty();
			$.each(data.list, function (index, elt) {
				$.each(projectArray[0], function(i, elt2) {
					if(elt.languageNum == elt2.languageNum){
						html +=	"<div class='projectListDiv'>"
							 + "<h4 class='h4margin'>&nbsp;&nbsp;"+elt2.languageMain+"</h4>"
							 + "<a href='position?projectNum="+elt.projectNum+"' class='buttonProject' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</a>"
							 + "<p class='projectp'><span class='glyphicon glyphicon-star-empty' onclick='updateProjectBookmark("+elt.projectNum+")'></span><br>"
							if(elt.gradeNum=='G300'){
							 html+= "<a class='glyphicon glyphicon-cog setting' data-toggle='modal' onclick='projectUpdateView("+elt.projectNum+")' data-target='#myModal2'></a><br>"
							}
						html+= "<input id='hiddenLanguageNum"+elt.projectNum+"' type='hidden' value='"+elt.languageNum+"'>"
							+ "<input id='hiddenProjectName"+elt.projectNum+"' type='hidden' value='"+elt.projectName+"'>"
							+ "</p>"
							+ "</div>";
						return false;
					}
				});
				projectcnt++;
			/*	if(projectcnt == 6){
					html += '<br>';
					projectcnt = 0;
				}*/
			});
			html += "<div class='projectListDiv'><h4 class='h4margin'>&nbsp;&nbsp;생성</h4><button class='buttonproject' onclick='projectDetailView()' data-toggle='modal' data-target='#myModal2'><span class='glyphicon glyphicon-plus'></span></button></div>";
			projectcnt=0;
			$("#projectbox").html(html);
			
		}
	})
}


//프로젝트 북마크 뿌려주기
function projectBookView(projectArray) {
	$.ajax({
		url:"projectBookList",
		datatype : "JSON",
		data:{userId:$("#hiddenUserId").val()},
		success:function(data){
			var html ="";
			$("#bookmarkbox").empty();
			$.each(data.list, function (index, elt) {
				$.each(projectArray[0], function(i, elt2) {
					if(elt.languageNum == elt2.languageNum){
						html +=	"<div class='projectListDiv'>"
							+ "<h4 class='h4margin'>&nbsp;&nbsp;"+elt2.languageMain+"</h4>"
							+ "<a href='position?projectNum="+elt.projectNum+"' class='buttonProject' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</a>"
							+ "<p class='projectp'><span class='glyphicon glyphicon-star' onclick='updateProjectNoneBookmark("+elt.projectNum+")'></span><br>"
							if(elt.gradeNum=='G300'){
							 html+= "<a class='glyphicon glyphicon-cog setting' data-toggle='modal' onclick='projectUpdateView("+elt.projectNum+")' data-target='#myModal2'></a><br>"
							}
						html+= "<input id='hiddenLanguageNum"+elt.projectNum+"' type='hidden' value='"+elt.languageNum+"'>"
							+ "<input id='hiddenProjectName"+elt.projectNum+"' type='hidden' value='"+elt.projectName+"'>"
							+ "</p>"
							+ "</div>";
						return false;
					}
				});
				projectcnt++;
				if(projectcnt == 6){
					html += '<br>';
					projectcnt = 0;
				}
			});
			projectcnt=0;
			$("#bookmarkbox").html(html);
		}
	})
}


//프로젝트칼라 지정해주기
function languageColorView() {
	var projectArray = [];
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			projectArray.push(data.list);
			projectView(projectArray);
			projectBookView(projectArray);
		}
	})
}

//프로젝트칼라 지정해주기
function searchColorView() {
	var projectArray = [];
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			projectArray.push(data.list);
			searchProject(projectArray)
			
		}
	})
}
//프로젝트모달창 주언어 뿌려주기
function printProjectDetailLanguage() {
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			var html = '';
			$.each(data.list, function(index, elt) {
				console.log(elt)
				html += "<input type='radio' class='iradio_flat-green' name='language' value='"+elt.languageNum+"'>"+elt.languageMain+"<span class='glyphicon glyphicon-stop' style='color:"+elt.languageColor+"'></span><br>"
			})
			$("#projectDetail").append(html)
		}
	})
}

//프로젝트수정모달창 주언어 뿌려주기
function printProjectDetailLanguageChecked(projectNum) {
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			var html = '';
			$.each(data.list, function(index, elt) {
				html += "<input type='radio' class='iradio_flat-green' name='language' value='"+elt.languageNum+"'";
				if($('#hiddenLanguageNum'+projectNum).val() == elt.languageNum)	html += " checked ";
				html += ">"+elt.languageMain+"<span class='glyphicon glyphicon-stop' style='color:"+elt.languageColor+"'></span><br>";
			})
			$("#projectDetail").append(html)
		}
	})
}
//주언어 업데이트하기
function updateLanguage(projectNum) {
	if($('input[name="language"]').is(':checked')&&$("#ProjectName").val()!=""){
	$.ajax({
		url:"languageUpdate",
		datatype:"JSON",
		data:{projectNum:projectNum, languageNum:$('input[name="language"]:checked').val(), projectName:$("#ProjectName").val()},
		success:function(data){
			swal("프로젝트 수정 성공");
			languageColorView();
		}
	})
	}else
	{
		swal("프로젝트명을 입력하세요");
	}
}
//프로젝트 생성 모달창 띄워주기
function projectDetailView() {
	$("#detailButton").empty();
	var html="";
	html = "<div class='form-group proinputclass'>"
		+ "<div class='projectcreatetitle'></div>"
		+ "<h3>프로젝트제목입력</h3>"
		+ "<input id ='ProjectName' type='text' class='search1' onkeypress='if(event.keyCode==13) {addProject()}' onkeyup='fnChkByte(this, 27)'>"
		+ "<br>"
		+ "<br>"
		+ "</div>"
		+	"<div id='projectDetail' class='proradioclass'>"
		+	"</div>"
		+"<div class='projectcreatebottom'><div class='createbottom'><input id='cancleProject' class='btn btn-3b' data-dismiss='modal' type='button' value='취소'>"
		+"<input id='addProject' class='btn btn-3a' type='button' onclick='addProject()' value='생성'></div></div>"
		$("#detailButton").html(html);
	printProjectDetailLanguage();
	$('#ProjectName').focus();
	
}
//프로젝트 업데이트 모달창 내용 뿌리기
function projectUpdateView(projectNum) {
	$("#detailButton").empty();
	var html="";
		html ="<div class='form-group proinputclass'>" 
			 + "<div class='projectcreatetitle'></div>"
			 +"<h3>프로젝트제목입력</h3>"
			 + "<input id ='ProjectName' type='text' class='search1' placeholder='"+$("#hiddenProjectName"+projectNum).val()+"' onkeypress='if(event.keyCode==13) {updateLanguage("+projectNum+")}' onkeyup='fnChkByte(this, 27)'>"
			 + "<br>"
			 + "<br>"
			 + "</div>"
			 +	"<div id='projectDetail' class='proradioclass'>"
		 	 +	"</div>"
			 + "<div>"
			 + "<div class='projectcreatebottom'><div class='createbottom'><input id='cancleProject' class='btn btn-3c' data-dismiss='modal' type='button' value='취소'>"
			 + "<input id='deleteProject' class='btn btn-3b' data-dismiss='modal' type='button' onclick='deleteProject("+projectNum+")' value='삭제'>"
			 + "<input id='addProject' class='btn btn-3a' type='button' onclick='updateLanguage("+projectNum+")' value='수정'></div></div>"
			 + "</div>";
			 $("#detailButton").html(html);
			 printProjectDetailLanguageChecked(projectNum);
			 $("#ProjectName").focus();
	}

//프로젝트 삭제
function deleteProject(projectNum) {
	$.ajax({
		url:"projectDelete",
		datatype:"JSON",
		data:{projectNum:projectNum},
		success:function(data){
			languageColorView();
		}
		
	})
}

//프로젝트 즐겨찾기 등록
function updateProjectBookmark(projectNum) {
	$.ajax({
		url:"projectBookmarkUpdate",
		datatype: "JSON",
		data:{projectNum:projectNum},
		success:function(data){
			languageColorView();
		}
	})
}

//프로젝트 즐겨찾기 해제
function updateProjectNoneBookmark(projectNum) {
	$.ajax({
		url:"projectNoneBookmarkUpdate",
		datatype: "JSON",
		data:{projectNum:projectNum},
		success:function(data){
			languageColorView();
		}
	})
}

//프로젝트 검색
function searchProject(projectArray) {
	$("#searchBox").empty();
	var userId = $("#hiddenUserId").val();
	var projectName = $("#searchProject").val();
	var html='';
	console.log(projectName)
	console.log(userId)
	$.ajax({
		url:"prjectSearch",
		datatype:"JSON",
		data:{userId:userId, projectName:projectName},
		success: function (data) {
			if(projectName!=""){
			$.each(data.data, function(index, elt) {
			$.each(projectArray[0], function(index, elt2) {
				console.log(elt.languageNum)
				if(elt.languageNum == elt2.languageNum){
				html +=	"<div class='projectSerchDiv'>"
					+ "<h4 class='h4margin'>&nbsp;&nbsp;"+elt2.languageMain+"</h4>"
					+ "<a href='position?projectNum="+elt.projectNum+"' class='buttonProject' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</a>"
					+ "</div>";
				
				}
			})
			})
			}
			$("#searchBox").append(html);
			
			console.log(data.data.projectNum);
			console.log(data.data.projectName);
			
		}
	})
	
}

//오토컴플릿
function autoCompleteProject() {
	 $.ajax({
 		url : "allProject",
 		datatype : "JSON",
 		data : {userId:$("#hiddenUserId").val()},
 		success : function (data) {
 			var name = [];
 			$.each(data.list, function(index, elt) {
 				name.push(elt.projectName)
 			});
			$('#searchProject').autocomplete({
				 source: name,
				 minLength: 2
			});
		}
	})
}
