$(function () {
	languageColorView();
})
var projectcnt = 0;
//프로젝트 생성 함수
function addProject() {
	if($('input[name="language"]').is(':checked')){
	var radioVal = $('input[name="language"]:checked').val();
	var projectName = $("#ProjectName").val();
	$.ajax({
		url:"projectInsert",
		datatype:"JSON",
		data:{projectName:$("#ProjectName").val(), languageNum:radioVal},
		success:function(data){
			alert("프로젝트생성성공");
			projectProjectNum(projectName)
		}
		
	})
	}else if($("#ProjectName").val()==""){
		alert("프로젝트명을 입력하세요")
	}else
	{
		alert("주언어를 체크해주세요")
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
						html +=	"<div style='float:left;'>"
							 + "<a href='kanban?projectNum="+elt.projectNum+"' class='button' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</a>"
							 + "<p style='float:left; margin-right:14px;'><span class='glyphicon glyphicon-star-empty' onclick='updateProjectBookmark("+elt.projectNum+")'></span><br>"
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
						html +=	"<div style='float:left;'>"
							+ "<a href='kanban?projectNum="+elt.projectNum+"' class='button' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</a>"
							+ "<p style='float:left; margin-right:14px;'><span class='glyphicon glyphicon-star' onclick='updateProjectNoneBookmark("+elt.projectNum+")'></span><br>"
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
//프로젝트 생성 모달창 띄워주기
function projectDetailView() {
	$("#detailButton").empty();
	var html="";
		html = "<div id='projectDetail' class='form-group'>"
			 + "<h3>프로젝트제목입력:</h3>"
			 + "<input id ='ProjectName' type='text' onkeypress='if(event.keyCode==13) {addProject()}' onkeyup='fnChkByte(this, 27)'>"
			 + "<br>"
		 	 + "</div>"
		     +"<input id='addProject' class='btn btn-success' type='button' onclick='addProject()' value='생성'>"
			 +"<input id='cancleProject' class='btn btn-danger' data-dismiss='modal' type='button' value='취소'>";
			 $("#detailButton").html(html)
			 printProjectDetailLanguage()
	
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
				html += "<input type='radio' name='language' value='"+elt.languageNum+"'>"+elt.languageMain+"<br>"
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
				html += "<input type='radio' name='language' value='"+elt.languageNum+"'";
				if($('#hiddenLanguageNum'+projectNum).val() == elt.languageNum)	html += " checked ";
				html += ">"+elt.languageMain+"<br>";
			})
			$("#projectDetail").append(html)
		}
	})
}
//주언어 업데이트하기
function updateLanguage(projectNum) {
	$.ajax({
		url:"languageUpdate",
		datatype:"JSON",
		data:{projectNum:projectNum, languageNum:$('input[name="language"]:checked').val(), projectName:$("#ProjectName").val()},
		success:function(data){
			alert("프로젝트 수정 성공")
			languageColorView();
		}
	})
}
//프로젝트 업데이트 모달창 내용 뿌리기
function projectUpdateView(projectNum) {
	$("#detailButton").empty();
	var html="";
		html ="<div id='projectDetail' class='form-group'>" 
			 +"<h3>프로젝트제목입력:</h3>"
			 + "<input id ='ProjectName' type='text' placeholder='"+$("#hiddenProjectName"+projectNum).val()+"' onkeypress='if(event.keyCode==13) {updateLanguage("+projectNum+")}' onkeyup='fnChkByte(this, 27)'>"
			 + "<br>"
			 + "</div>"
			 + "<input id='addProject' class='btn btn-success' type='button' onclick='updateLanguage("+projectNum+")' data-dismiss='modal' value='수정'>"
			 + "<input id='cancleProject' class='btn btn-danger' data-dismiss='modal' type='button' value='취소'>"
			 + "<input id='deleteProject' class='btn btn-danger' data-dismiss='modal' type='button' onclick='deleteProject("+projectNum+")' value='삭제'>"
			 $("#detailButton").html(html)
			 printProjectDetailLanguageChecked(projectNum)
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
			$.each(data.data, function(index, elt) {
			$.each(projectArray[0], function(index, elt2) {
				console.log(elt.languageNum)
				if(elt.languageNum == elt2.languageNum){
				html +=	"<div style='float:left;'>"
					+ "<a href='kanban?projectNum="+elt.projectNum+"' class='button' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</a>"
					+ "</div>";
				
				}
			})
			})
			$("#searchBox").append(html);
			
			console.log(data.data.projectNum);
			console.log(data.data.projectName);
			
		}
	})
	
}

//오토컴플릿
function autoCompleteProject() {
	console.log("진원이 미워")
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
