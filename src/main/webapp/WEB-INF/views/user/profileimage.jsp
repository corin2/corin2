<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<script src="resources/js/user/profileimage.js"></script>
<link rel="stylesheet" href="resources/css/user/profile.css">
<div id="profileimage-content" class="profileimagediv">
	<form action="" method="post">
		<h2>Profile</h2>
		<img class="img-circle" id="recentUserProfile" width="100" height="100">
		<div class="container-fluid">
			    <span class="btn btn-success fileinput-button">
			        <i class="glyphicon glyphicon-plus"></i>
			        <span>Add files...</span>
			        <input type="hidden" name="userId"id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
			        <input id="profileimageupdate" type="file" name="files" data-url="profileimageupdate">
			    </span>
		</div>
		<div id="buttonLine">
			<input class="btn btn-primary btn-okay" type="button" id="reformbutton" value="프로필편집하기" />
		</div>
	</form>
</div>
