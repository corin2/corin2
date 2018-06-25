$(function() {
	showCalendar();
	dragCardCalendar(0);
});

function dialogStart(titleName, calendarNum) {
	//일정생성dialog 설정
	$('#calEventDialog').dialog({
		resizable: false,
		autoOpen: false,
		width: 'auto',
		maxWidth: 350,
		height: 'auto',
		modal: true,
		fluid: true,
		title: titleName,
		buttons: {
			// '완료'버튼 클릭 시
			완료: function() {
				var title = $('#eventTitle').val(); // 제목 
				var start = $('#eventStart').val(); // 시작일
				var end = $('#eventEnd').val();
				var color = $('#eventColor').val();
				var eventData = null; // 이벤트 객체 변수 선언
				
				if(title === "" ){
					swal("일정명을 입력해주세요.");
					return;
				}else {
						eventData = { // 이벤트 객체
							title: title,
							start: start,
							end: end,
							color: color
						};	
						
						var inputParam = {
							projectNum: sessionProjectNum,
							calendarName: eventData.title,
							startDate: eventData.start,
							endDate: eventData.end,
							calendarColor: eventData.color,
							calendarNum: calendarNum
						};
						
						if(titleName == '추가') {
							$.ajax({
								url:"addCalendar",
								datatype:"json",
								data: inputParam,
								success: function(data){
									send(2);
								}
							});
						}else if(titleName == '수정') {
							$.ajax({
								url:"modCalendar",
								datatype:"json",
								data: inputParam,
								success: function(data){
									send(2);
								}
							});
						}
						
					}
					$('#calendar').fullCalendar('unselect');
					$(this).dialog('close');
					clearDialog(); // dialog 초기화
				},
			// '취소'버튼 클릭 시
			취소: function() {
				$(this).dialog('close');
				clearDialog();
			}
		},
		close: function() { // 'x'버튼이나 esc를 눌러 dialog 창을 닫을 경우
			clearDialog();
		},				
	}); // end - calEventDialog
}

//dialog 초기화
function clearDialog() {
	$("#eventTitle").val("");
	$("#eventStart").val("");
	$("#eventEnd").val("");
	$("#eventColor").val("#000000");
}		

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
					send(2);
				}
			});
		},
		eventClick: function(event) {
			if(event.id.indexOf('card') > -1) {
				cardDetail(event.id.substr(10));
				$("#myModal").modal();
				
			}else if(event.id.indexOf('calendar') > -1) {
				$('#eventTitle').val(event.title);
				$('#eventStart').val(event.start._i); // 시작일 값
				$('#eventEnd').val(dateProcess(event.end._i, -1)); // 종료일 값
				$('#eventStart, #eventEnd').datepicker({dateFormat: 'yy-mm-dd'}); // 시작일, 종료일 Datepicker
				$('#eventColor').val(event.color);
				dialogStart('수정', event.id.substr(11));
				$('#calEventDialog').dialog('open', event.id);
			}
	    },
	    eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) { // Drag를 통한 날짜 변경 처리 함수
	    	var calendarData = {};
	    	if(event.id.indexOf('card') > -1) {
	    		calendarData = {
			    		cardNum : event.id.substr(10),
			    		startDate : event.start.format(),
			    		endDate : dateProcess(event.end.format(), -1)
			    	}
	    	}
	    	else if(event.id.indexOf('calendar') > -1) {
	    		calendarData = {
		    			calendarNum : event.id.substr(11),
			    		startDate : event.start.format(),
			    		endDate : dateProcess(event.end.format(), -1)
			    	}
	    	}
	    	calendarDateUpdate(calendarData, event.id);
	    },
		eventResize: function(event, delta, revertFunc) { // Editable을 통한 날짜 변경 처리 함수
			var calendarData = {};
	    	if(event.id.indexOf('card') > -1) {
	    		calendarData = {
			    		cardNum : event.id.substr(10),
			    		startDate : event.start.format(),
			    		endDate : dateProcess(event.end.format(), -1)
			    	}
	    	}
	    	else if(event.id.indexOf('calendar') > -1) {
	    		calendarData = {
		    			calendarNum : event.id.substr(11),
			    		startDate : event.start.format(),
			    		endDate : dateProcess(event.end.format(), -1)
			    	}
	    	}
			calendarDateUpdate(calendarData, event.id);
		},
		eventDragStop: function (event, jsEvent) { // Drag 후 삭제 기능
		    var trashEl = $('#external-events');
		    var ofs = trashEl.offset();
		    
		    var x1 = ofs.left;
		    var x2 = ofs.left + trashEl.outerWidth(true);
		    var y1 = ofs.top;
		    var y2 = ofs.top + trashEl.outerHeight(true);
		    
		    if(event.id.indexOf('card') > -1) {
			    if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
			        jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
			    	$.ajax({
			    		type : "post",
			    		url  : "cardCalendarDelete",
			    		datatype:"JSON",
			    		data : {cardNum : event.id.substr(10)},
			    		success : function(data){
			    			send(3);
			    		}
			    	});
			    }
		    }else {
		    	if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
				        jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
		    		swal('카드와 연동 된 일정이 아닙니다.');
			    	$.ajax({
			    		type : "post",
			    		url  : "calendarDelete",
			    		datatype:"JSON",
			    		data : {calendarNum : event.id.substr(11)},
			    		success : function(data){
			    			send(2);
			    		}
			    	});
		    	}
		    }
		},
		selectable: true, // 일자를 클릭, 드래그 가능
		selectHelper: true, // 일자 드래그하면 보드바를 표시
		select: function(start, end) { // 이벤트객체에 입력될 시작일, 종료일 파라미터
			var endDate = dateProcess(end.format(), -1); //추가 Dialog에서 종료값 -1일
			
			$('#eventStart').val(start.format()); // start.format() : 시작일 값
			$('#eventEnd').val(endDate); // 종료일 값
			$('#eventStart, #eventEnd').datepicker({dateFormat: 'yy-mm-dd'}); // 시작일, 종료일 Datepicker
			dialogStart('추가');
			$('#calEventDialog').dialog('open');
		},
	});
}

//일정 위치수정
function calendarDateUpdate(calendarData, id){
	if(id.indexOf('card') > -1){
		$.ajax({
			type : "post",
			url  : "cardCalendarDateUpdate",
			datatype:"JSON",
			data : calendarData,
			success : function(data){
				send(2);
			}
		});
	}else if(id.indexOf('calendar') > -1){
		$.ajax({
			type : "post",
			url  : "calendarDateUpdate",
			datatype:"JSON",
			data : calendarData,
			success : function(data){
				send(2);
			}
		});
	}
}

//일정을 생성하는 곳 (카드들~)
function dragCardCalendar(check) {
	$.ajax({
		type : "post",
		url  : "showCard",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			var htmlText = '';
			var result = 4;
			if(check == 1) result = data.data.length;
			$.each(data.data, function(index, elt) {
				if(elt.isDeleted == '0') {
					if(index < result) {
						htmlText += '<div id="cardNumber'+elt.cardNum+'" ' 
								 + 'class="fc-event ui-draggable ui-draggable-handle" ' 
								 + 'onclick="cardDetail('+elt.cardNum+')" data-toggle="modal" data-target="#myModal">'+elt.cardName+'</div>';
					}
				}
			});
			if(check == 0)
				htmlText += '<div class="middleCalendar" onclick="dragCardCalendar(1)"><span class="glyphicon glyphicon-chevron-down"></span></div>';
			else if(check == 1)
				htmlText += '<div class="middleCalendar" onclick="dragCardCalendar(0)"><span class="glyphicon glyphicon-chevron-up"></span></div>';
			
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
				if(elt.cardNum != '') {
					calendarArr.push({
						id : 'cardNumber'+elt.cardNum,
						title : elt.calendarName,
						start : elt.startDate.substr(0, 10),
						end : elt.endDate.substr(0, 10),
						color : elt.calendarColor
					});
				} else {
					calendarArr.push({
						id : 'calendarNum'+elt.calendarNum,
						title : elt.calendarName,
						start : elt.startDate.substr(0, 10),
						end : elt.endDate.substr(0, 10),
						color : elt.calendarColor
					});
				}
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
		if(calendarArr[i].id.indexOf('card') > -1) { $('#'+calendarArr[i].id).remove(); }
		$('#calendar').fullCalendar('renderEvent', calendarArr[i], true);	
	}
}