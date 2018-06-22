<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<link href='${pageContext.request.contextPath}/resources/css/calendar/fullcalendar.min.css' rel='stylesheet' />
<link href='${pageContext.request.contextPath}/resources/css/calendar/fullcalendar.print.min.css' rel='stylesheet' media='print' />
<script src='${pageContext.request.contextPath}/resources/js/calendar/moment.min.js'></script>
<script src='${pageContext.request.contextPath}/resources/js/calendar/fullcalendar.min.js'></script>
<script src='${pageContext.request.contextPath}/resources/js/calendar/gcal.min.js'></script>
<script src="resources/js/calendar/calendar.js"></script>
<link rel="stylesheet" href="resources/css/calendar/calendar.css">
<script src="resources/js/kanban/kanban.js"></script>
<script src="resources/js/kanban/cardCheckList.js"></script>
<script src="resources/js/kanban/kanbanSocket.js"></script>
<jsp:include page="../kanban/carddetail.jsp"></jsp:include>
<div>
	<div id="calendar-md" class="container-fluid">
		<h2>일정관리</h2>
		<div id="external-events"></div>
		<div id="calendar"></div>
	</div>
</div>