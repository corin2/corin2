<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<link rel="stylesheet" href="resources/css/project/project.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="resources/css/kanban.css">
<link rel="stylesheet" href="resources/css/jquery.mCustomScrollbar.css">
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<script src="resources/js/project/project.js"></script>
<jsp:include page="ProjectDetail.jsp"></jsp:include>

<nav class="navbar navbar-default">
		<div id="search">
		<input type="text" class="search">&nbsp;<span class="glyphicon glyphicon-search"></span>
		</div>
</nav>
<nav class="navbar navbar-default">
		<div id="bookmark">
		<h1>즐겨찾기</h1>
		<hr>
		</div>
</nav>

<nav class="navbar navbar-default">
	<input type="hidden" id="HiddenUserId" value="jin@naver.com" > <!-- value값 바꿀 것! -->
	<div id="project">
		<h1>프로젝트<img src="https://png.icons8.com/ios/50/000000/plus.png" onclick="projectDetailView()" style="float:right;" data-toggle="modal" data-target="#myModal2"></h1>
		<hr>
		<div id="projectbox">
		</div>
	</div>
</nav>