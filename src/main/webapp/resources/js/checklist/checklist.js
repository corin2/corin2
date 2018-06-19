$( function() {
    $( "#tabs" ).tabs();
    checkListTable();
  } );

//테이블 생성
function checkListTable() {
	var table ="";
	
	table = "<table class='table table-striped table-bordered table-hover'>"
		  + "<tbody>"
		  + "<tr>"
		  + "<th>NO</th>"
		  + "<th width='100%'>CHECKLIST</th>"
		  + "<th>CHECK</th>"
		  + "<th>EDIT</th>"
		  + "</tr>"
		  + "</tbody>"
		  + "<tbody id='CheckAddBox'>"
		  + "</tbody>"
		  + "</table>"
		  $('#tabs-2').append(table)
}

//체크리스트를 추가하는 창을 보여준다
function addCardCheckListView() {
	$('#checkBoxAdd').remove();
	var div = "<tr>"
			+ "<td id='checkBoxAdd' colspan='4'><input id='CheckBoxInput' type='text' class='inputtext' style='float:left;'>"
			+ "<button class='btn btn-danger' style='float:right;' onclick='removeCheckListAdd()'>취소</button>"
			+ "<button class='btn btn-success' style='float:right;' onclick='checkListInsert()'>추가</button></td></tr>";

$('#CheckAddBox').append(div)
$('#CheckBoxInput').focus();
}

//체크리스트 추가
function checkListInsert() {
	console.log($("#CheckBoxInput").val());
	$.ajax({
		url:"insertCheckList",
		dataType: "JSON",
		data:{checkContent:$("#CheckBoxInput").val()},
		success:function(data){
			console.log("삽입성공");
			//showCheckList();
		}
	})
}

//체크리스트 뿌리기
function showCheckList(){
	console.log("체크리스트뿌리기")
	$('#CheckAddBox').empty();
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
}