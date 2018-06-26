<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<script src="resources/js/user/profileimage.js"></script>
<link rel="stylesheet" href="resources/css/user/profile.css">
<div id="profileimage-content" class="profileimagediv block">
		<form action="" method="post">
			<div class="container-fluid profileimageclass">
			<h2 class="subwhite">Profile</h2>
			<img class="img-circle" id="recentUserProfile" width="100" height="100">
			</div>
			<h4 class="subwhite profilemargintop">${pageContext.request.userPrincipal.name}</h4>
		    <span class="btn btn-addfile fileinput-button">
		        <span>Add files...</span>
	        	<input type="hidden" id="userId-profile" name="userId" value="${pageContext.request.userPrincipal.name}" >
		        <input id="profileimageupdate" type="file" name="files" data-url="profileimageupdate">
		    </span>
			<i id="reformbutton" class="glyphicon glyphicon-plus profile-plus"></i>
		</form>
</div>