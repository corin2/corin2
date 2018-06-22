<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="resources/js/admin/menuManagement.js"></script>
<link rel="stylesheet" href="resources/css/admin/admin.css">
<nav class="navbar navbar-default">
	<div>
		<h1>MenuManagement</h1>
		<hr>
		<div class="dropdown">
			<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">관리할 메뉴를 선택해주세요
			<span class="caret"></span></button>
			<ul class="dropdown-menu">
				<li><a onclick="skillMenu()">SKILL</a></li>
				<li><a onclick="listMenu()">LIST</a></li>
				<li><a onclick="languageMenu()">LANGUAGE</a></li>
				<li><a onclick="userGradeMenu()">USERGRADE</a></li>
				<li><a onclick="checkListMenuView()">CHECKLIST</a></li>
			</ul>
		</div>
		<hr>
		<div id="menuManagement"></div>
	</div>
</nav>