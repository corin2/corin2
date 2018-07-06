/**
파일명: project.js
    설명: 프로젝트 관한 파일
    작성일: 2018-06-13
    작성자: 최재욱
**/
$(function () {
	languageColorView();
})
var projectcnt = 0;
/**
* @함수명 : addProject()
* @작성일 : 2018. 6. 13.
* @작성자 : 최재욱
* @설명 : 프로젝트를 생성하는 함수
**/
function addProject() {
	if($('input[name="language"]').is(':checked')&&$("#ProjectName").val()!=""){
	var radioVal = $('input[name="language"]:checked').val();
	var projectName = $("#ProjectName").val();
	$.ajax({
		url:"projectInsert",
		datatype:"JSON",
		data:{projectName:$("#ProjectName").val(), languageNum:radioVal},
		success:function(data){
			swal({title:"프로젝트생성성공"});
			projectProjectNum(projectName)
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
	}else if($("#ProjectName").val()==""){
		swal({title:"프로젝트명을 입력하세요"});
	}else
	{
		swal({title:"주언어를 체크해주세요"});
	}
}
/**
* @함수명 : projectProjectNum(projectName)
* @작성일 : 2018. 6. 13.
* @작성자 : 최재욱
* @설명 : 프로젝트를 생성할때 DB상 Team 테이블에도 함께 삽입 해야한다. 그러기 위해
* projectNum이 필요한데 이를 위해 projectNum을 가져온다.
* @param projectName- projectName을 통해 projectNum을 찾기위한 변수
**/
function projectProjectNum(projectName) {
	$.ajax({
		url:"selectProjectNum",
		datatype:"JSON",
		data:{projectName:projectName},
		success:function(data){
			insertTeamProject(data.projectNum);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

/**
* @함수명 : insertTeamProject(projectNum)
* @작성일 : 2018. 6. 13.
* @작성자 : 최재욱
* @설명 : DB상 Team프로젝트의 삽입을 위한 함수
* @param projectNum- 함수를 통해 찾아온 변수
**/
function insertTeamProject(projectNum) {
	$.ajax({
		url:"projectTeamInsert",
		datatype:"JSON",
		data:{userId:$("#hiddenUserId").val(), projectNum:projectNum},
		success:function(data){
			$('#ProjectName').val('');
			languageColorView();
			$("#myModal2").modal("hide");
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}


/**
* @함수명 : projectView(projectArray)
* @작성일 : 2018. 6. 13.
* @작성자 : 최재욱
* @설명 : 프로젝트 언어의 색을 이용하여 프로젝트 버튼의 색을 지정해 주고 프로젝트를 보여주는 함수이다.
* @param projectArray- 프로젝트언어에 해당하는 색을 담은 배열
**/
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
			});
			html += "<div class='projectListDiv'><h4 class='h4margin'>&nbsp;&nbsp;생성</h4><button class='buttonproject' onclick='projectDetailView()' data-toggle='modal' data-target='#myModal2'><span class='glyphicon glyphicon-plus'></span></button></div>";
			$("#projectbox").html(html);
			
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}


/**
* @함수명 : projectBookView(projectArray)
* @작성일 : 2018. 6. 14.
* @작성자 : 최재욱
* @설명 : 프로젝트 언어의 색을 이용하여 프로젝트 버튼의 색을 지정해 주고 
* 즐겨찾기 부분에 프로젝트를 보여주는 함수이다.
* @param projectArray- 프로젝트언어에 해당하는 색을 담은 배열
**/
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
				if(projectcnt == 8){
					html += '<br>';
					projectcnt = 0;
				}
			});
			projectcnt=0;
			$("#bookmarkbox").html(html);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}


/**
* @함수명 : languageColorView()
* @작성일 : 2018. 6. 14.
* @작성자 : 최재욱
* @설명 : 프로젝트당 언어를 설정하게 되는데 해당 언어의 색상을 보기 위한 함수이다.
**/
function languageColorView() {
	var projectArray = [];
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			projectArray.push(data.list);
			projectView(projectArray);
			projectBookView(projectArray);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

/**
* @함수명 : searchColorView()
* @작성일 : 2018. 6. 14.
* @작성자 : 최재욱
* @설명 : 프로젝트당 언어를 설정하게 되는데 해당 언어의 색상을 보기 위한 함수이다.
**/
function searchColorView() {
	var projectArray = [];
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			projectArray.push(data.list);
			searchProject(projectArray)
			
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}
/**
* @함수명 : printProjectDetailLanguage()
* @작성일 : 2018. 6. 14.
* @작성자 : 최재욱
* @설명 : 프로젝트 생성을 위해 모달 창이 뜨는데 여기서 언어를 고른다.
* 그에 해당하는 색에 예를 볼수있게 만들어준 함수이다.
**/
function printProjectDetailLanguage() {
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			var html = '';
			$.each(data.list, function(index, elt) {
				html += "<input type='radio' class='iradio_flat-green' name='language' value='"+elt.languageNum+"'>"+elt.languageMain+"<span class='glyphicon glyphicon-stop' style='color:"+elt.languageColor+"'></span><br>"
			})
			$("#projectDetail").append(html)
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

/**
* @함수명 : printProjectDetailLanguageChecked(projectNum)
* @작성일 : 2018. 6. 14.
* @작성자 : 최재욱
* @설명 : DB상에 저장된 색을 가져와 프로젝트를 수정할때 미리 해당 색에 체크되어 있게
* 하기 위한 함수 이다.
* @param projectNum- 해당하는 색을 찾기 위한 변수
* 
**/
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
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	})
}

/**
* @함수명 : updateLanguage(projectNum)
* @작성일 : 2018. 6. 15.
* @작성자 : 최재욱
* @설명 : DB상에 언어를 수정할 수 있게하는 함수이다.
* @param projectNum- 해당하는 프로젝트를 변수
* 
**/
function updateLanguage(projectNum) {
	if($('input[name="language"]').is(':checked')&&$("#ProjectName").val()!=""){
	$.ajax({
		url:"languageUpdate",
		datatype:"JSON",
		data:{projectNum:projectNum, languageNum:$('input[name="language"]:checked').val(), projectName:$("#ProjectName").val()},
		success:function(data){
			swal({title:"프로젝트 수정 성공"});
			languageColorView();
		},
		error: function() {
            swal({
                 type: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 footer: '<a href>Why do I have this issue?</a>'
                })
        }
	})
	}else
	{
		swal({title:"프로젝트명을 입력하세요"});
	}
}
/**
* @함수명 : projectDetailView()
* @작성일 : 2018. 6. 15.
* @작성자 : 최재욱
* @설명 : 프로젝트를 생성하기 위해 모달 창에 프로젝트 생성을 위한 
* 내요을 보여주는 함수 이다.
*  @param projectNum- 해당하는 프로젝트를 찾기위한 변수
* 
**/
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
/**
* @함수명 : projectUpdateView(projectNum)
* @작성일 : 2018. 6. 15.
* @작성자 : 최재욱
* @설명 : 프로젝트를 수정하기 위해 모달 창에 프로젝트 생성을 위한 
* 내요을 보여주는 함수 이다.
* 
**/
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
			 + "<input id='addProject' class='btn btn-3a' type='button' data-dismiss='modal' onclick='updateLanguage("+projectNum+")' value='수정'></div></div>"
			 + "</div>";
			 $("#detailButton").html(html);
			 printProjectDetailLanguageChecked(projectNum);
			 $("#ProjectName").focus();
	}

/**
* @함수명 : deleteProject(projectNum)
* @작성일 : 2018. 6. 15.
* @작성자 : 최재욱
* @설명 : 프로젝트를 삭제하기 위한 함수이다.
*  @param projectNum- 해당하는 프로젝트를 찾기위한 변수
**/
function deleteProject(projectNum) {
	swal({
		type: "warning",
		title: "정말로 삭제하시겠습니까?.",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'delete',
	    showCancelButton: true
	}).then((result) => {
		  if (result.value) {
			  $.ajax({
					url:"projectDelete",
					datatype:"JSON",
					data:{projectNum:projectNum},
					success:function(data){
						swal({title:"프로젝트 삭제완료"});
						languageColorView();
					},
					error: function() {
			            swal({
			                 type: 'error',
			                 title: 'Oops...',
			                 text: 'Something went wrong!',
			                 footer: '<a href>Why do I have this issue?</a>'
			                })
			        }
					
				})
			  }
			});
	}

/**
* @함수명 : updateProjectBookmark(projectNum)
* @작성일 : 2018. 6. 15.
* @작성자 : 최재욱
* @설명 : 북마크 버튼을 눌럿을때 DB상에 북마크인 상태로 업데이트 해주는 함수이다.
*  @param projectNum- 해당하는 프로젝트를 찾기위한 변수
**/
function updateProjectBookmark(projectNum) {
	$.ajax({
		url:"projectBookmarkUpdate",
		datatype: "JSON",
		data:{projectNum:projectNum, userId:$('#hiddenUserId').val()},
		success:function(data){
			languageColorView();
		},
		error: function() {
            swal({
                 type: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 footer: '<a href>Why do I have this issue?</a>'
                })
        }
	})
}

/**
* @함수명 : updateProjectNoneBookmark(projectNum)
* @작성일 : 2018. 6. 15.
* @작성자 : 최재욱
* @설명 : 북마크 버튼을 눌럿을때 DB상에 북마크가 아닌 상태로 업데이트 해주는 함수이다.
*  @param projectNum- 해당하는 프로젝트를 찾기위한 변수
**/
function updateProjectNoneBookmark(projectNum) {
	$.ajax({
		url:"projectNoneBookmarkUpdate",
		datatype: "JSON",
		data:{projectNum:projectNum, userId:$('#hiddenUserId').val()},
		success:function(data){
			languageColorView();
		},
		error: function() {
            swal({
                 type: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 footer: '<a href>Why do I have this issue?</a>'
                })
        }
	})
}

/**
* @함수명 : searchProject(projectArray)
* @작성일 : 2018. 6. 16.
* @작성자 : 최재욱
* @설명 : 프로젝트를 검색시 그에 해당하는 프로젝트를 보여주는 함수 이다.
*  @param projectArray- 프로젝트 버튼의 색을 정해주기 위한 색 배열
**/
function searchProject(projectArray) {
	$("#searchBox").empty();
	var userId = $("#hiddenUserId").val();
	var projectName = $("#searchProject").val();
	var html='';
	$.ajax({
		url:"prjectSearch",
		datatype:"JSON",
		data:{userId:userId, projectName:projectName},
		success: function (data) {
			if(projectName!=""){
			$.each(data.data, function(index, elt) {
			$.each(projectArray[0], function(index, elt2) {
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
			
		},
		error: function() {
            swal({
                 type: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 footer: '<a href>Why do I have this issue?</a>'
                })
        }
	})
	
}

/**
* @함수명 : autoCompleteProject()
* @작성일 : 2018. 6. 16.
* @작성자 : 최재욱
* @설명 : 프로젝트를 검색시 사용자가 작성한 내용과 일치하는 프로젝트 이름을
* 미리 보여주는 함수이다.
**/
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
		},
		error: function() {
            swal({
                 type: 'error',
                 title: 'Oops...',
                 text: 'Something went wrong!',
                 footer: '<a href>Why do I have this issue?</a>'
                })
        }
	})
}
