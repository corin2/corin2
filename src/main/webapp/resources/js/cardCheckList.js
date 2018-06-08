//체크리스트를 추가하는 텍스트박스를 생성한다
function addCardCheckListView() {
	$('#addCheckListdiv').remove();
	var div = "<div id='addCheckListdiv' style='width:75%'><input type='checkbox' id='cardCheckBox'>"
			+ "<input id='cardCheckBoxInput' type='text' class='form-control' style='width:70%, float:left;'><a onclick='addCardCheckLIst(this)' style='float:right;'>완료</a>"
			+ "</div>"
			
	$('#checkListForm').append(div);
	
}

//체크리스트 등록 성공
function addCardCheckLIst(obj){
	var cardNum = $('#hiddenCardNum').val();
	console.log(cardNum)
	var value = $('#cardCheckBoxInput').val();
	console.log(value)
	if(value.trim() != ""){
		$.ajax({
			url:"cardCheckListInsert",
			datatype:"JSON",
			data:{checkContent:value, cardNum:cardNum},
			success:function(data){
				$("#addCheckListdiv").remove();
				$('#checkListForm').empty();
				showCardCheckList();
			}
		});
	}
}

//체크리스트 뿌리기
function showCardCheckList(){
	$('#checkListForm').empty()
	$.ajax({
		type : "post",
		url  : "cardCheckListSelect",
		datatype:"JSON",
		data : {cardNum : $('#hiddenCardNum').val()},
		success : function(data){
			var htmlText;
			
			$.each(data.list, function(index, elt) {
				if(elt.isDeleted == '0') {
					htmlText = "<p><input type='checkbox' id='checkbox"+elt.checkNum+"'>"
							 + "<label for ='checkbox"+elt.checkNum+"'>"+elt.checkContent+"</label>"
							 + "<button type='button' class='close' onclick='deleteCardCheckList("+elt.checkNum+")'>&times;</button>"
							 + "<button type='button' class='glyphicon close'>&#xe065;</button></p>"
							 
					if(elt.checkContent != null) $('#checkListForm').append(htmlText);
				}
			});
		}
	});
}

//체크리스트 삭제
function deleteCardCheckList(checkNum){
	
	$.ajax({
		url:"checkListDelete",
		datatype:"JSON",
		data:{checkNum:checkNum},
		success:function(data){
			showCardCheckList();
		}
	});
}