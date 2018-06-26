<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>NaverLoginTest</title>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="resources/js/user/kakao.min.js"></script>
</head>
<body>
 ${refresh}
<form method="post" action="./login">
	<input type="hidden" id="userId" name="userId" placeholder="email@domain.com" required="required">
    <input type="hidden" id="password" name="password" placeholder="Password" required="required">
    <button type="submit" id="btnLogin"></button>
</form>
<script>
	var userid = "<%=request.getParameter("userId")%>";
	$('#userId').val(userid);
	$('#password').val('kakaologin');
	$('#btnLogin').trigger('click');
</script>
</body>

</html>
