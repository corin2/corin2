$( function() {
    $( "#tabs" ).tabs();
    userGradeCheckList();
});

var myGradeNum = '';

//테이블 생성
function checkListTable() {
	 $('#tabs-2').empty();
 	 var table = '';
	 if(myGradeNum=='G300'){
		 table += "<img src='https://png.icons8.com/ios/50/000000/plus.png' class='checkProfileimg' onclick='addCardCheckListView()'>"
		 }
		 table += "<table class='table table-striped table-bordered table-hover'>"
			   + "<tbody>"
			   + "<tr>"
			   + "<th class='tdalignclass'>NO</th>"
			   + "<th class='tdalignclass tdCheckListContent'>CHECKLIST</th>"
			   + "<th class='tdalignclass'>CHECK</th>"
	  if(myGradeNum=='G300'){
		  table+= "<th class='tdpositionclass'>EDIT</th>"
		  }
		  table+= "</tr>"
			   + "</tbody>"
			   + "<tbody id='CheckAddBox'>"
			   + "</tbody>"
			   + "</table>"
		$('#tabs-2').append(table)
		showCheckList();
}

//Confirm 테이블 생성
function checkListTableConfirm() {
	$('#tabs-4').empty();
	$.ajax({
		url:"skillCheckListUserId",
		dataType: "JSON",
		data:{projectNum:sessionProjectNum},
		success: function(data) {
			var table ="";
			console.log(data.list)
			
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
		}
	})
}

//체크리스트를 추가하는 창을 보여준다
function addCardCheckListView() {
	$('#checkBoxAdd').remove();
	var div = "<tr>"
			+ "<td id='checkBoxAdd' colspan='4'><input id='CheckBoxInput' type='text' class='inputtext checkFloat' onkeypress='if(event.keyCode==13) {checkListInsert();}'>"
			+ "<button class='btn btn-danger checkFloatRight' onclick='removeCheckListAdd()'>취소</button>"
			+ "<button class='btn btn-success checkFloatRight' onclick='checkListInsert()'>추가</button></td></tr>";

$('#CheckAddBox').append(div)
$('#CheckBoxInput').focus();
}

//체크리스트 추가
function checkListInsert() {
	console.log($("#CheckBoxInput").val());
	$.ajax({
		url:"insertCheckList",
		dataType: "JSON",
		data:{projectNum:sessionProjectNum, checkContent:$("#CheckBoxInput").val()},
		success:function(data){
			console.log("삽입성공");
			showCheckList();
		}
	})
}

//체크리스트 뿌리기
function showCheckList(){
	console.log("체크리스트뿌리기")
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
				console.log(elt)
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
		}
	});
}

//Confirm 체크리스트 뿌리기
function showCheckListConfrim(user){
	console.log("체크리스트뿌리기")
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
				console.log(elt)
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
		}
	});
}

//취소버튼 클릭시 사라짐
function removeCheckListAdd() {
	$('#checkBoxAdd').remove();
	showCheckList();
}


//체크리스트 수정하는 창 생성
function updateCheckListAdd(index,checkNum) {
	if($("#checkBoxAdd").val() != ''){
	$("#index"+index).empty();
	$("#checkedBox"+checkNum).parent().parent().empty();
	var div = "<td id='checkBoxAdd' colspan='4'><input id='CheckBoxInput' type='text' class='inputtext checkFloat' onkeypress='if(event.keyCode==13) {updateCheckListContent("+checkNum+");}'>"
			+ "<button class='btn btn-danger checkFloatRight' onclick='removeCheckListAdd()'>취소</button>"
			+ "<button class='btn btn-success checkFloatRight' onclick='updateCheckListContent("+checkNum+")'>수정</button></td>"
			$("#index"+index).append(div);
			$("#CheckBoxInput").focus();
	}else{
		swal("수정을 완료해 주세요")
	}
}

//체크리스트 수정
function updateCheckListContent(checkNum) {
	if($("#CheckBoxInput").val()!=''){
	$.ajax({
		url : "updateCheckListContent",
		datatype : "JSON",
		data : {projectNum:sessionProjectNum,
				checkContent:$("#CheckBoxInput").val(),
				checkNum:checkNum},
		success:function(data){
			
			console.log("업데이트성공"+data.result);
			showCheckList();
		}
				
	})
	}else{
		swal("수정할 문자열을 입력해주세요")
	}
}

//체크리스트 삭제
function deleteCheckListContent(checkNum) {
	console.log(checkNum)
	$.ajax({
		url : "deleteCheckListContent",
		datatype : "JSON",
		data :{projectNum:sessionProjectNum,checkNum:checkNum},
		success: function(data){
			swal("체크리스트가 삭제되었습니다.");
			showCheckList();
		}
	})
	
}

//체크여부 뿌려주기
function checkedSelectAll() {
	$.ajax({
		url:"selectChecked",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum,userId:$("#hiddenUserId").val()},
		success:function(data){
			$.each(data.list, function(index, elt) {
					$("#checkedBox"+elt.checkNum).attr("checked","checked");
			})
		}
	
	})
	
}

//confirm 체크드 뿌려주기
function checkedSelectAllConfirm() {
	$.ajax({
		url:"selectCheckedConfirm",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			console.log(data.list)
			$.each(data.list, function(index, elt) {
				console.log("ggggg"+elt.checkNum+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]);
			$("#"+elt.checkNum+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]).attr("checked","checked");
			})
		}
	
	})
	
}
//로그인한 사용자의 멤버등급
function userGradeCheckList() {
	$.ajax({
		url:"userGradeCheckList",
		datatype:"JSON",
		data:{userId:$("#hiddenUserId").val(),projectNum:sessionProjectNum},
		success:function(data){
			console.log(data.list);
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
					checkListTable();
					showSkillCheckList();
				   
				}
			})
		}
	})
}


