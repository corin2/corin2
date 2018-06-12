$(function () {
	languageColorView();
})
var projectcnt = 0;
//프로젝트 생성 함수
function addProject() {
	console.log($("#ProjectName").val());
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
}
function projectProjectNum(projectName) {
	$.ajax({
		url:"selectProjectNum",
		datatype:"JSON",
		data:{projectName:projectName},
		success:function(data){
			console.log("프넘이다." + data.projectNum);
			insertTeamProject(data.projectNum);
		}
	})
}

function insertTeamProject(projectNum) {
	$.ajax({
		url:"projectTeamInsert",
		datatype:"JSON",
		data:{userId:$("#HiddenUserId").val(), projectNum:projectNum},
		success:function(data){
			console.log("팀삽입성공")
			$('#ProjectName').val('');
			languageColorView();
		}
		
	})
}

//프로젝트 뿌려주기
function projectView(projectArray) {
	$.ajax({
		url:"projectAllList",
		datatype : "JSON",
		data:{userId:$("#HiddenUserId").val()},
		success:function(data){
			var html ="";
			$("#projectbox").empty();
			console.log("44")
			$.each(data.list, function (index, elt) {
				$.each(projectArray[0], function(i, elt2) {
					if(elt.languageNum == elt2.languageNum){
						console.log("777")
						html +=	"<div style='float:left;'>"
							+ "<button class='button' style='background-color:"+elt2.languageColor+"'>"+elt.projectName+"</button>"
							+ "<p style='float:left; margin-right:14px;'><span class='glyphicon glyphicon-star-empty'></span></p>"
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



//프로젝트칼라 지정해주기
function languageColorView() {
	var projectArray = [];
	$.ajax({
		url:"languageColorAllList",
		datatype:"JSON",
		success:function(data){
			projectArray.push(data.list);
			projectView(projectArray);
		}
	})
}