
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>NaverLoginTest</title>
</head>
<body>
 ${refresh}
	 <script>
	 var userid = "<%=request.getParameter("userid")%>";
	 console.log("kakaologin.jsp");
		location.href = "./defaultpage";
	</script>
</body>

</html>
