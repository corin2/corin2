<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>NaverLoginTest</title>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
</head>
<body>
 ${refresh}
<form method="post" action="./login">
	<input type="hidden" id="userId" name="userId" value="${user.userId}" placeholder="email@domain.com" required="required">
    <input type="hidden" id="password" name="password" value="${user.password}" placeholder="Password" required="required">
    <button type="submit" id="btnLogin"></button>
</form>
<script>
	$('#btnLogin').trigger('click');
</script>
</body>

</html>
