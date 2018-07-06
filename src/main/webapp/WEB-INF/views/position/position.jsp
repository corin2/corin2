<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(function(){
	//팀원이 아닌사람이 url로 치고 들어오면 되돌아가기
	if('null' == "<%=(String)session.getAttribute("sessionProjectNum")%>"){
		location.href = getContextPath()+'/project';
	}
	
	 $("#dashboardcalendar").load("dashboardcalendar?projectNum=${sessionScope.sessionProjectNum}",function(){
		 $('.calendarname').remove();
		 $('.calendarhr').remove();
		 $('.calenbackdiv').css({"padding":"0px"});
	 }).css({"width":"100%" ,"min-height":"660px" , "padding-bottom": "15px" , "overflow" : "scroll"});
	 $("#dashboardchart").load("dashboardchart?projectNum="+sessionProjectNum,function(){
		 $('.chartbackdiv').css({"min-height":"600px"})
	 }).css({"width":"100%" ,"padding-bottom": "15px" , "min-height":"600px" , "overflow" : "scroll"});
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
        <div class="col-sm-6 dashboardposition" style="min-height:660px;"><div id="dashboardcalendar" class="dashboarddiv"></div></div>
    </div>
    <div class="row kanbanrow">
        <div class="col-sm-12 dashboardposition dashboarddiv" style="min-height: 200px; overflow: hidden;"><div style="min-height: 650px; min-width : 100%; overflow: hidden;"id="dashboardkanban"></div></div>
    </div>
</div>
