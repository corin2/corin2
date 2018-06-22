<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<script src="resources/js/user/profile.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2"></script>
<link rel="stylesheet" href="resources/css/user/profile.css">
<div id="profile-content" class="profilediv">
	<form action="" method="post">
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
			<div id="buttonLine">
				<input class="btn btn-primary btn-okay" type="button" id="nickname-button" value="수정하기" />
			</div>
		</div>
	</form>
	<form>
		<div>
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
			<div id="buttonLine">
				<input class="btn btn-primary btn-okay" type="button" id="password-button" value="수정하기" />
			</div>
		</div>
	</form>
	<input class="btn btn-primary btn-okay" type="button" id="delete-button" value="탈퇴하기" />
</div>
