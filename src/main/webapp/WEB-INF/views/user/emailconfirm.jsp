<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2"></script>
<style>
.swal-overlay {
			  background-color: rgb(86,98,112);
			  }
</style>
</head>
<body>
	<script type="text/javascript">
		swal({
		  title: "인증성공",
		  text: "이메일 인증에 성공하셨습니다. 로그인을 해주세요",
		  type: "success",
		}).then((willDelete) => {
			window.open('', '_self', ''); // 브라우저창 닫기
			window.close(); // 브라우저 창 닫기
		});
	</script>
</body>
</html>
