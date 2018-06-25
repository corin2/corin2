<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="resources/css/kanban/kanban.css">
<link rel="stylesheet" href="resources/css/kanban/jquery.mCustomScrollbar.css">
<link rel="stylesheet" href="resources/css/checklist/icheck/flat/green.css">
<script src="resources/js/kanban/kanban.js"></script>
<script src="resources/js/kanban/cardCheckList.js"></script>
<script src="resources/js/kanban/kanbanSocket.js"></script>
<jsp:include page="carddetail.jsp"></jsp:include>

<div style="width:100%;">
	<div id="mainScreen" class="container-fluid" scrollTop="5px">
		<h2 id='boardTitle'>칸반보드</h2>
		<hr>
		<div id="content-md">
		
		</div>
	</div>
</div>
