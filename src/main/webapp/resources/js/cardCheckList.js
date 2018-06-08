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
				console.log("zz")
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
	console.log("메메메로로오롱")
	console.log($('#hiddenCardNum').val());
	$.ajax({
		type : "post",
		url  : "cardCheckListSelect",
		datatype:"JSON",
		data : {cardNum : $('#hiddenCardNum').val()},
		success : function(data){
			var htmlText;
			
			$.each(data.list, function(index, elt) {
				if(elt.isDeleted == '1') {
					console.log("elt.checkNum" +elt.checkNum)
					htmlText = "<p><input type='checkbox' id='checkbox"+elt.checkNum+"'>"
							 + "<label for ='checkbox"+elt.checkNum+"'>"+elt.checkContent+"</label></p>"
					if(elt.checkContent != null) $('#checkListForm').append(htmlText);
					/*<p><input type="checkbox" id="checkbox1">
					<label for="checkbox1">체크리스트</label>
					<!-- <button type="button" class="close">&times;</button>
					<button type="button" class="glyphicon close">&#xe065;</button> -->
				</p>*/
				}
			});
		}
	});
}