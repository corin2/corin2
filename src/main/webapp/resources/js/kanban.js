$(function(){
	
	autoWidth();
	sortable();
	
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

function autoWidth(){
	var width = (($('.kanbanbox').length + $('.userbox').length) * 350) + 300 +"px";
	$('#content-md').css("width", width)
	$('#mainScreen').css("width", width)
}

function sortable(){
	$('div[class=listbox], div[class=listingbox], div[class=donebox]').sortable({
		items:'div:not(.listtitle)',
		placeholder: "ui-state-highlight",
		connectWith: '.listbox, .listingbox, .donebox',
		start : function(event, ui){
				$('#movingBox').css({
					left: event.pageX - ui.item[0].offsetLeft - (ui.item[0].clientWidth/2),
					top : event.pageY - ui.item[0].offsetTop - (ui.item[0].clientHeight/2)
				})
				$('#movingBox').append(ui.item) 
		},
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
	}).disableSelection(); 
}
