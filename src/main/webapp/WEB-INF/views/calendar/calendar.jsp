<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<link href='${pageContext.request.contextPath}/resources/css/calendar/fullcalendar.min.css' rel='stylesheet' />
<link href='${pageContext.request.contextPath}/resources/css/calendar/fullcalendar.print.min.css' rel='stylesheet' media='print' />
<script src='${pageContext.request.contextPath}/resources/js/calendar/moment.min.js'></script>
<script src='${pageContext.request.contextPath}/resources/js/calendar/jquery.min.js'></script>
<script src='${pageContext.request.contextPath}/resources/js/calendar/fullcalendar.min.js'></script>
<script src='${pageContext.request.contextPath}/resources/js/calendar/gcal.min.js'></script>
<script>

  $(document).ready(function() {

    $('#calendar').fullCalendar({
      defaultDate: '2018-06-14',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      googleCalendarApiKey : "AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE",
      
      //googleCalendarApiKey : "yC5-uzXehepIksN7F4Qw0Q7A",

    	
      events: 
        {        	
        	/*
          googleCalendarId : 'ko.south_korea#holiday@group.v.calendar.google.com'
          , className : 'koHolidays'
          , color : '#FF0000'
          , textColor : '#FFFFFF' */
          
        	  googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'
          //  ,  className: 'gcal-event' 
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

<h2 id='boardTitle'>일정관리</h2>
  <div id='calendar'></div>

