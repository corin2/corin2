/**
파일명: skillchecklist.js
    설명: 기본 체크리스트 관한 파일
    작성일: 2018-06-20
    작성자: 최재욱
**/

$( function() {
  /*  $( "#tabs" ).tabs();*/
  });

/**
* @함수명 : skillCheckListTable()
* @작성일 : 2018. 6. 20.
* @작성자 : 최재욱
* @설명 :체크리스트의 th부분을 생성해준다.
**/
function skillCheckListTable() {
	$('#tabs-1').empty();
	var table ="";
	
	table = "<table class='table table-striped table-bordered table-hover'>"
		  + "<tbody>"
		  + "<tr>"
		  + "<th class='tdpositionclass tdalignclass'>CLASS</th>"
		  + "<th class='tdalignclass thCheckListWidth'>CHECKLIST<a href='generateReport?file=checkList&projectNum="+sessionProjectNum+"&userId="+$('#hiddenUserId').val()+"'><span class='glyphicon glyphicon-print checkprint'></span></a></th>"
		  + "<th class='tdalignclass'>CHECK</th>"
		  + "</tr>"
		  + "</tbody>"
		  + "<tbody id='skillCheckAddBox'>"
		  + "</tbody>"
		  + "</table>"
		  $('#tabs-1').append(table)
}


/**
* @함수명 : skillCheckListTableConfirm()
* @작성일 : 2018. 6. 20.
* @작성자 : 최재욱
* @설명 : 프로젝트의 리더이면 팀원이 작성한 사용자 체크리스트의 결과를
* 확인 할 수 있는 탭에 th부분을 생성해 준다.
**/
function skillCheckListTableConfirm() {
	$('#tabs-3').empty();
	$.ajax({
		url:"skillCheckListUserId",
		dataType: "JSON",
		data:{projectNum:sessionProjectNum},
		success: function(data) {
			var table ="";
			
			table = "<table class='table table-striped table-bordered table-hover'>"
				+ "<tbody>"
				+ "<tr>"
				+ "<th class='tdpositionclass tdalignclass'>CLASS</th>"
				+ "<th class='tdalignclass thCheckListStyleWidth'>CHECKLIST</th>";
			$.each(data.list, function(index, elt) {
				table += "<th class='tdalignclass'>"+elt.userId+"</th>"
			});
			table += "</tr>"
				  + "</tbody>"
				  + "<tbody id='skillCheckConfrimAddBox'>"
				  + "</tbody>"
				  + "</table>";
			$('#tabs-3').append(table)
			showSkillCheckListConfirm(data.list);
				
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
* @함수명 : showSkillCheckListConfirm(user)
* @작성일 : 2018. 6. 20.
* @작성자 : 최재욱
* @설명 : 파라미터로 각 프로젝트의 해당하는 멤버의 아이디를 받아
* 해당위치의 체크리스트의 내용과 멤버의 아이디를 보여주는 함수 이다.
* @param user - 멤버의 아이디 배열
**/
function showSkillCheckListConfirm(user){
	$.ajax({
		type : "post",
		url  : "checkListSelect",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success : function(data){
			var html="";
			$.each(data.list, function(index, elt) {
				html = "<tr>" + "<td class='tdalignclass'>" + elt.category + "</td>" + "<td>"
						+ elt.checkContent + "</td>";
				$.each(user, function(i, elt2) {
					html += "<td class='tdalignclass'><input type='checkbox' id='"+elt2.userId.split('@')[0]+elt2.userId.split('@')[1].split('.')[0]
							+ elt.checkNum + "' class='icheckbox_flat-green' disabled readonly></td>";
				});
				html += "</tr>";

				$('#skillCheckConfrimAddBox').append(html);
			});
			checkedSelectConfirm();
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : showSkillCheckList(user)
* @작성일 : 2018. 6. 21.
* @작성자 : 최재욱
* @설명 : 기본적인 체크리스트의 내용을 생성하여 보여주는 함수이다.
**/
function showSkillCheckList(){
	$('#skillCheckAddBox').empty();
	$.ajax({
		type : "post",
		url  : "checkListSelect",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success : function(data){
			var html="";
			$.each(data.list, function(index, elt) {
				html="<tr>"
				 	+"<td class='tdalignclass'>"+elt.category+"</td>"
				 	+"<td>"+elt.checkContent+"</td>"
					+ "<td class='tdalignclass'><input type='checkbox' class='icheckbox_flat-green' id='skillCheckedBox"+elt.checkNum+"' onclick='checkedInsert("+elt.checkNum+")'></td>"
					+"</tr>";
					$('#skillCheckAddBox').append(html);
			});
			checkedSelect();
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : checkedInsert(checkNum)
* @작성일 : 2018. 6. 21.
* @작성자 : 최재욱
* @설명 : 사용자가 체크를 하엿을때 해당 하는 내용의 체크여부를 DB에 저장 또는 삭제 하기 위한 함수이다.
* @param : checkNum - DB상의 변호를 구분하기 위한 변수
**/
function checkedInsert(checkNum) {
	if($("#skillCheckedBox"+checkNum).is(":checked")||$("#checkedBox"+checkNum).is(":checked")){
		$.ajax({
			url:"insertChecked",
			datatype:"JSON",
			data:{
				checkNum:checkNum,
				projectNum:sessionProjectNum,
				userId:$("#hiddenUserId").val()
			},
			success:function(data){
				checkedSelect();
				checkedSelectAll();
				send(4);
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
		
	}else{
		$.ajax({
			url:"deleteChecked",
			datatype:"JSON",
			data:{
				checkNum:checkNum,
				projectNum:sessionProjectNum,
				userId:$("#hiddenUserId").val()
			},
			success:function(data){
				checkedSelect();
				checkedSelectAll();
				send(4);
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
	
		
	
}
/**
* @함수명 : checkedSelect()
* @작성일 : 2018. 6. 21.
* @작성자 : 최재욱
* @설명 : 체크리스트의 체크여부를 DB 상에서 불러와 
* 체크한 부분에 체크시켜주기 위한 함수 이다.
**/
function checkedSelect() {
	$.ajax({
		url:"selectChecked",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum,userId:$("#hiddenUserId").val()},
		success:function(data){
			$.each(data.list, function(index, elt) {
					$("#skillCheckedBox"+elt.checkNum).attr("checked","checked");
			})
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
* @함수명 : checkedSelectConfirm()
* @작성일 : 2018. 6. 21.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트의 체크여부를 DB 상에서 불러와 
* 멤버가 체크한 부분에 체크시켜주기 위한 함수 이다.
**/
function checkedSelectConfirm() {
	$.ajax({
		url:"selectCheckedConfirm",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			$.each(data.list, function(index, elt) {
			$("#"+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+elt.checkNum).attr("checked","checked");
			})
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
