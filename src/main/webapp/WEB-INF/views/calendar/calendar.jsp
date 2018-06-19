<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<link href='resources/css/calendar/fullcalendar.min.css' rel='stylesheet' />
<link href='resources/css/calendar/fullcalendar.print.min.css' rel='stylesheet' media='print' />
<script src='resources/js/calendar/moment.min.js'></script>
<script src='resources/js/calendar/fullcalendar.min.js'></script>
<script src='resources/js/calendar/gcal.min.js'></script>


<script>

  $(document).ready(function() {

    $('#calendar').fullCalendar({
      defaultDate: '2018-06-14',
      editable: true,
      eventLimit: true, 
      
    //구글캘린더 공휴일 api 호출을 위한 키값(*필수)
      googleCalendarApiKey : "AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE",
      
      events: 
        {        	
          	  //구글캘린더 공휴일 api 호출
        	  googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'
        	  , className : 'koHolidays'
        	  , color : '#FF0000'
        	  , textColor : '#FFFFFF'
        }

      
    });

  });

</script>
<style>

  body {
    /* margin: 40px 10px; */
    padding: 0;
    font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
    font-size: 14px;
  }

  #calendar {
    max-width: 900px;
    margin: 0 auto;
  }

</style>
<div>
<h2 id='boardTitle'>일정관리</h2>
  <div id='calendar'></div>
<script src='resources/js/calendar/calendar.js'></script>

</div>

