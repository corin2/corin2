$(function(){
	showKanban();
	
	$('#content-md').draggable(
		{axis: "x"},
		{
            stop: function() {
                
                var left = $('#content-md')[0].offsetLeft
                var maxwidth = $(window).width() - $('#content-md').width()
                
                if(left > 0){
                    $('#content-md').css('left','0px')
                }else if($(window).width() > $('#content-md').width()){
                    if(left < 0){ //화면크기가 div길이보다 크고 left가 0보다 작으면!!
                        $('#content-md').css('left','0px')
                    }
                }else if($(window).width() < $('#content-md').width()){
                    if(left < maxwidth){ //화면크기가 div길이보다 작고 left가 maxwidth보다 작으면!!
                        $('#content-md').css('left',maxwidth-80)
                    }
                }
                $('#content-md').off('mousemove')
            }
        }
    )
	$('body').attr({
		oncontextmenu:"return false",
	 	onselectstart:"return false",
	}) 
		
});

//화면 좌우 조정
function autoWidth(){
	var width = (($('.kanbanbox').length + $('.userbox').length) * 350) + 300 +"px";
	$('#content-md').css("width", width)
	$('#mainScreen').css("width", width)
}

//todo와 inprogress에 카드를 3개씩 만 가지게 할 수 있는 변수
var sortablecnt = 0; var sortablecnt2 = 0; var sortablecnt3 = 0;

//드래그&드랍
function sortable(){
	$('div[class=listbox], div[class=listingbox], div[class=donebox]').sortable({
		items:'div:not(#addcard)',
		placeholder: "ui-state-highlight",
		connectWith: '.listbox, .listingbox, .donebox',
		
		//카드 위치 변경 시 카드 순번 업데이트
		update: function(event, ui) {
			var productOrder = $(this).sortable('toArray').toString();
			var children = $(this)[0].children
			var listNum;
			if(children[0].className == 'null'){
				listNum = $(this).attr('id')
			}else{
				listNum = $(this).parent().parent().attr('id')
			}
			
			if(listNum == 'listnum3' || listNum == 'listnum4'){
				for(var i = 0; i < productOrder.split(',').length; i++){
					if(productOrder.split(',')[i].substr(0, 1) == 'c'){
						if(sortablecnt == 0) sortablecnt2++;
						else sortablecnt3++;
					}
				}
			}
			sortablecnt = 1;
			
			if(sortablecnt2 > 3 || sortablecnt3 > 3){
				alert('TODO와 INPROGRESS에는 각 개인당 3개의 카드만 가질 수 있습니다.');
				showKanban();
			}else{
				$.ajax({
					url : 'cardTaxisUpdate',
					data : { 
						listNum : listNum,
						userId : children[0].className,
						cardTaxis : productOrder
					},
					success : function(data){
						sortablecnt = 0; sortablecnt2 = 0; sortablecnt3 = 0;
						showKanban();
					}
				})
			}
			
		}
	}).disableSelection();
	
}

//멤버와 카드 뿌려주기
function showKanban(){
	showUserFrofiles();
}

//멤버 사진과 닉네임 뿌리기
function showUserFrofiles(){
	var userProfiles = [];
	
	$.ajax({
		type : "post",
		url  : "showUserProfile",
		datatype:"JSON",
		data : {projectNum : $('#hiddenProjectNum').val()},
		success : function(data){
			$.each(data.data, function(index, elt) {
				userProfiles.push(elt);
			});
			
			showUserField(userProfiles)
		}
	});
}

//멤버 영역 뿌리기
function showUserField(userProfiles){
	$.ajax({
		type : "post",
		url  : "showUserField",
		datatype:"JSON",
		data : {projectNum : $('#hiddenProjectNum').val()},
		success : function(data){
			var firsttext1 = ''; var firsttext2 = ''; var firsttext3 = '';
			var nexttext1 = ''; var nexttext2 = ''; var nexttext3 = '';
			$.each(data.data, function(index, elt) {
				var text1 = '';
				$.each(userProfiles, function(i, elt2) {
					if(elt.userId == elt2.userId) {
						text1 += '<div class="userprofilebox">'
							+ '<img src="resources/profile/'+elt2.userProfile+'" class="img-circle person" width="30" height="30">'
							+ elt2.userName +'</div>';
					}
				});
				
				var text2 = '<div class="'+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+'"><div class="listingbox"><input type="hidden" class="'+elt.userId+'"></div></div>';
				var text3 = '<div class="'+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+'"><div class="donebox"><input type="hidden" class="'+elt.userId+'"></div></div>';
				if($('#hiddenUserId').val() == elt.userId){
					firsttext1 += text1; firsttext2 += text2; firsttext3 += text3;
				} else {
					nexttext1 += text1; nexttext2 += text2; nexttext3 += text3;
				}
			});
			
			userhtml1 = firsttext1 + nexttext1;
			userhtml2 = firsttext2 + nexttext2;
			userhtml3 = firsttext3 + nexttext3;
			
			showList();
		}
	});
}

//리스트 뿌리기
function showList(){
	$.ajax({
		type : "post",
		url  : "showList",
		contentType: "application/json; charset=utf-8",
		success : function(data){
			$('#content-md').empty();
			
			var htmltext = '';
			$.each(data.data, function(index, elt) {
				if(elt.listNum == "1"){
					htmltext += '<div class="kanbanbox">'
							 + '<div class="listtitle"><label>'+ elt.listName +'</label></div>'
							 + '<div id="listnum' + elt.listNum + '" class="listbox"><input type="hidden" class="null"></div></div>';
				}else if(elt.listNum =="2"){
					htmltext += '<div><div id="listnum' + elt.listNum + '" class="userbox">'
							 + '<div class="listtitle" style="float: left;"><label>'+ elt.listName +'</label></div>'+userhtml1+'</div>';	
				}else {
					htmltext += '<div id="listnum' + elt.listNum + '" class="kanbanbox">'
							 + '<div class="listtitle" style="float: left;"><label>'+ elt.listName +'</label></div>';
					if(elt.listNum != data.data.length) htmltext += userhtml2
					else htmltext += userhtml3
				}
				htmltext += '</div>';
			});
			
			$('#content-md').html(htmltext);
			showCard();
		}
	});
}

//카드 뿌리기
function showCard(){
	$.ajax({
		type : "post",
		url  : "showCard",
		datatype:"JSON",
		data : {projectNum : $('#hiddenProjectNum').val()},
		success : function(data){
			var htmlText;
			$('.ui-sortable').children('div').empty();
			$.each(data.data, function(index, elt) {
				if(elt.isDeleted == '0') {
					htmlText = '<div id="div'+elt.cardNum+'">'
							 + '<div id="cardNum'+elt.cardNum+'" class="card ui-sortable-handle" onclick="cardDetail('+elt.cardNum+')" data-toggle="modal" data-target="#myModal">'
							 + '<label>'+elt.cardName+'</label>'
							 + '<button type="button" class="close" onclick="deleteCard(event,'+elt.cardNum+')" >&times;</button>'
							 + '<button type="button" class="glyphicon close" onclick="updateCardTitle(event, '+elt.cardNum+')">&#xe065;</button></div></div>';
					if(elt.userId == null) $('#listnum'+elt.listNum).append(htmlText);
					else $('#listnum'+elt.listNum).children('div[class='+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+']').children('div').append(htmlText);
				}
			});
			
			$('#listnum1').append('<div id="addcard"><a class="cardcreate" onclick="addCardView('+$('#hiddenProjectNum').val()+')">Add a card...</a></div>');
			
			autoWidth();
			sortable();
		}
	});
}

//카드를 추가하는 텍스트박스를 생성한다
function addCardView(projectNum) {
	var div = "<input class='inputtext' type='text' placeholder='card title' name='title' "
			+ "onkeypress='if(event.keyCode==13) {addCard($(this).parent().children(\"a\"), "+ projectNum +");}' "
			+ "onfocusout='showKanban()' onkeyup='fnChkByte(this, 27)' >"
			+ "<a style='float: right;' onclick='addCard(this, "+ projectNum +")' onmouseover='focusOutDisgard(this)'>완료</a>";
	$('#addcard').html(div);
	$('#addcard').attr('class', 'card');
	$('#addcard').children('input').focus();
}

//카드 등록 성공
function addCard(obj, projectNum){
	var parent = $(obj).closest('div')
	var value = parent[0].firstChild.value //cardname
	if(value.trim() != ""){
		$.ajax({
			url:"cardInsert",
			datatype:"JSON",
			data:{cardName:value, projectNum:projectNum},
			success:function(data){
				showKanban();
			}
		});
	}
}

//카드 디텔일 총합 뿌려주기
function cardDetail(cardNum){
	$('#hiddenCardNum').attr('value', cardNum);
	selectCard(cardNum);
	showCardCheckList();
}

//카드 디테일에 내용 뿌려주기
function selectCard(cardNum){
	$.ajax({
		url:"cardSelect",
		datatype:"JSON",
		data:{cardNum:cardNum},
		success:function(data){
			$('#modalHeader').attr('onclick', 'cardNameMod()');
			$("#modalHeader").html(data.dto.cardName);
			$("#contentDetail").val(data.dto.cardContent);
		}
	});
}

//카드 디테일 내용 수정
function updateCardDetail(e){
	$.ajax({
		url:"cardUpdate",
		datatype:"JSON",
		data:{cardNum:$('#hiddenCardNum').val(), cardContent:$("#contentDetail").val(), cardName:$("#modalHeader").html()},
		success:function(data){
			selectCard($('#hiddenCardNum').val());
		}
	});
}

//카드 삭제
function deleteCard(e,cardNum){
	e.stopPropagation();
	
	$.ajax({
		url:"cardDelete",
		datatype:"JSON",
		data:{cardNum:cardNum},
		success:function(data){
			showKanban();
		}
	});
}

//카드를 수정하는 텍스트박스를 생성한다
function updateCardTitle(e, cardNum) {
	var cardName = $('#cardNum'+cardNum).children('label').text();
	e.stopPropagation();
	var div = "<input class='inputtext' type='text' placeholder='"+cardName+"' name='title' "
			+ "onkeypress='if(event.keyCode==13) {updateCard($(this).parent().children(\"a\"), "+ cardNum +");}' "
			+ "onfocusout='showKanban()' onkeyup='fnChkByte(this, 27)' >"
			+ "<a style='float: right;' onclick='updateCard(this, "+ cardNum +")' onmouseover='focusOutDisgard(this)')>완료</a>";
	$('#div' + cardNum).html(div);
	$('#div' + cardNum).attr('class', 'card');
	$('#div' + cardNum).children('input').focus();
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
				showKanban();
			}
		});
	}
}

//카드 디테일 제목 수정
function cardNameMod(){
	var cardNum = $('#hiddenCardNum').val();
	var htmlObj = $('#modalHeader').html();
	var div = '<div><input type="text" class="form-control" placeholder="' + htmlObj + '"'
			+ 'onkeypress="if(event.keyCode==13) {cardNameModOk(event);}" onfocusout="selectCard('+cardNum+')">';

	$('#modalHeader').html(div);
	$('#modalHeader').removeAttr('onclick');
	$('#modalHeader').children('div').children('input').focus();
}

//상세페이지 카드명 수정 완료
function cardNameModOk(e){
	var cardNum = $('#hiddenCardNum').val();
	var value = $('#modalHeader').children('div').children('input').val();
	if(value.trim() != ""){
		$.ajax({
			url:"cardTitleUpdate",
			datatype:"text",
			data:{cardNum:cardNum, cardName:value.trim()},
			success:function(data){
				e.stopPropagation();
				selectCard(cardNum);
				showKanban();
			}
		});
	}else{
		selectCard(cardNum);
	}
	
	$('#modalHeader').attr('onclick', 'cardNameMod()');
}

//확인 버튼을 눌르 수 있도록 onfocusout 속성 제거
function  focusOutDisgard(obj) {
	$(obj).hover(function() {
		$(obj).closest('div').children('input').removeAttr('onfocusout');
	}, function(){
		$(obj).closest('div').children('input').attr('onfocusout', 'showKanban()');
	});
}
