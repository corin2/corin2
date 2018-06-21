$(function() {
	showCalendar();
	dragCardCalendar();
});

//캘린더 설정
function showCalendar() {
	$('#calendar').fullCalendar({
		header: {
			left:   'prev,next today',
			center: '',
			right:  'title'
		},
		dragRevertDuration : 0, // 드래그 속도
		editable: true,
		droppable: true,
		drop: function(date, jsEvent, ui, resourceId) {
			
			var start = date.format();
			var cardNumber = $(this).attr('id').substr(10);
			var calendarName = ui.helper[0].innerText.trim();
			
			$(this).remove(); //드래그가 완료되면 삭제된다.
			
			$.ajax({
				type : "post",
				url  : "addCalendar",
				datatype:"JSON",
				data : {
					cardNum : cardNumber,
					projectNum : sessionProjectNum,
					calendarName : calendarName,
					startDate : start,
					endDate : start,
					calendarColor : '#3A87AD'
				},
				success : function(data){
					calendarCardView();
				}
			});
		},
		eventClick: function(event) {
			console.log(event.id)
			//cardDetail()
	    },
	    eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) { // Drag를 통한 날짜 변경 처리 함수
	    	var calendarData = {
		    		cardNum : event.id.substr(10),
		    		startDate : event.start.format(),
		    		endDate : dateProcess(event.end.format(), -1)
		    	}
	    	calendarDateUpdate(calendarData);
	    },
		eventResize: function(event, delta, revertFunc) { // Editable을 통한 날짜 변경 처리 함수
			var calendarData = {
		    		cardNum : event.id.substr(10),
		    		startDate : event.start.format(),
		    		endDate : dateProcess(event.end.format(), -1)
		    	}
			calendarDateUpdate(calendarData);
		},
		eventDragStop: function (event, jsEvent) { // Drag 후 삭제 기능
		    var trashEl = $('#external-events');
		    var ofs = trashEl.offset();
		    
		    var x1 = ofs.left;
		    var x2 = ofs.left + trashEl.outerWidth(true);
		    var y1 = ofs.top;
		    var y2 = ofs.top + trashEl.outerHeight(true);

		    if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
		        jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
		    	$.ajax({
		    		type : "post",
		    		url  : "calendarDelete",
		    		datatype:"JSON",
		    		data : {cardNum : event.id.substr(10)},
		    		success : function(data){
		    			dragCardCalendar();
		    		}
		    	});
		    }
		}
	});
}

//일정 위치수정
function calendarDateUpdate(calendarData){
	$.ajax({
		type : "post",
		url  : "calendarDateUpdate",
		datatype:"JSON",
		data : calendarData,
		success : function(data){
			calendarCardView();
		}
	});
}

//일정을 생성하는 곳 (카드들~)
function dragCardCalendar() {
	$.ajax({
		type : "post",
		url  : "showCard",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			console.log(data.data)
			var htmlText = '';
			$.each(data.data, function(index, elt) {
				if(elt.isDeleted == '0') {
					htmlText += '<div id="cardNumber'+elt.cardNum+'" ' 
							 + 'class="fc-event ui-draggable ui-draggable-handle">'+elt.cardName+'</div>';
				}
			});
			
			$('#external-events').html(htmlText);
			canDragCard();
		}
	});
}

//카드들이 캘린더에 드래그가 가능하게 된다.
function canDragCard() {
	$('#external-events .fc-event').each(function() {
		$(this).data('event', {
			title: $.trim($(this).text()),
			stick: true
		});
	
		$(this).draggable({
			zIndex: 999,
			revert: true,
			revertDuration: 0
		});
	});
	
	calendarCardView();
}

//원래 달력에 있던 일정을 박스에서 달력으로 뿌려주기위한 준비.
function calendarCardView() {
	$.ajax({
		type : "post",
		url  : "calendarView",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			var calendarArr = [];
			$.each(data.data, function(index, elt) {
				calendarArr.push({
					id : 'cardNumber'+elt.cardNum,
					title : elt.calendarName,
					start : elt.startDate.substr(0, 10),
					end : elt.endDate.substr(0, 10),
					color : elt.calendarColor
				});
			});
			calendarRenderEvent(calendarArr);
		}
	});
}

//date가공 메서드
function dateProcess(dateStr, days) {
	var date = new Date(dateStr); // Date 객체 생성
	date.setDate(date.getDate() + days); // Date 가감설정
	var dateToISO = date.toISOString().substring(0,10); // Date -> String (ISO날짜 타입, 시간제거)
	return dateToISO;
}

//arr일때 date 가공
function dateProcessArray(arr, days) { 
	for(var i in arr) {
		arr[i].end = dateProcess(arr[i].end, days);
	}
}

//원래 달력에 있던 일정을 박스에서 달력으로 뿌려준다.
function calendarRenderEvent(calendarArr) {
	dateProcessArray(calendarArr, 1); //출력시 DB종료일 + 1일
	$('#calendar').fullCalendar('removeEvents');
	for(var i in calendarArr) {
		$('#'+calendarArr[i].id).remove();
		$('#calendar').fullCalendar('renderEvent', calendarArr[i], true);	
	}
}