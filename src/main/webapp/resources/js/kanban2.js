//카드를 추가하는 텍스트박스를 생성한다
function updateCardTitle(e,cardName,cardNum) {
	var card = cardNum;
	console.log("123");
	e.stopPropagation();
	$('#cardNum' + cardNum).empty();
	var div = "<input class='inputtext' type='text' placeholder='"+cardName+"' name='title' >"
			+ "<a onclick='updateCard(this, "+ cardNum +")'>완료</a>";
	$('#cardNum' + card).html(div);
	$('#cardNum' + card).attr('class', 'card');
}

//카드 제목 수정 확인
function updateCard(obj, cardNum){
	var parent = $(obj).closest('div')
	var value = parent[0].firstChild.value //cardname
	if(value.trim() != ""){
		$.ajax({
			url:"cardTitleUpdate",
			datatype:"JSON",
			data:{cardName:value, cardNum:cardNum},
			success:function(data){
				$(parent).remove();
				showKanban();
			}
		});
	}
}

//카드 디테일 제목 수정
function cardNameMod(){
	var cardNum = $('#hiddenCardNum').val();
	console.log(cardNum)
	var htmlObj = $('#modalHeader').html();
	
	var div = '<div onfocusout="selectCard('+ cardNum +')">'
		+ '<input type="text" class="form-control inputtextbox" placeholder="' + htmlObj + '" onkeyup="fnChkByte(this, 26)"'
		+ 'onkeypress="if(event.keyCode==13) {cardNameModOk();}" >';

	$('#modalHeader').html(div);
	$('#modalHeader').children('div').children('input').focus();
}

//상세페이지 카드명 수정 완료
function cardNameModOk(){
	var cardNum = $('#hiddenCardNum').val();
	var value = $('#modalHeader').children('div').children('input').val();
	if(value.trim() != ""){
		$.ajax({
			url:"cardTitleUpdate",
			datatype:"text",
			data:{cardNum:cardNum, cardName:value.trim()},
			success:function(data){
				var boardNum = $('#hiddenBoardnum').val();
				selectCard(cardNum);
				showKanban();
			}
		});
	}else{
		selectCard(cardNum);
	}
}

//keyup
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;
	
	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";
	
	for(var i=0; i<str_len; i++){
		one_char = str.charAt(i);
		
		if(escape(one_char).length > 4){
		    rbyte += 2;                                         // 한글2Byte
		}else{
		    rbyte++;                                            // 영문 등 나머지 1Byte
		}
		
		if(rbyte <= maxByte){
		    rlen = i+1;                                          // return할 문자열 갯수
		}
	}
	
	if(rbyte > maxByte){
	    alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
	    str2 = str.substr(0,rlen);                                  // 문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}
}
