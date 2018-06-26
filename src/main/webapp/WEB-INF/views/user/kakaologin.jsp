<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>NaverLoginTest</title>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
</head>
<body>
 ${refresh}
<form id="form"method="post" action="./login">
	<input class="text" type="text" id="userId" name="userId" placeholder="email@domain.com" required="required">
    <input class="text" type="password" id="password" name="password" placeholder="Password" required="required">
    <button class="btn btn-default btn-block" type="submit" id="btnLogin" value="Login">Login</button>
</form>
	 <script>
	 var userid = "<%=request.getParameter("userId")%>";
	 $('#userId').val(userid);
	 $('#password').val('kakaologin');
	 $('#btnLogin').trigger('click');
	</script>
</body>

</html>
