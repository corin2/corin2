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
		data : {projectNum : '1'},
		success : function(data){
			$.each(data.data, function(index, elt) {
				calendars.push(elt);
			});
			
			viewCalendar(calendars);
			//console.log(calendars);
			}
		
	});
}

//프로젝트 선택보기
function viewCalendar(obj){
	$.ajax({
		url:"calendarview",
		datatype:"json",
		data: {projectNum : '1'},
		success: function(data){
			
			var json = JSON.parse(data);
			var boardArr = boardData(json);
			projectDisplay(boardArr);
			
		}
	});
}
//DB데이터 -> 달력 출력용 데이터
function boardData(json) {
	var boardArr = [];
	
	for(var i in json) {
		
			boardArr.push(
					{
						id: json[i].calendarNum,
						title: json[i].calendarName,
						start: json[i].startDate.substring(0,10),
						end: json[i].endDate.substring(0,10),
						color: json[i].calendarColor
					}
			);
		
	}
	
	return boardArr;
}
