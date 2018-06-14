<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="resources/css/kanban/kanban.css">
<link rel="stylesheet" href="resources/css/kanban/jquery.mCustomScrollbar.css">
<script src="resources/js/kanban/kanban.js"></script>
<script src="resources/js/kanban/cardCheckList.js"></script>
<script src="resources/js/kanban/kanbanSocket.js"></script>
<jsp:include page="carddetail.jsp"></jsp:include>

<div class="content-wrapper">
	<div id="mainScreen" class="container-fluid" scrollTop="5px">
		<h2 id='boardTitle'>칸반보드</h2>
		<input type="hidden" id="hiddenProjectNum" value="${projectNum}" > <!-- value값 바꿀 것! -->
		<hr>
		<div id="content-md">
		
		</div>
	</div>
</div>
