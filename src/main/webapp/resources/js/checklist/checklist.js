/**
파일명: checklist.js
    설명: 사용자 체크리스트 관한 파일
    작성일: 2018-06-18
    작성자: 최재욱
**/

$( function() {
	$(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    userGradeCheckList();
});

var myGradeNum = '';

/**
* @함수명 : checkListTable()
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 :체크리스트의 th부분을 생성하고 사용자의 등급을 구분하여 사용자 체크리스트의 
* 내용을 추가하는 버튼을 등급에 따라 서로 다르게 생성해준다.
**/
function checkListTable() {
 	 var table = '';
		 table += "<table class='table table-striped table-bordered table-hover'>"
			   + "<tbody>"
			   + "<tr>"
			   + "<th class='tdalignclass'>NO</th>";
	if(myGradeNum=='G300'){
		  table += "<th id='printa' class='tdalignclass tdCheckListContent'>CHECKLIST<img src='https://png.icons8.com/ios/50/000000/plus.png' class='checkProfileimg' onclick='addCardCheckListView()'>"
			    + "<a target='_blank' href='generateReport?file=checkListUser&projectNum="+sessionProjectNum+"&userId="+$('#hiddenUserId').val()+"'><span class='glyphicon glyphicon-print checkprint'></span></a>"
			    + "</th>"
		  
	}else{
	 	  table += "<th class='tdalignclass tdCheckListContent'>CHECKLIST"
				+ "<a target='_blank' href='generateReport?file=checkListUser&projectNum="+sessionProjectNum+"&userId="+$('#hiddenUserId').val()+"'><span class='glyphicon glyphicon-print checkprint'></span></a>"
		    	+ "</th>";
	}
		  table += "<th class='tdalignclass'>CHECK</th>"
	 
	  if(myGradeNum=='G300'){
		  table+= "<th class='tdpositionclass'>EDIT</th>"
		  }
		  table+= "</tr>"
			   + "</tbody>"
			   + "<tbody id='CheckAddBox'>"
			   + "</tbody>"
			   + "</table>"
		$('#tabs-2').html(table)
		showCheckList();
		
}

/**
* @함수명 : checkListTableConfirm()
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 프로젝트의 리더이면 팀원이 작성한 사용자 체크리스트의 결과를
* 확인 할 수 있는 탭에 th부분을 생성해 준다.
**/
function checkListTableConfirm() {
	$('#tabs-4').empty();
	$.ajax({
		url:"skillCheckListUserId",
		dataType: "JSON",
		data:{projectNum:sessionProjectNum},
		success: function(data) {
			var table ="";
			
			table = "<table class='table table-striped table-bordered table-hover'>"
			  + "<tbody>"
			  + "<tr>"
			  + "<th class='tdalignclass'>NO</th>"
			  + "<th class='tdalignclass tdCheckListContentMod'>CHECKLIST</th>";
			$.each(data.list, function(index, elt) {
				table += "<th class='tdalignclass'>"+elt.userId+"</th>"
			});
			table += "</tr>"
				  + "</tbody>"
				  + "<tbody id='CheckConfrimAddBox'>"
				  + "</tbody>"
				  + "</table>";
			$('#tabs-4').append(table);
			showCheckListConfrim(data.list)
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
* @함수명 : addCardCheckListView()
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 체크리스트를 추가할 수 있는 input태그를 생성하고 
* input태그 안에 포커스를 주어 바로 작성할 수 있게 했으며
* 키프레스를 이용하여 enter키로 작성 가능하게 했다.
**/
function addCardCheckListView() {
	$('#checkBoxAdd').parent().remove();
	var div = "<tr>"
			+ "<td id='checkBoxAdd' colspan='3'><input id='CheckBoxInput' type='text' class='inputtext checkFloat' onkeypress='if(event.keyCode==13) {checkListInsert();}' onkeyup='fnChkByte(this, 100)'>"
			+ "</td><td>"
			+ "<button class='btn btn-success checkFloatRight' onclick='checkListInsert()'>추가</button>"
			+ "<button class='btn btn-danger checkFloatRight' onclick='removeCheckListAdd()'>취소</button></td></tr>";

$('#CheckAddBox').append(div)
$('#CheckBoxInput').focus();
}

/**
* @함수명 : checkListInsert()
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트의 내용을 DB의 삽입 시키기 위한 함수이다.
**/
function checkListInsert() {
	if($("#CheckBoxInput").val()!=""){
	$.ajax({
		url:"insertCheckList",
		dataType: "JSON",
		data:{projectNum:sessionProjectNum, checkContent:$("#CheckBoxInput").val()},
		success:function(data){
			userGradeCheckList();
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
		swal({type: 'warning',title:"내용을 입력해 주세요"})
	}
}

/**
* @함수명 : showCheckList()
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트의 내용을 DB에서 가져와서 각 해당하는 라인에
* 보여주기 위한 함수 이다.
**/
function showCheckList(){
	$('#CheckAddBox').empty();
	$.ajax({
		type : "post",
		url  : "CheckListSelectAll",
		datatype:"JSON",
		data : {projectNum:sessionProjectNum},
		success : function(data){
			var html="";
			var i = 0;
			$.each(data.list, function(index, elt) {
				if(elt.isDeleted==0){
				html="<tr id='index"+(i+1)+"'>"
					+"<td class='tdalignclass'>"+(i+1)+"</td>"
					+"<td>"+elt.checkContent+"</td>"
					+"<td class='tdalignclass'><input type='checkbox' id='checkedBox"+elt.checkNum+"' onclick='checkedInsert("+elt.checkNum+")' class='icheckbox_flat-green'>"
					+"</td>"
					if(myGradeNum == 'G300'){
				html+="<td><button class='btn btn-info checkFloat' onclick='updateCheckListAdd("+(i+1)+","+elt.checkNum+")'>수정</button>"
					+"<button class='btn btn-danger checkFloat' onclick='deleteCheckListContent("+elt.checkNum+")'>삭제</button></td>" 
					}
				html+="</tr>";
					$('#CheckAddBox').append(html);
					i++;
				}
			});
			checkedSelectAll();
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
* @함수명 : showCheckListConfrim(user)
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 파라미터로 각 프로젝트의 해당하는 멤버의 아이디를 받아
* 해당위치의 체크리스트의 내용과 멤버의 아이디를 보여주는 함수 이다.
* @param user - 멤버의 아이디 배열
**/
function showCheckListConfrim(user){
	$('#CheckConfrimAddBox').empty();
	$.ajax({
		type : "post",
		url  : "CheckListSelectAll",
		datatype:"JSON",
		data : {projectNum:sessionProjectNum},
		success : function(data){
			var html="";
			var i = 0;
			$.each(data.list, function(index, elt) {
				if(elt.isDeleted==0){
				html="<tr>"
					+"<td class='tdalignclass'>"+(i+1)+"</td>"
					+"<td>"+elt.checkContent+"</td>";
					$.each(user, function(i, elt2) {
					html += "<td class='tdalignclass'><input type='checkbox' class='icheckbox_flat-green' id='"+elt.checkNum+elt2.userId.split('@')[0]+elt2.userId.split('@')[1].split('.')[0]
						 + "'disabled readonly></td>";
					});
					html += "</tr>";
					$('#CheckConfrimAddBox').append(html);
					i++;
				}
			});
			checkedSelectAllConfirm();
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
* @함수명 : showCheckListConfrim(user)
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트 추가하는 부분의 취소 버튼을 누르게
* 되면 실행이되고 자기사진을 제거하여 사라지게 한다.
**/
function removeCheckListAdd() {
	$('#checkBoxAdd').remove();
	showCheckList();
}


/**
* @함수명 : updateCheckListAdd(index,checkNum)
* @작성일 : 2018. 6. 18.
* @작성자 : 최재욱
* @설명 : 수정 버튼을 클릭시 해당하는 라인을 없애고 그위치에 사용자 체크리스트를
* 수정 할수 있는 input을 보여준다.
* @param index- 각라인을 구분하기위한 변수
* @param checkNum- 각라인의 내용이 실제 가지고 있는 DB상의 번호를 확인하기 위한 변수
**/
function updateCheckListAdd(index,checkNum) {
	if($("#checkBoxAdd").val() != ''){
	$("#index"+index).empty();
	$("#checkedBox"+checkNum).parent().parent().empty();
	var div = "<td id='checkBoxAdd' colspan='3'><input id='CheckBoxInput' type='text' class='inputtext checkFloat' onkeypress='if(event.keyCode==13) {updateCheckListContent("+checkNum+");}' onkeyup='fnChkByte(this, 100)'>"
			+ "</td><td>"		
			+ "<button class='btn btn-success checkFloatRight' onclick='updateCheckListContent("+checkNum+")'>수정</button>"
			+ "<button class='btn btn-danger checkFloatRight' onclick='removeCheckListAdd()'>취소</button></td>"
			$("#index"+index).append(div);
			$("#CheckBoxInput").focus();
	}else{
		swal({type: 'warning',title:"수정을 완료해 주세요"})
	}
}

/**
* @함수명 : updateCheckListContent(checkNum)
* @작성일 : 2018. 6. 19.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트의 사용자가 수정한 값을 DB상에 수정하기위한 함수 이다. 
* @param checkNum- DB상의 번호를 확인하기 위한 변수
**/
function updateCheckListContent(checkNum) {
	if($("#CheckBoxInput").val()!=''){
	$.ajax({
		url : "updateCheckListContent",
		datatype : "JSON",
		data : {projectNum:sessionProjectNum,
				checkContent:$("#CheckBoxInput").val(),
				checkNum:checkNum},
		success:function(data){
			showCheckList();
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
		swal({type: 'warning',title:"수정할 문자열을 입력해주세요"})
	}
}

/**
* @함수명 : deleteCheckListContent(checkNum)
* @작성일 : 2018. 6. 19.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트 테이블에서 보이지 않게 삭제 시키는 함수이다.
* @param checkNum- DB상의 번호를 확인하기 위한 변수
**/
function deleteCheckListContent(checkNum) {
	$.ajax({
		url : "deleteCheckListContent",
		datatype : "JSON",
		data :{projectNum:sessionProjectNum,checkNum:checkNum},
		success: function(data){
			userGradeCheckList();
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
* @함수명 : checkedSelectAll()
* @작성일 : 2018. 6. 19.
* @작성자 : 최재욱
* @설명 : 사용자 체크리스트의 체크여부를 DB 상에서 불러와 
* 멤버가 체크한 부분에 체크시켜주기 위한 함수 이다.
**/
function checkedSelectAll() {
	$.ajax({
		url:"selectChecked",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum,userId:$("#hiddenUserId").val()},
		success:function(data){
			$.each(data.list, function(index, elt) {
					$("#checkedBox"+elt.checkNum).attr("checked","checked");
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
* @함수명 : checkedSelectAllConfirm()
* @작성일 : 2018. 6. 19.
* @작성자 : 최재욱
* @설명 : 프로젝트의 리더라면 해당 프로젝트의 멤버들의 아이디 별로
* 체크 여부를 확인 할 수있게 해당 체크 박스의 체크여부를 생성해준다. 
**/
function checkedSelectAllConfirm() {
	$.ajax({
		url:"selectCheckedConfirm",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			$.each(data.list, function(index, elt) {
				$("#"+elt.checkNum+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]).attr("checked","checked");
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
* @함수명 : userGradeCheckList()
* @작성일 : 2018. 6. 19.
* @작성자 : 최재욱
* @설명 : 프로젝트의 사용자 등급을 판별하여 각 등급별로 해당하는 내용의
* 탭을 생성해 주는 함수이다.
**/
function userGradeCheckList() {
	$.ajax({
		url:"userGradeCheckList",
		datatype:"JSON",
		data:{userId:$("#hiddenUserId").val(),projectNum:sessionProjectNum},
		success:function(data){
			$.each(data.list, function(index, elt) {
				myGradeNum = elt.gradeNum;
				if(elt.gradeNum == 'G300'){
					skillCheckListTable();
					checkListTable();
					checkListTableConfirm();
					skillCheckListTableConfirm();
					showSkillCheckList();
				    
				}else{
					$("#tab3").remove();
					$("#tab4").remove();
					skillCheckListTable();
					showSkillCheckList();
					checkListTable();
				   
				}
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