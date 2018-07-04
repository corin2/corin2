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
            },
        }
    )
	$('body').attr({
		oncontextmenu:"return false",
	 	onselectstart:"return false",
	}) 
		
});

/**
* @함수명 : autoWidth()
* @작성일 : 2018. 06. 05.
* @작성자 : 김 진 원
* @설명 : 칸반의 리스트의 개수에 맞춰 width를 정해준다.
**/
function autoWidth(){
	var width = (($('.kanbanbox').length + $('.userbox').length) * 350) + 300 +"px";
	$('#content-md').css("width", width)
	$('#mainScreen').css("width", width)
}

//todo와 inprogress에 카드를 3개씩 만 가지게 할 수 있는 변수
var sortablecnt = 0; var sortablecnt2 = 0; var sortablecnt3 = 0;

/*{
	overflow-y: auto;
}*/

/**
* @함수명 : sortable()
* @작성일 : 2018. 06. 05.
* @작성자 : 김 진 원
* @설명 : sortable에서 사용되는 것을 정의 한 곳
* 		update 카드의 순서가 변경되거나 리스트가 변경될 때 실행되며 비동기로 순서를 다시정해주거나 위치를 바꿔준다.
**/
function sortable(){
	$('div[class=listbox], div[class=listingbox], div[class=donebox]').sortable({
		items:'div:not(#addcard)',
		placeholder: "ui-state-highlight",
		connectWith: '.listbox, .listingbox, .donebox',
		scroll: false,
		opacity: 0.8,
		zIndex: 9999,
		containment: "#content",
		start: function(event, ui) {
			/*$('.listbox:not(#'+ui.item[0].id+')').css('overflow-y', 'auto');
			$('.donebox:not(#'+ui.item[0].id+')').css('overflow-y', 'auto');*/
		},
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
				swal('TODO와 INPROGRESS에는 각 개인당 3개의 카드만 가질 수 있습니다.');
				send(5);
			}else{
				$.ajax({
					url : 'cardTaxisUpdate',
					data : { 
						listNum : listNum,
						userId : children[0].className,
						cardTaxis : productOrder,
						cardNum : ui.item[0].id.substr(7)
					},
					success : function(data){
						sortablecnt = 0; sortablecnt2 = 0; sortablecnt3 = 0;
						send(1);
					},
					error: function() {
			            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
			        }
				})
			}
			
		}
	}).disableSelection();
	
}


/**
* @함수명 : showKanban()
* @작성일 : 2018. 06. 05.
* @작성자 : 김 진 원
* @설명 : 칸반을 뿌려준다.
**/
function showKanban(){
	showUserFrofiles();
}

/**
* @함수명 : showUserFrofiles()
* @작성일 : 2018. 06. 05.
* @작성자 : 김 진 원
* @설명 : 프로젝트에 속한 멤버의 사진과 닉네임을 가져와서 배열에 담아둔다.
**/
function showUserFrofiles(){
	var userProfiles = [];
	$.ajax({
		type : "post",
		url  : "showMemberUserProfile",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			$.each(data.data, function(index, elt) {
				userProfiles.push(elt);
			});
			
			showUserField(userProfiles);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : showUserField(userProfiles)
* @작성일 : 2018. 06. 05.
* @작성자 : 김 진 원
* @설명 : 칸반의 모양을 만들어주는 곳 멤버의 영역을 나눠주는 곳
* 		멤버의 영역을 나눠줄 때, 자신이 가장 위로 오게 만들어준다.
* @param userProfiles - 프로젝트에 속한 멤버의 정보가 담긴 배열
**/
function showUserField(userProfiles){
	$.ajax({
		type : "post",
		url  : "showMember",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			var firsttext1 = ''; var firsttext2 = ''; var firsttext3 = '';
			var nexttext1 = ''; var nexttext2 = ''; var nexttext3 = '';
			$.each(data.data, function(index, elt) {
				var text1 = '';
				$.each(userProfiles, function(i, elt2) {
					if(elt.userId == elt2.userId) {
						text1 += '<div class="userprofilebox">'
							+ '<img src="'+profileStorageURL+elt2.userProfile+'" class="img-circle person" width="75" height="75">'
							+ '<label>' + elt2.userName +'</label></div>';
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
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : showList()
* @작성일 : 2018. 06. 05.
* @작성자 : 김 진 원
* @설명 : 리스트의 영역을 나눠주는곳
**/
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
							 + '<div class="listtitle backlog"><label>'+ elt.listName +'</label></div>'
							 + '<div id="listnum' + elt.listNum + '" class="listbox"><input type="hidden" class="null"></div></div>';
				}else if(elt.listNum =="2"){
					htmltext += '<div><div id="listnum' + elt.listNum + '" class="userbox">'
							 + '<div class="listtitle floatLeftKanban"><label>'+ elt.listName +'</label></div>'+userhtml1+'</div>';	
				}else {
					htmltext += '<div id="listnum' + elt.listNum + '" class="kanbanbox">'
							 + '<div class="listtitle floatLeftKanban"><label>'+ elt.listName +'</label></div>';
					if(elt.listNum != data.data.length) htmltext += userhtml2
					else htmltext += userhtml3
				}
				htmltext += '</div>';
			});
			
			$('#content-md').html(htmltext);
			showCard();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : showCard()
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 나눠진 멤버의 영역별로 카드들을 뿌려준다.
**/
function showCard(){
	$.ajax({
		type : "post",
		url  : "showCard",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			var htmlText = '';
			$('.ui-sortable').children('div').remove();
			$.each(data.data, function(index, elt) {
				if(elt.isDeleted == '0') {
					htmlText = '<div id="div'+elt.cardNum+'">'
							 + '<div id="cardNum'+elt.cardNum+'" class="card ui-sortable-handle" onclick="cardDetail('+elt.cardNum+')" data-toggle="modal" data-target="#myModal">'
							 + '<label>'+elt.cardName+'</label>'
							 + '<button type="button" class="close closekanban" onclick="deleteCard(event,'+elt.cardNum+')" >&times;</button>'
							 + '<button type="button" class="glyphicon close updatekanban" onclick="updateCardTitle(event, '+elt.cardNum+')">&#xe065;</button></div></div>';
					if(elt.userId == null) $('#listnum'+elt.listNum).append(htmlText);
					else $('#listnum'+elt.listNum).children('div[class='+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+']').children('div').append(htmlText);
				}
			});
			
			$('#listnum1').append('<div id="addcard"><a class="cardcreate" onclick="addCardView('+sessionProjectNum+')">Add a card...</a></div>');
			
			autoWidth();
			sortable();
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : addCardView(projectNum)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 카드를 추가하는 텍스트박스를 생성한다
* @param projectNum - 프로젝트 넘버
**/
function addCardView(projectNum) {
	var div = "<input class='inputtext' type='text' placeholder='card title' name='title' "
			+ "onkeypress='if(event.keyCode==13) {addCard($(this).parent().children(\"label\"), "+ projectNum +");}' "
			+ "onfocusout='send(5)' onkeyup='fnChkByte(this, 27)' >"
			+ "<label id='addLabel floatRightKanban' onclick='addCard(this, "+ projectNum +")'>완료</label>";
	$('#addcard').html(div);
	$('#addcard').attr('class', 'card');
	$('#addcard').children('input').focus();
	focusOutDisgard($('#addLabel'));
}

/**
* @함수명 : addCard(obj, projectNum)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 카드 등록을 비동기로 insert 하며 다시 카드들을 뿌려준다
* @param obj - 자신태그 (this)
* @param projectNum - 프로젝트 넘버
**/
function addCard(obj, projectNum){
	var parent = $(obj).closest('div')
	var value = parent[0].firstChild.value //cardname
	if(value.trim() != ""){
		$.ajax({
			url:"cardInsert",
			datatype:"JSON",
			data:{cardName:value, projectNum:projectNum},
			success:function(data){
				send(1);
			},
			error: function() {
	            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
	        }
		});
	}
}

/**
* @함수명 : cardDetail(cardNum)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 카드 모든내용을 뿌려주는 함수를 모아둔곳.
* @param cardNum - 카드 넘버
**/
function cardDetail(cardNum){
	$('#hiddenCardNum').attr('value', cardNum);
	selectCard(cardNum);
	showCardCheckList();
}

/**
* @함수명 : selectCard(cardNum)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 카드내용을 <div id=hiddenCardNum> 에 뿌려준다. 
* @param cardNum - 카드 넘버
**/
function selectCard(cardNum){
	$.ajax({
		url:"cardSelect",
		datatype:"JSON",
		data:{cardNum:cardNum},
		success:function(data){
			$('#warningLabel').empty();
			$('#modalHeader').attr('onclick', 'cardNameMod()');
			$("#modalHeader").html(data.dto.cardName);
			$("#contentDetail").val(data.dto.cardContent);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : updateCardDetail(e)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : <div id=hiddenCardNum> 에 적혀있는 내용을 비동기로 업데이트 해준다 
* @param e - event
**/
function updateCardDetail(e){
	$.ajax({
		url:"cardUpdate",
		datatype:"JSON",
		data:{cardNum:$('#hiddenCardNum').val(), cardContent:$("#contentDetail").val(), cardName:$("#modalHeader").html()},
		success:function(data){
			swal("작성 완료");
			selectCard($('#hiddenCardNum').val());
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : deleteCard(e,cardNum)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 선택한 카드가 삭제 되도록 비동기 처리
* @param e - event
* @param cardNum - 카드넘버
**/
function deleteCard(e,cardNum){
	e.stopPropagation();
	
	$.ajax({
		url:"cardDelete",
		datatype:"JSON",
		data:{cardNum:cardNum},
		success:function(data){
			send(1);
		},
		error: function() {
            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
        }
	});
}

/**
* @함수명 : updateCardTitle(e, cardNum)
* @작성일 : 2018. 06. 06.
* @작성자 : 김 진 원
* @설명 : 카드를 수정 할 수 있도록 원래 카드의 제목이 뿌려진 div안에 text box를 만들어 준다.
* @param e - event
* @param cardNum - 카드넘버
**/
function updateCardTitle(e, cardNum) {
	var cardName = $('#cardNum'+cardNum).children('label').text();
	e.stopPropagation();
	var div = "<input class='inputtext' type='text' placeholder='"+cardName+"' name='title' "
			+ "onkeypress='if(event.keyCode==13) {updateCard($(this).parent().children(\"label\"), "+ cardNum +");}' "
			+ "onfocusout='send(5)' onkeyup='fnChkByte(this, 27)' >"
			+ "<label id='editLabel floatRightKanban' onclick='updateCard(this, "+ cardNum +")')>완료</label>";
	$('#div' + cardNum).html(div);
	$('#div' + cardNum).attr('class', 'card');
	$('#div' + cardNum).children('input').focus();
	focusOutDisgard($('#editLabel'));
}

/**
* @함수명 : updateCard(obj, cardNum)
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : text box 수정할 제목을 가져와서 비동기로 업데이트한다
* @param obj - 자신태그 (this)
* @param cardNum - 카드넘버
**/
function updateCard(obj, cardNum){
	var parent = $(obj).closest('div')
	var value = parent[0].firstChild.value //cardname
	if(value.trim() != ""){
		$.ajax({
			url:"cardTitleUpdate",
			datatype:"JSON",
			data:{cardName:value, cardNum:cardNum},
			success:function(data){
				send(1);
			},
			error: function() {
	            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
	        }
		});
	}
}

/**
* @함수명 : cardNameMod()
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : 카드의 정보가 저장된 modal 창에서도 카드제목이 변경 될 수 있도록 text box를 생성한다
**/
function cardNameMod(){
	var cardNum = $('#hiddenCardNum').val();
	var htmlObj = $('#modalHeader').html();
	var div = '<div><input type="text" class="form-control" placeholder="' + htmlObj + '"'
			+ 'onkeypress="if(event.keyCode==13) {cardNameModOk(event);}" onfocusout="selectCard('+cardNum+')">';

	$('#modalHeader').html(div);
	$('#modalHeader').removeAttr('onclick');
	$('#modalHeader').children('div').children('input').focus();
}

/**
* @함수명 : cardNameModOk(e)
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : text box 수정할 제목을 가져와서 비동기로 업데이트한다
* @param e - event
**/
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
				send(1);
			},
			error: function() {
	            swal({type: 'error',title: 'Oops...',text: 'Something went wrong!',footer: '<a href>Why do I have this issue?</a>'})
	        }
		});
	}else{
		selectCard(cardNum);
	}
	
	$('#modalHeader').attr('onclick', 'cardNameMod()');
}

//확인 버튼을 눌르 수 있도록 onfocusout 속성 제거
/**
* @함수명 : focusOutDisgard(obj)
* @작성일 : 2018. 06. 07.
* @작성자 : 김 진 원
* @설명 : onfocusout아웃이 되었을 때 텍스트박스가 사라지는데 완료버튼 위에서 onfocusout했을 때,
* 		사라지지않고 수정 혹은 생성되는 함수가 실행 될 수 있도록 hover로 생성 되고 삭제 되도록 만들어짐.
* @param obj - 자신태그(this)
**/
function  focusOutDisgard(obj) {
	$(obj).hover(function() {
		$(obj).closest('div').children('input').removeAttr('onfocusout');
	}, function(){
		$(obj).closest('div').children('input').attr('onfocusout', 'send(5)');
	});
}

//카드 디테일 내용 경고창
function warningLabel() {
	$('#warningLabel').html('변경된 내용이 저장되기 위해서는 저장버튼을 클릭해주세요.');
}