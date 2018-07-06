$(function() {
	showCalendar();
	dragCardCalendar();
});

/**
* @함수명 : dialogStart(titleName, calendarNum)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 일반 캘린더를 생성하거나 수정할때 실행되는 함수로 dialog가 보여진다.
* 		그 dialog에서 완료 또는 취소를 할 수 있으며 완료를 눌렀을 시에는 
* 		dialog 에서 입력된 val()을 가지고 비동기적 처리가 실행된다.
* @param titleName - 캘린더 제목 즉, 내용  
* @param calendarNum - 캘린더 넘버  
**/
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
					swal({type: 'warning',title:"일정명을 입력해주세요."});
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
								},
								error: function() {
									swal({
										 type: 'error',
										 title: 'Oops...',
										 text: 'Something went wrong!',
										 footer: '<a href>Why do I have this issue?</a>'
										})
								}
							});
						}else if(titleName == '수정') {
							$.ajax({
								url:"modCalendar",
								datatype:"json",
								data: inputParam,
								success: function(data){
									send(2);
								},
								error: function() {
									swal({
										 type: 'error',
										 title: 'Oops...',
										 text: 'Something went wrong!',
										 footer: '<a href>Why do I have this issue?</a>'
										})
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

/**
* @함수명 : clearDialog()
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : dialog는 수정 할 때와 생성할 때와 정보를 볼 때, 보여지므로 입력된 정보가 수정되거나
* 		생성될때, 내용들이 초기화 되여야만 생성할 때 열리는 dialog가 빈칸으로 보여지므로 초기화 시켜준다.
**/
function clearDialog() {
	$("#eventTitle").val("");
	$("#eventStart").val("");
	$("#eventEnd").val("");
	$("#eventColor").val("#000000");
}		

/**
* @함수명 : rgb2hex(rgb)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : rgb 컬러가 (***, ***, ***)로 들어온 문자열을 정규표현식으로 짤라 숫자만을 가지고
* 		16진수 화 하여 hex 형태로 만들어 색깔의 문자열을 가져온다
* @param rgb - rgb 형태의 문자열
* @return hex 형태의 문자열
**/
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/**
* @함수명 : showCalendar()
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 풀캘린더를 정의&사용 한 함수.
* 		카드의 정보가 풀캘린더로 drop 되었을 때 비동기로 저장
* 		풀캘린더의 캘린더를 클릭하였을 때, 보여지는 것이 id에 따라 dialog가 보여질지, modal이 보여질지 정의
* 		풀캘린더의 캘린더가 드래그되어 eventdrop이 되었을 때 비동기로 날짜의 정보가 변화되어 저장
* 		풀캘린더의 캘린더가 eventResize이 되었을 때 비동기로 날짜의 정보가 변화되어 저장
* 		풀캘린더의 캘린더가 eventDragStop이 되었을 때 그 위치가 카드들이 모여진 div태그라면 캘린더가 비동기로 삭제
* 		풀캘린더의 달력을 클릭또는 클릭드래그 하여 select 된 날짜의 수만큼 dialog가 입력되고 그 내용을 DB에 저장될 함수를 실행
**/
function showCalendar() {
	$('#calendar').fullCalendar({
		header: {
			left:   'prev,next today',
			center: '',
			right:  'title'
		},
		dragRevertDuration : 0, // 원래 값으로 돌아가는 속도
		editable: true,
		droppable: true,
		drop: function(date, jsEvent, ui, resourceId) {
			var start = date.format();
			var cardNumber = $(this).attr('id').substr(10);
			var calendarName = ui.helper[0].innerText.trim();
			var rgb = $(this).css('background-color');
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
					calendarColor : rgb2hex(rgb)
				},
				success : function(data){
					send(2);
				},
				error: function() {
					swal({
						 type: 'error',
						 title: 'Oops...',
						 text: 'Something went wrong!',
						 footer: '<a href>Why do I have this issue?</a>'
						})
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
			    		},
			    		error: function() {
			    			swal({
			    				 type: 'error',
			    				 title: 'Oops...',
			    				 text: 'Something went wrong!',
			    				 footer: '<a href>Why do I have this issue?</a>'
			    				})
			    		}
			    	});
			    }
		    }else {
		    	if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
				        jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
		    		swal({type: 'error',title:'카드와 연동 된 일정이 아닙니다.'});
			    	$.ajax({
			    		type : "post",
			    		url  : "calendarDelete",
			    		datatype:"JSON",
			    		data : {calendarNum : event.id.substr(11)},
			    		success : function(data){
			    			send(2);
			    		},
			    		error: function() {
			    			swal({
			    				 type: 'error',
			    				 title: 'Oops...',
			    				 text: 'Something went wrong!',
			    				 footer: '<a href>Why do I have this issue?</a>'
			    				})
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
		eventLimit: true, // 너무 많아지면 more로 표시
	});
}

/**
* @함수명 : calendarDateUpdate(calendarData, id)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 일정의 위치가 수정이 되었을 때, card에서 파생된 일정인지 일반 일정인지를
* 		찾아 그것의 일정을 비동기로 날짜 변환하여 저장하고 다시 풀캘린더를 뿌려준다.
* @param calendarData - 변화될 정보가 배열에 저장되어 온 정보
* @param id - 변화될 풀캘린더 일정의 id
**/
function calendarDateUpdate(calendarData, id){
	if(id.indexOf('card') > -1){
		$.ajax({
			type : "post",
			url  : "cardCalendarDateUpdate",
			datatype:"JSON",
			data : calendarData,
			success : function(data){
				send(2);
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
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
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
			}
		});
	}
}

//일정을 생성하는 곳 (카드들~)
/**
* @함수명 : dragCardCalendar()
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 칸반에 저장된 카드들을 불러와 캘린더에서 사용할 수 있도록 <div id=external-events> 안에
* 		풀캘린더 일정 형태로 div 를 만들어 뿌려준다 
**/
function dragCardCalendar() {
	$.ajax({
		type : "post",
		url  : "allCardNoCallendar",
		datatype:"JSON",
		data : {projectNum : sessionProjectNum},
		success : function(data){
			var htmlText = '';
			var result = 4;
			if($('#external-events').attr('class') == 'chevron-down') result = data.data.length;
			
			$.each(data.data, function(index, elt) {
				if(elt.isDeleted == '0') {
					if(index < result) {
						htmlText += '<div id="cardNumber'+elt.cardNum+'" ' 
								 + 'class="fc-event ui-draggable ui-draggable-handle calendarList'+elt.listNum+'" ' 
								 + 'onclick="cardDetail('+elt.cardNum+')" data-toggle="modal" data-target="#myModal">'+elt.cardName+'</div>';
					}
				}
			});
			if(data.data.length > 4) {
				if($('#external-events').attr('class') == 'chevron-up')
					htmlText += '<div class="middleCalendar" onclick="cardNowResult(0)"><span class="glyphicon glyphicon-chevron-down"></span></div>';
				else if($('#external-events').attr('class') == 'chevron-down')
					htmlText += '<div class="middleCalendar" onclick="cardNowResult(1)"><span class="glyphicon glyphicon-chevron-up"></span></div>';
			}else if(data.data.length < 1) {
				htmlText += '<div class="boxnottext">사용하실 카드가 존재하지 않습니다</div>'
			}
			
			$('#external-events').html(htmlText);
			canDragCard();
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : cardNowResult(check)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : <div id=external-events>의 길이를 정의 한 것으로 사용자가 크게 보기를 원할때와
* 		작게보기를 원할때를 비교하여 css를 변화 시킨다.
* @param check - css를 어떤 형태로 바꿀지에 대한 비교값
**/
function cardNowResult(check) {
	if(check == 0) $('#external-events').attr('class', 'chevron-down');
	else if(check == 1) $('#external-events').attr('class', 'chevron-up');
	dragCardCalendar();
}

/**
* @함수명 : canDragCard()
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : <div id=external-events> 안에 있는 <div class=fc-event> 들이 드래그가 가능하게 한다.
**/
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

/**
* @함수명 : calendarCardView()
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 풀캘린더가 실행될때 이미 DB에 저장되어 있던 일정들을 다 뿌려주기 위해 데이터를 
* 		배열로 만들어주는 함수
**/
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
		},
		error: function() {
			swal({
				 type: 'error',
				 title: 'Oops...',
				 text: 'Something went wrong!',
				 footer: '<a href>Why do I have this issue?</a>'
				})
		}
	});
}

/**
* @함수명 : dateProcess(dateStr, days)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 문자로된 date를 date 형식으로 바꿔 날짜를 더하거나 뺄수 있게 만들어진 date가공 함수
* @param dateStr - 날짜 형식의 문자열
* @param days - 날짜를 더하거나 뺄값
**/
function dateProcess(dateStr, days) {
	var date = new Date(dateStr); // Date 객체 생성
	date.setDate(date.getDate() + days); // Date 가감설정
	var dateToISO = date.toISOString().substring(0,10); // Date -> String (ISO날짜 타입, 시간제거)
	return dateToISO;
}

/**
* @함수명 : dateProcessArray(arr, days)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 : 가공할 날짜가 한개가 아닌 여러개일 경울 배열에 담아 가공할 수 있도록 만들어진 함수
* @param arr - 가공할 데이터가 담겨있는 날짜 형식의 문자열이 담기 배열
* @param days - 날짜를 더하거나 뺄값
**/
function dateProcessArray(arr, days) { 
	for(var i in arr) {
		arr[i].end = dateProcess(arr[i].end, days);
	}
}

/**
* @함수명 : calendarRenderEvent(calendarArr)
* @작성일 : 2018. 06. 25.
* @작성자 : 김 진 원
* @설명 :  calendarCardView()에서 가공된 배열 데이터를 가지고 만들어진 풀캘린더에
* 		일정들을 renderEvent 해주기 위한 함수 
* @param calendarArr - 풀캘린더에 저장될 일정들이 담겨있는 배열
**/
function calendarRenderEvent(calendarArr) {
	dateProcessArray(calendarArr, 1); //출력시 DB종료일 + 1일
	$('#calendar').fullCalendar('removeEvents');
	for(var i in calendarArr) {
		//if(calendarArr[i].id.indexOf('card') > -1) { $('#'+calendarArr[i].id).remove(); }
		$('#calendar').fullCalendar('renderEvent', calendarArr[i], true);	
	}
}