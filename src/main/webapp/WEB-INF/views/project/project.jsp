<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<link rel="stylesheet" href="resources/css/project/project.css">
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<script src="resources/js/project/project.js"></script>

<link rel="stylesheet" href="resources/css/checklist/icheck/flat/green.css">
<jsp:include page="ProjectDetail.jsp"></jsp:include>
<div class="container">
<div class="navbar navbar-default">
	<div id="search">
	<h2><input type="text" id="searchProject" class="search" placeholder="프로젝트명을입력하세요" onclick="autoCompleteProject()" onkeypress="if(event.keyCode==13) {searchColorView();}">&nbsp;<span class="glyphicon glyphicon-search" onclick="searchColorView()"></span></h2>
	<hr>
	<div id="searchBox">
	</div>
	</div>
</div>
<div class="navbar navbar-default">
	<div id="bookmark">
	<h1>즐겨찾기</h1>
	<hr>
	<div id="bookmarkbox">
	</div>
	</div>
</div>

<div class="navbar navbar-default">
	<div id="project">
		<h1>프로젝트</h1>
		<hr>
		<div id="projectbox">
		</div>
	</div>
</div>
</div>