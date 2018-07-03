<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(function(){
		 $("#dashboardcalendar").load("dashboardcalendar?projectNum=${sessionScope.sessionProjectNum}",function(){
			 $('.calendarname').remove();
			 $('.calendarhr').remove();
			 $('.calenbackdiv').css({"padding":"0px"});
		 }).css({"width":"100%" ,"min-height":"600px" , "padding-bottom": "15px" , "overflow" : "scroll"});
		 $("#dashboardchart").load("dashboardchart?projectNum="+sessionProjectNum).css({"width":"100%" ,"padding-bottom": "15px" , "min-height":"600px" , "overflow" : "scroll"});
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
    padding : 15px;
}
.kanbanrow{
	margin-left:0px;
	margin-right:0px;
}
.dashboarddivchart{
	margin-bottom : 15px;
	margin-top: 15px;
	background-color: #ffffff;
	border-radius: 25px;
	padding: 15px;

}
.chartCssGO {
	height: 100% !important;
	width: 100% !important;
}
</style>
<div>
    <div class="row">
        <div class="col-sm-6 dashboardposition" style="min-height:600px;"><div id="dashboardchart" class="dashboarddivchart"></div></div>
        <div class="col-sm-6 dashboardposition" style="min-height:600px;"><div id="dashboardcalendar" class="dashboarddiv"></div></div>
    </div>
    <div class="row kanbanrow">
        <div class="col-sm-12 dashboardposition dashboarddiv" style="min-height: 200px; overflow: hidden;"><div style="min-height: 650px; min-width : 100%; overflow: hidden;"id="dashboardkanban"></div></div>
    </div>
</div>
