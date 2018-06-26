<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(function(){
	console.log(sessionProjectNum);
		 $("#dashboardcalendar").load("dashboardcalendar?projectNum=${sessionScope.sessionProjectNum}").css({"width":"100%" ,"padding-bottom": "15px" , "overflow" : "scroll"});
		 
		 $("#dashboardchecklist").load("dashboardchecklist?projectNum=${sessionScope.sessionProjectNum}");
		 
		 $("#dashboardchart").load("dashboardchart?projectNum="+sessionProjectNum).css({"width":"100%" ,"padding-bottom": "15px" ,"min-height":"614px" , "overflow" : "scroll"});
		 
		 $("#dashboardfiles").load("dashboardfiles?projectNum="+sessionProjectNum).css({"min-height": "674px" ,"max-height": "648px", "overflow" : "scroll"});
		 $("#dashboardkanban").load("dashboardkanban?projectNum="+sessionProjectNum);
	
});
</script>
<style>
.dashboardposition ::-webkit-scrollbar {
	display:none;
}
.dashboardposition{

}
.dashboarddiv{
	margin-bottom : 15px;
	margin-top: 15px;
	background-color: #ffffff;
	border-radius: 25px;
    padding-bottom: 25px;
}
.kanbanrow{
	margin-left:0px;
	margin-right:0px;
}
.dashboardfile{
 	padding-top: 15px;
    padding-left: 11px;
    padding-right: 11px;

}
.dashboarddivcheck{
	margin-bottom : 15px;
	margin-top: 15px;
	background-color: #ffffff;
	border-radius: 25px;
	padding: 50px;
}
.dashboarddivchart{
	margin-bottom : 15px;
	margin-top: 15px;
	background-color: #ffffff;
	border-radius: 25px;
	padding: 50px;

}
.chartCssGO {
	height: 100% !important;
	width: 100% !important;
}
</style>
<div>
    <div class="row">
        <div class="col-sm-6 dashboardposition" style="min-height: 614px;"><div id="dashboardchart" class="dashboarddivchart"></div></div>
        <div class="col-sm-6 dashboardposition"><div id="dashboardcalendar" class="dashboarddiv"></div></div>
    </div>
    <div class="row kanbanrow">
        <div class="col-sm-10 dashboardposition dashboarddiv" style="min-height: 200px; overflow: hidden;"><div style="min-height: 650px; min-width : 100%; overflow: hidden;"id="dashboardkanban"></div></div>
		<div class="col-sm-2 dashboardposition"><div id="dashboardfiles" class="dashboarddiv dashboardfile" style="min-height: 200px; overflow: hidden;"></div></div>
    </div>
    <div class="row">
        <div class="col-sm-12 dashboardposition"><div id="dashboardchecklist" class="dashboarddivcheck"></div></div>
    </div>
</div>
