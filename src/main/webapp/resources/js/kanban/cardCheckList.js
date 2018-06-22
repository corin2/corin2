//체크리스트를 추가하는 텍스트박스를 생성한다
function addCardCheckListView() {
	$('#addCheckListdiv').remove();
	
	var div = "<div id='addCheckListdiv'>"
			+ "<input id='cardCheckBoxInput' type='text' class='inputtext' style='float:left;' "
			+ "onkeypress='if(event.keyCode==13) {addCardCheckList();}' "
			+ "onfocusout='showCardCheckList()' onkeyup='fnChkByte(this, 80)' >"			+ "<button class='close glyphicon' id='addBtnCheck' onclick='addCardCheckList()' onmouseover='focusOutCheckListDisgard(this)'>&#xe013;</button>"
			+ "</div>";
	
	$('#checkListForm').append(div)
	$('#cardCheckBoxInput').focus();
	focusOutDisgardCardCheck($('#addBtnCheck'));
}

//확인 버튼을 눌르 수 있도록 onfocusout 속성 제거
function  focusOutDisgardCardCheck(obj) {
	$(obj).hover(function() {
		$(obj).closest('div').children('input').removeAttr('onfocusout');
	}, function(){
		$(obj).closest('div').children('input').attr('onfocusout', 'addCardCheckListView()');
	});
}

//체크리스트 등록 성공
function addCardCheckList() {
	var cardNum = $('#hiddenCardNum').val();
	var value = $('#cardCheckBoxInput').val();
	if(value.trim() != ""){
		$.ajax({
			url:"cardCheckListInsert",
			datatype:"JSON",
			data:{checkContent:value, cardNum:cardNum},
			success:function(data){
				showCardCheckList();
			}
		});
	}
}

//체크리스트 뿌리기
function showCardCheckList(){
	$.ajax({
		type : "post",
		url  : "cardCheckListSelect",
		datatype:"JSON",
		data : {cardNum : $('#hiddenCardNum').val()},
		success : function(data){
			var htmlText;
			$('#checkListForm').empty();
			
			$.each(data.list, function(index, elt) {
				if(elt.isDeleted == '0') {
					htmlText = "<p>";
					htmlText += "<input type='checkbox' style='margin-right:8px;' class='icheckbox_flat-green' id='checkbox"+elt.checkNum+"' onclick='checkClick(this, "+elt.checkNum+")' ";
					
					if(elt.isChecked == '1') htmlText += "checked ";
					
					htmlText += "><label for='checkbox"+elt.checkNum+"' style='vertical-align: text-top;'>"+elt.checkContent+"</label>"
							 + "<button class='close' onclick='deleteCardCheckList("+elt.checkNum+")' >&times;</button>"
							 + "<button class='glyphicon close' style='margin-right:5px;' onclick='checkBoxMod(this, "+elt.checkNum+")' >&#xe065;</button></p>";
					
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

//체크를 클릭했을 때 바로 업데이트 하기
function checkClick(obj, checkNum){
	var checked = 0;
	var content = $(obj).parent().children('label').text();
	
	$(obj).change(function(){
        if($(obj).is(":checked")) checked = 1;
        else checked = 0;
        
        checkUpdate(checked, content, checkNum);
    });
}

//체크박스 업데이트
function checkUpdate(checked, content, checkNum){
	$.ajax({
		url:"checkedUpdate",
		datatype:"text",
		data:{isChecked:checked, checkContent:content, checkNum:checkNum},
		success:function(data){
			showCardCheckList();
		}
	});
}

//체크박스를 텍스트를 생성하다
function checkBoxMod(obj, checkNum){
	var p = $(obj).closest('p');
	var text = p.children('label').html();
	
	var div = '<div><input type="text" class="inputtext" '
		+ 'onkeypress="if(event.keyCode==13) {checkBoxModOk($(this).parent().children(\'button\'), '+ checkNum +');}" '
		+ 'onfocusout="showCardCheckList()" onkeyup="fnChkByte(this, 80)" >'
		+ '<button class="close glyphicon" onclick="checkBoxModOk(this, '+checkNum+')" onmouseover="focusOutCheckListDisgard(this)">&#xe013;</button></div>';
	p.empty();
	p.html(div);
	p.children('div').children('input').focus();
}

//체크박스 내용 수정
function checkBoxModOk(obj, checkNum){
	var content = $(obj).parent().children('input').val();
	if(content != "") checkUpdate(0, content, checkNum);
	else showCardCheckList();
}

//확인 버튼을 눌르 수 있도록 onfocusout 속성 제거
function  focusOutCheckListDisgard(obj) {
	$(obj).hover(function() {
		$(obj).closest('div').children('input[type=text]').removeAttr('onfocusout');
	}, function(){
		$(obj).closest('div').children('input[type=text]').attr('onfocusout', 'showCardCheckList()');
	});
}