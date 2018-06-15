/**
    파일명: calendar.js
    설   명: 풀캘린더의 javascript ajax 함수 구현
    작성일: 2018. 6. 15.
    작성자: 배현준
*/

$(function(){
	showCalendar();
});
//일정 조회하여 풀캘린더에 뿌리기 
function showCalendar(){
	var calendars = [];
	$.ajax({
		type : "post",
		url  : "calendarview",
		datatype:"JSON",
		//data : {projectNum : $('#hiddenProjectNum').val()},
		data : {projectNum : 1},
		success : function(data){
			$.each(data.data, function(index, elt) {
				calendars.push(elt);
			});
			
			//showCalendar(calendars);
			console.log(calendars);
			}
		
	});
}
