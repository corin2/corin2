<!-- loginsuccess.jsp -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Spring Security Example</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<a type="button" class="btn btn-default" href="userupdate">update</a>
	<form method="post" action="userdelete">
		<button class="btn btn-default" type="submit" value="Login">delete</button>
	</form>
	<div class="container">
		<h1>Welcome! ${pageContext.request.userPrincipal.name}! This is
			Login Success Page :)</h1>
		<a href="login" style="color: red">
			${pageContext.request.userPrincipal.name} ·Î±×¾Æ¿ô</a>
	</div>
</body>
</html>