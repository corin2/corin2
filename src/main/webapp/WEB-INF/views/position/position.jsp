<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(function(){
	console.log(sessionProjectNum);
		 $("#dashboardcalendar").load("dashboardcalendar?projectNum=${sessionScope.sessionProjectNum}");
		 
		 $("#dashboardchecklist").load("dashboardchecklist?projectNum=${sessionScope.sessionProjectNum}");
		 
		 $("#dashboardchart").load("dashboardchart?projectNum="+sessionProjectNum);
		 
		 $("#dashboardfiles").load("dashboardfiles?projectNum="+sessionProjectNum);
		 
		 $("#dashboardtroubleshooting").load("dashboardtroubleshooting?projectNum="+sessionProjectNum);
		 
		 $("#dashboardkanban").load("dashboardkanban?projectNum="+sessionProjectNum);
	
});
</script>
<div>
    <div class="row">
        <div class="col-sm-4"><div id="dashboardchart"></div></div>
        <div class="col-sm-4"><div id="dashboardfiles"></div></div>
        <div class="col-sm-4"><div id="dashboardcalendar"></div></div>
    </div>
    <div class="row">
        <div class="col-sm-12"><div id="dashboardkanban"></div></div>
    </div>
    <div class="row">
        <div class="col-sm-12"><div id="dashboardtroubleshooting"></div></div>
    </div>
    <div class="row">
        <div class="col-sm-12"><div id="dashboardchecklist"></div></div>
    </div>
</div>
