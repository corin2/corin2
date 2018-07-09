<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
<script src="https://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<script src="resources/js/user/profile.js"></script>
<link rel="stylesheet" href="resources/css/user/profile.css">
<div id="profile-content" class="profilediv block">
	<div id="join-form" class="join-form margin-large">
		<div class="col-sm-8">
			<h6 class="profilewhite">이름</h6>
			<input type="text"  class="form-control profile-name" name="userName" id="userName" onkeypress="if(event.keyCode==13){$('#nickname-button').trigger('click')}" onkeyup="fnChkLength(this, 10)" value="${userdto.userName}"/>
		</div>
		<div class="col-sm-4">
			<input class="btn btn-1a btn-okay btn-profile-button" type="button" id="nickname-button" value="수정하기"/>
		</div>
	</div>
	<se:authorize access="hasRole('ROLE_USER')">
	<div class="join-form margin-large">
			<div class="col-sm-8">
				<h6 class="profilewhite">비밀번호</h6>
				<input type="password"  class="form-control profile-name" name="password" id="password" required="required"/>
			</div>
			<div class="col-sm-4">
			</div>
			<div class="col-sm-8">
				<h6 class="profilewhite">비밀번호 확인</h6>
					<input type="password"  class="form-control profile-name" onkeypress="if(event.keyCode==13){$('#password-button').trigger('click')}" name="password2" id="password2" required="required"/>
			</div>
			<div class="col-sm-4">
				<input class="btn btn-1a btn-okay btn-profile-button" type="button" id="password-button" value="수정하기" />
			</div>
	</div>
	</se:authorize>
	<div class="col-sm-12">
		<input class="btn btn-1a btn-okay btn-profile-delete" type="button" id="delete-button" value="탈퇴하기" />
	</div>
</div>
