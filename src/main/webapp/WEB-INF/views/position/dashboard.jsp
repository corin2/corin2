<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script>
$(function(){
		 $("#calendar").load("position.calendar");
		 $("#checklist").load("position.checklist");
		 $("#chart").load("position.chart");
		 $("#files").load("position.files");
		 $("#troubleshooting").load("position.troubleshooting");
		 $("#kanban").load("position.kanban?projectNum=1");
	
});
</script>
<div id="calendar">
</div>
<div id="checklist">
</div>
<div id="chart">
</div>
<div id="files">
</div>
<div id="troubleshooting">
</div>
<div id="kanban">
</div>
