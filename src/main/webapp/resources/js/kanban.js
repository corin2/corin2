$(function(){
	
	showKanban();
	
	$('#content-md').draggable(
	          {
	             axis: "x"
	        },{
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

//드래그&드랍
function sortable(){
	$('div[class=listbox], div[class=listingbox], div[class=donebox]').sortable({
		items:'div:not(.listtitle)',
		placeholder: "ui-state-highlight",
		connectWith: '.listbox, .listingbox, .donebox',
		/*
		start : function(event, ui){
				$('#movingBox').css({
					left: event.pageX - ui.item[0].offsetLeft - (ui.item[0].clientWidth/2),
					top : event.pageY - ui.item[0].offsetTop - (ui.item[0].clientHeight/2)
				})
				$('#movingBox').append(ui.item) 
		},
		*/
		/*
		update: function(event, ui) {
			var productOrder = $(this).sortable('toArray').toString();
			var children = $(this)[0].children
			if (children[1].className === 'cardcreate'){
				var children0 = children[0], 
					children1 = children[1], 
					children2 = children[2]
				$(this).empty()
				$(this).append(children0, children2, children1)
			}
			$.ajax({
				url : 'CardSequenceUpdate.card',
				data : { 
							listNum : children[0].id,
							sequential : productOrder
						}
			})
		}
		*/
	}).disableSelection(); 
}

//멤버와 카드 뿌려주기
function showKanban(){
	var userhtml1, userhtml2, userhtml3;
	showUserField();
	//showList();
	//showCard();
}

//멤버 영역 뿌리기
function showUserField(){
	$.ajax({
		type : "post",
		url  : "showUserField",
		datatype:"JSON",
		data : {projectNum : $('#hiddenProjectNum').val()},
		success : function(data){
			var firsttext1 = ''; var firsttext2 = ''; var firsttext3 = '';
			var nexttext1 = ''; var nexttext2 = ''; var nexttext3 = '';
			$.each(data.data, function(index, elt) {
				var text1 = '<div class="userprofilebox">'
					  	 /* + '<img src="resources/profile/'+elt.userProfile+'" class="img-circle person" width="30" height="30">'*/
					  	  + elt.userId +'</div>';
				var text2 = '<div class="'+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+'"><div class="listingbox"></div></div>';
				var text3 = '<div class="'+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+'"><div class="donebox"></div></div>';
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
							 + '<div id="listnum' + elt.listNum + '" class="listbox"></div></div>';
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
			
			
			$.each(data.data, function(index, elt) {
				console.log(elt);
				htmlText = '<div id="cardNum'+elt.cardNum+'">'
						 + '<div class="card ui-sortable-handle" data-toggle="modal" data-target="#myModal">'+elt.cardName
						 + '<button type="button" class="close">&times;</button></div></div>';
				if(elt.userId == null) $('#listnum'+elt.listNum).append(htmlText);
				else $('#listnum'+elt.listNum).children('div[class='+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+']').children('div').append(htmlText);
				//'div[class='+elt.userId.split('@')[0]+elt.userId.split('@')[1].split('.')[0]+']'
			});
			
			autoWidth();
			sortable();
		}
	});
}