<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<script type="text/javascript">
		var userId = '${userId}';
		alert('가입 감사드립니다. 이메일 인증을 해주세요.');
		window.open('', '_self', ''); // 브라우저창 닫기
		window.close(); // 브라우저 창 닫기
		location.href="http://localhost:8090/controller/login.html"
	</script>