$( function() {
    $( "#tabs" ).tabs();
    skillCheckListTable();
    showSkillCheckList();
    checkedSelect();
  } );

/*//체크리스트를 추가하는 창을 보여준다
function addCardCheckListView() {
	$('#checkBoxAdd').remove();
	var div = "<tr>"
			+ "<td id='checkBoxAdd' colspan='4'><input id='CheckBoxInput' type='text' class='inputtext' style='float:left;'>"
			+ "<button class='btn btn-danger' style='float:right;' onclick='removeCheckListAdd()'>취소</button>"
			+ "<button class='btn btn-success' style='float:right;' onclick='checkListUserId()'>추가</button></td></tr>";

$('#skillCheckAddBox').append(div)
$('#CheckBoxInput').focus();
}*/

//취소버튼 클릭시 사라짐
function removeCheckListAdd() {
	$('#checkBoxAdd').remove();
}

//테이블 생성
function skillCheckListTable() {
	var table ="";
	
	table = "<table class='table table-striped table-bordered table-hover'>"
		  + "<tbody>"
		  + "<tr>"
		  + "<th>구분</th>"
		  + "<th width='100%'>CHECKLIST</th>"
		  + "<th>CHECK</th>"
		  + "</tr>"
		  + "</tbody>"
		  + "<tbody id='skillCheckAddBox'>"
		  + "</tbody>"
		  + "</table>"
		  $('#tabs-1').append(table)
}

function checkListUserId() {
	$.ajax({
		url:"userIdCheckList",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			var userId = [];
			console.log(data.list);
			$.each(data.list, function(index, elt) {
				userId.push(elt.userId);
			})
			checkListInsert(userId);
		}
		
	})
}

/*//체크리스트 추가
function checkListInsert(userId) {
	console.log(userId);
	console.log($("#hiddenUserId").val());
	console.log($("#CheckBoxInput").val());
	console.log(sessionProjectNum);
	$.ajax({
		url:"insertCheckList",
		dataType: "JSON",
		data:{userId:userId,
			projectNum:sessionProjectNum,
			checkContent:$("#CheckBoxInput").val()},
		success:function(data){
			console.log("삽입성공");
			showCheckList();
		}
	})
}*/

//기본 체크리스트 내용 뿌리기
function showSkillCheckList(){
	console.log("체크리스트뿌리기")
	$('#skillCheckAddBox').empty();
	$.ajax({
		type : "post",
		url  : "checkListSelect",
		datatype:"JSON",
		success : function(data){
			var html="";
			$.each(data.list, function(index, elt) {
				html="<tr id='index"+(index+1)+"'>"
				 	+"<td>"+elt.category+"</td>"
				 	+"<td>"+elt.checkContent+"</td>"
					+ "<td><input type='checkbox' id='skillCheckedBox"+elt.checkNum+"' onclick='checkedInsert("+elt.checkNum+")'></td>"
					+"</tr>";
					$('#skillCheckAddBox').append(html);
			});
			checkedSelect();
		}
	});
}

//체크여부 확인
function checkedInsert(checkNum) {
	if($("#skillCheckedBox"+checkNum).is(":checked")){
		$.ajax({
			url:"insertChecked",
			datatype:"JSON",
			data:{
				checkNum:checkNum,
				projectNum:sessionProjectNum,
				userId:$("#hiddenUserId").val()
			},
			success:function(data){
				console.log("삽입성공");
				checkedSelect()
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
				console.log("삭제성공");
				checkedSelect()
			}
		})
	}
	
		
	
}
//체크여부 뿌려주기
function checkedSelect() {
	$.ajax({
		url:"selectChecked",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum,userId:$("#hiddenUserId").val()},
		success:function(data){
			console.log(data.list)
			$.each(data.list, function(index, elt) {
					console.log("들어왔니??"+elt.checkNum);
					$("#skillCheckedBox"+elt.checkNum).attr("checked","checked");
			})
		}
	
	})
	
}

//체크리스트 뿌리기
/*function showCheckList(){
	console.log("체크리스트뿌리기")
	$('#skillCheckAddBox').empty();
	$.ajax({
		type : "post",
		url  : "CheckListSelect",
		datatype:"JSON",
		data : {projectNum:sessionProjectNum},
		success : function(data){
			var html="";
			$.each(data.list, function(index, elt) {
				console.log(elt)
				html="<tr id='index"+(index+1)+"'>"
					+"<td>"+(index+1)+"</td>"
					+"<td>"+elt.checkContent+"</td>";
					if(elt.isChecked==1 && elt.userId==$("#hiddenUserId").val()){
					html += "<td><input type='checkbox' id='skillCheckedBox"+elt.checkNum+"' onclick='updateCheckBox("+elt.checkNum+")' checked></td>";
					}else{
					html += "<td><input type='checkbox' id='skillCheckedBox"+elt.checkNum+"' onclick='updateCheckBox("+elt.checkNum+")'></td>";
					}
					html+="<td><button class='btn btn-info' style='float:right;' onclick='updateCheckListAdd("+(index+1)+","+elt.checkNum+")'>수정</button>"
					+"<button class='btn btn-danger' style='float:right;'>삭제</button></td>" 
					+"</tr>"
					$('#skillCheckAddBox').append(html);
			});
		}
	});
}*/

//체크리스트 수정하는 창 생성
function updateCheckListAdd(index,checkNum) {
	$("#skillCheckedBox"+checkNum).parent().parent().empty();
	var div = "<td id='checkBoxAdd' colspan='4'><input id='CheckBoxInput' type='text' class='inputtext' style='float:left;'>"
			+ "<button class='btn btn-danger' style='float:right;' onclick='removeCheckListAdd()'>취소</button>"
			+ "<button class='btn btn-success' style='float:right;' onclick='updateCheckListContent("+checkNum+")'>추가</button></td>;"
			
			$("#index"+index).append(div);
			$("#CheckBoxInput").focus();
			
}

//체크리스트 수정
function updateCheckListContent(checkNum) {
	console.log($("#CheckBoxInput").val());
	$.ajax({
		url : "updateCheckListContent",
		datatype : "JSON",
		data : {userId:$("#hiddenUserId").val(),
				projectNum:sessionProjectNum,
				checkContent:$("#CheckBoxInput").val(),
				checkNum:checkNum},
		success:function(data){
			console.log("업데이트성공"+data.result);
			showCheckList();
		}
				
	})
}

//체크박스 업데이트
function updateCheckBox(checkNum) {
	var checked = 0;
	console.log($("#skillCheckedBox"+checkNum).is(":checked"));
	console.log(checkNum);
	if($("#skillCheckedBox"+checkNum).is(":checked")){
		checked=1;
	}else{
		checked=0;
	}
	updateCheckBoxExcute(checked,checkNum);
	
}

function updateCheckBoxExcute(checked,checkNum) {
	$.ajax({
		url:"checkBoxUpdate",
		datatype:"JSON",
		data:{userId:$("#hiddenUserId").val(),isChecked:checked, checkNum:checkNum},
		success:function(data){
			console.log("업데이트 성공")
		}
	})
}
