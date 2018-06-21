$( function() {
    $( "#tabs" ).tabs();
  });

//테이블 생성
function skillCheckListTable() {
	$('#tabs-1').empty();
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


//Confirm 테이블 생성
function skillCheckListTableConfirm() {
	$('#tabs-3').empty();
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
				+ "<th>구분</th>"
				+ "<th width='100%'>CHECKLIST</th>";
			$.each(data.list, function(index, elt) {
				table += "<th>"+elt.userId+"</th>"
			});
			table += "</tr>"
				  + "</tbody>"
				  + "<tbody id='skillCheckConfrimAddBox'>"
				  + "</tbody>"
				  + "</table>";
			$('#tabs-3').append(table)
			showSkillCheckListConfirm(data.list);
				
		}
	})
	
}

//Confirm 기본 체크리스트 내용 뿌리기
function showSkillCheckListConfirm(user){
	$.ajax({
		type : "post",
		url  : "checkListSelect",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success : function(data){
			var html="";
			$.each(data.list, function(index, elt) {
				html = "<tr>" + "<td>" + elt.category + "</td>" + "<td>"
						+ elt.checkContent + "</td>";
				$.each(user, function(i, elt2) {
					html += "<td><input type='checkbox' id='"+elt2.userId.split('@')[0]+elt2.userId.split('@')[1].split('.')[0]
							+ elt.checkNum + "' class='icheckbox_flat-green' disabled readonly></td>";
				});
				html += "</tr>";

				$('#skillCheckConfrimAddBox').append(html);
			});
			checkedSelectConfirm();
		}
	});
}

//기본 체크리스트 내용 뿌리기
function showSkillCheckList(){
	console.log(sessionProjectNum)
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
				 	+"<td>"+elt.category+"</td>"
				 	+"<td>"+elt.checkContent+"</td>"
					+ "<td><input type='checkbox' class='icheckbox_flat-green' id='skillCheckedBox"+elt.checkNum+"' onclick='checkedInsert("+elt.checkNum+")'></td>"
					+"</tr>";
					$('#skillCheckAddBox').append(html);
			});
			checkedSelect();
		}
	});
}

//체크여부 확인
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
				console.log("삽입성공");
				checkedSelect()
				checkedSelectAll()
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
				checkedSelectAll()
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
			$.each(data.list, function(index, elt) {
					$("#skillCheckedBox"+elt.checkNum).attr("checked","checked");
			})
		}
	
	})
	
}
//confirm 체크드 뿌려주기
function checkedSelectConfirm() {
	$.ajax({
		url:"selectCheckedConfirm",
		datatype:"JSON",
		data:{projectNum:sessionProjectNum},
		success:function(data){
			console.log(data.list)
			$.each(data.list, function(index, elt) {
				console.log("ggggg"+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+elt.checkNum);
			$("#"+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+elt.checkNum).attr("checked","checked");
			})
		}
	
	})
	
}
