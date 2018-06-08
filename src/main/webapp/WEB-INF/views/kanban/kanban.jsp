<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>칸반보드</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="resources/css/kanban.css">
<link rel="stylesheet" href="resources/css/jquery.mCustomScrollbar.css">
<script src="resources/js/kanban.js"></script>
<script src="resources/js/keyUp.js"></script>
<script src="resources/js/cardCheckList.js"></script>
<script src="resources/js/cardCheckList2.js"></script>
<jsp:include page="carddetail.jsp"></jsp:include>


</head>
<body>
	<div class="content-wrapper">
		<div id="mainScreen" class="container-fluid" scrollTop="5px">
			<h2 id='boardTitle'>칸반보드</h2>
			<input type="hidden" id="hiddenUserId" value="jin@naver.com" > <!-- value값 바꿀 것! -->
			<input type="hidden" id="hiddenProjectNum" value="1" > <!-- value값 바꿀 것! -->
			<hr>
			<div id="content-md">
			
			</div>
		</div>
	</div>
</body>
</html>