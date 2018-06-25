<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(function(){
	console.log(sessionProjectNum);
		 $("#dashboardcalendar").load("dashboardcalendar?projectNum=${sessionScope.sessionProjectNum}").css({"width":"100%" , "max-height": "600px" , "overflow" : "scroll"});
		 
		 $("#dashboardchecklist").load("dashboardchecklist?projectNum=${sessionScope.sessionProjectNum}");
		 
		 $("#dashboardchart").load("dashboardchart?projectNum="+sessionProjectNum).css({"max-height": "600px" , "overflow" : "scroll"});
		 
		 $("#dashboardfiles").load("dashboardfiles?projectNum="+sessionProjectNum).css({"max-height": "600px" , "overflow" : "scroll"});
		 $("#dashboardkanban").load("dashboardkanban?projectNum="+sessionProjectNum);
	
});
</script>
<div>
    <div class="row">
        <div class="col-sm-4"><div id="dashboardchart"></div></div>
        <div class="col-sm-3"><div id="dashboardfiles"></div></div>
        <div class="col-sm-5"><div id="dashboardcalendar"></div></div>
    </div>
    <div class="row">
        <div class="col-sm-12" style="min-height: 200px; overflow: hidden;"><div style="min-height: 200px; overflow: hidden;"id="dashboardkanban"></div></div>
    </div>
    <div class="row">
        <div class="col-sm-12"><div id="dashboardchecklist"></div></div>
    </div>
</div>
