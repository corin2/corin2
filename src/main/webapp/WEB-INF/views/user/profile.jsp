<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
<script src="resources/js/board/jquery.fileupload.js"></script>
<script src="resources/js/user/profile.js"></script>
<link rel="stylesheet" href="resources/css/user/profile.css">
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<div id="content" class="profilediv">
	<form action="" method="post">
		<h2>Profile</h2>
		<img class="img-circle" id="recentUserProfile" width="100" height="100">
		<div class="container">
			    <span class="btn btn-success fileinput-button">
			        <i class="glyphicon glyphicon-plus"></i>
			        <span>Add files...</span>
			        <input id="profileupload" type="file" name="files" data-url="profileupdate">
			    </span>
		</div>
		<div id="join-form" class="join-form margin-large">
			<dl class="join-form-row">
				<dt class="join-form-title">아이디</dt>
				<dd class="join-form-data">
					<input type="text" name="userId" id="userId" value="${userdto.userId }" readonly/> 
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">이름</dt>
				<dd class="join-form-data">
					<input type="text" name="userName" id="userName" value="${userdto.userName}"/>
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">비밀번호</dt>
				<dd class="join-form-data">
					<input type="password" name="password" id="password" required="required"/>
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">비밀번호 확인</dt>
				<dd class="join-form-data">
					<input type="password" name="password2" id="password2" required="required"/>
				</dd>
			</dl>
		</div>
		<div id="buttonLine">
			<input class="btn btn-primary btn-okay" type="button" id="profilebutton" value="수정하기" />
		</div>
	</form>
</div>
