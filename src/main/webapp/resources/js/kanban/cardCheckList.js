/**
* @함수명 : addCardCheckListView()
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : 체크리스트를 추가 할 수 있도록 text box와 완료 버튼을 append 해준다.
**/
function addCardCheckListView() {
	$('#addCheckListdiv').remove();
	
	var div = "<div id='addCheckListdiv'>"
			+ "<input id='cardCheckBoxInput' type='text' class='inputtext floatLeftKanban' "
			+ "onkeypress='if(event.keyCode==13) {addCardCheckList();}' "
			+ "onfocusout='showCardCheckList()' onkeyup='fnChkByte(this, 80)' >"			+ "<button class='close glyphicon' id='addBtnCheck' onclick='addCardCheckList()' onmouseover='focusOutCheckListDisgard(this)'>&#xe013;</button>"
			+ "</div>";
	
	$('#checkListForm').append(div)
	$('#cardCheckBoxInput').focus();
	focusOutDisgardCardCheck($('#addBtnCheck'));
}

/**
* @함수명 : focusOutDisgardCardCheck(obj)
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : 확인 버튼을 눌르 수 있도록 onfocusout 속성 제거 생성 hover
* @param obj - 자신태그(this)
**/
function  focusOutDisgardCardCheck(obj) {
	$(obj).hover(function() {
		$(obj).closest('div').children('input').removeAttr('onfocusout');
	}, function(){
		$(obj).closest('div').children('input').attr('onfocusout', 'addCardCheckListView()');
	});
}

/**
* @함수명 : addCardCheckList()
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : value의 값이 빈문자열이 아닐 때 비동기로 카드체크리스트가 생성된다.
**/
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
			},
			error: function() {
	            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
	        }
		});
	}
}

/**
* @함수명 : showCardCheckList()
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : DB에 저장된 카드체크리스트가 카드modal이 열릴때, 기본적으로 뿌려지게 한다.
**/
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
					htmlText += "<input type='checkbox' class='icheckbox_flat-green kanbanCheckboxMR' id='checkbox"+elt.checkNum+"' onclick='checkClick(this, "+elt.checkNum+")' ";
					
					if(elt.isChecked == '1') htmlText += "checked ";
					
					htmlText += "><label for='checkbox"+elt.checkNum+"' class='kanbanCheckboxLabel'>"+elt.checkContent+"</label>"
							 + "<button class='close' onclick='deleteCardCheckList("+elt.checkNum+")' >&times;</button>"
							 + "<button class='glyphicon close kanbanCheckMod' onclick='checkBoxMod(this, "+elt.checkNum+")' >&#xe065;</button></p>";
					
					if(elt.checkContent != null) $('#checkListForm').append(htmlText);
				}
			});
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : deleteCardCheckList(checkNum)
* @작성일 : 2018. 06. 08.
* @작성자 : 김 진 원
* @설명 : 자신이 선택한 카드체크리스트가 비동기로 삭제된다.
* @param checkNum - 카드체크리스트넘버
**/
function deleteCardCheckList(checkNum){
	
	$.ajax({
		url:"checkListDelete",
		datatype:"JSON",
		data:{checkNum:checkNum},
		success:function(data){
			showCardCheckList();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : checkClick(obj, checkNum)
* @작성일 : 2018. 06. 08.
* @작성자 : 김 진 원
* @설명 : 카드체크리스트의 checkbox가 체크됬는지 안됬는지의 여부를 확인한다
* @param obj - 자신태그(this)
* @param checkNum - 카드체크리스트넘버
**/
function checkClick(obj, checkNum){
	var checked = 0;
	var content = $(obj).parent().children('label').text();
	
	$(obj).change(function(){
        if($(obj).is(":checked")) checked = 1;
        else checked = 0;
        
        checkUpdate(checked, content, checkNum);
    });
}

/**
* @함수명 : checkUpdate(checked, content, checkNum)
* @작성일 : 2018. 06. 08.
* @작성자 : 김 진 원
* @설명 : 카드체크리스트가 체크되거나 체크가 풀리거나의 비동기 업데이트
* @param checked - 체크여부(0 or 1)
* @param content - 카드체크리스트 내용
* @param checkNum - 카드체크리스트넘버
**/
function checkUpdate(checked, content, checkNum){
	$.ajax({
		url:"checkedUpdate",
		datatype:"text",
		data:{isChecked:checked, checkContent:content, checkNum:checkNum},
		success:function(data){
			showCardCheckList();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : checkBoxMod(obj, checkNum)
* @작성일 : 2018. 06. 08.
* @작성자 : 김 진 원
* @설명 : 자신이 수정할 카드체크리스트의 내용을 수정할 수 있도록 text box를 생성한다
* @param obj - 자신태그(this)
* @param checkNum - 카드체크리스트넘버
**/
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

/**
* @함수명 : checkBoxModOk(obj, checkNum)
* @작성일 : 2018. 06. 11.
* @작성자 : 김 진 원
* @설명 : 변화시킬 내용을 가지고 해당 카드체크리스트넘버로 비동기로 업데이트한다
* @param obj - 자신태그(this)
* @param checkNum - 카드체크리스트넘버
**/
function checkBoxModOk(obj, checkNum){
	var content = $(obj).parent().children('input').val();
	if(content != "") checkUpdate(0, content, checkNum);
	else showCardCheckList();
}

/**
* @함수명 : focusOutCheckListDisgard(obj)
* @작성일 : 2018. 06. 11.
* @작성자 : 김 진 원
* @설명 : onfocusout아웃이 되었을 때 텍스트박스가 사라지는데 완료버튼 위에서 onfocusout했을 때,
* 		사라지지않고 수정 혹은 생성되는 함수가 실행 될 수 있도록 hover로 생성 되고 삭제 되도록 만들어짐.
* @param obj - 자신태그(this)
**/
function  focusOutCheckListDisgard(obj) {
	$(obj).hover(function() {
		$(obj).closest('div').children('input[type=text]').removeAttr('onfocusout');
	}, function(){
		$(obj).closest('div').children('input[type=text]').attr('onfocusout', 'showCardCheckList()');
	});
}