<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
	$(function(){
		$('#button').click(function(){
			if($('#password').val() == $('#password2').val()){
			$.ajax({
				url:"userupdate",
				type: "post",
				datatype:"JSON",
				data:{userId:$("#userId").val(), userName:$("#userName").val(),password:$("#password").val()},
				success:function(data){
					alert("수정하기에 성공하였습니다.");
					location.href="project.project";
				}
			});
			}else{
				alert("비밀번호와 비밀번호 확인이 다릅니다.")
			}
		});
	});
	
</script>
<script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
<script src="resources/js/board/jquery.iframe-transport.js"></script>
<script src="resources/js/board/jquery.fileupload.js"></script>
<script src="resources/js/board/myuploadfunction.js"></script>  
<link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />

<div id="content">
	<form action="" method="post">
		<h2>수정하기</h2>
		<h3 class="hidden">방문페이지 로그</h3>
		
		<h3 class="hidden">수정하기 폼</h3>
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
			<div class="container">
				<input id="fileupload" type="file" name="files[]" data-url="upload"  multiple>
				<div id="dropzone" class="fade well" style="width: 300px;height: 300px">Drop files here</div>
				<div id="dropzonediv">
				</div>
			</div>
		</div>
		<div id="buttonLine">
			<input class="btn-okay button" type="button" id="button" value="수정하기" />
		</div>
	</form>
</div>
