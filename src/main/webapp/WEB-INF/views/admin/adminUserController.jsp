<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="resources/js/admin/userManagement.js"></script>
<link rel="stylesheet" href="resources/css/admin/admin.css">
<nav class="navbar navbar-default">
	<div>
		<h1>UserManager</h1>
		<hr>
		<div class="dropdown">
			<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">회원 관리
			<span class="caret"></span></button>
			<ul class="dropdown-menu">
				<li><a onclick="allUser(1, 0, 1)">가입회원</a></li>
				<li><a onclick="allUser(0, 0, 1)">비인증회원</a></li>
				<li><a onclick="allUser(0, 1, 1)">탈퇴회원</a></li>
			</ul>
		</div>
		<hr>
		<div>
			<input type="text" id="searchUser" class="search">&nbsp;
			<span class="glyphicon glyphicon-search" onclick="allUser(3, $(this).parent().children('input').val(), 1)"></span>
		</div>
		<hr>
		<div id="userManagement"></div>
		<ul id="pageChange" class="pagination pagination-lg">
		</ul>
	</div>
</nav>