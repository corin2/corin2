<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
  <title>corin2</title>
  <meta charset="utf-8">
  <!-- 모바일 반응형을 위한 viewport 설정 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS 링크 -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <!-- CSS 세부설정 변경을 위한 external CSS 링크 -->
  <link rel="stylesheet" type="text/css" href="resources/css/sidebar/sidebar.css">
  <!-- 페이지 로딩 CSS 링크 -->
  <link rel="stylesheet" type="text/css" href="resources/css/loading/fakeLoader.css">
  
  <style>
    /* 사이드바 */
   	#sidebar {
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    z-index: 100;
	    display: block;
	    overflow: hidden;
	    height: auto;
  	}
  	
  	/* 헤더 */
  	#header {
  		position: fixed;
  		margin-left: 80px;
  		padding: 5px 5px;
  		top: 0;
  		left: 0;
  		right: 0;
  		z-index: 100;
  		display: block;
  		height: 60px;
  		background-color: #ededed;
  		box-shadow: 0 2px 2px rgba(12,13,14,0.2);
  	}
  	
  	/* 컨텐츠 */
  	#content {
  	    position: relative;
	    margin-left: 80px;
	    margin-top: 60px;
	    padding-left: 20px;
	    padding-top: 20px;
  	}
  	
  	/* header 배경색 */
  	.navbar-user {
  	    padding: 0px 30px 0px 0px;
  		background-color: #ededed;
  	}
  	
  	/* 채팅 사이드바 */
  	.sidebar-chat {
  		position: fixed;
  		margin-top: 60px;
  		top: 0;
	    right: 0;
	    bottom: 0;
	    display: none;
	    /* overflow: hidden; */
	    height: auto;
  		/* border: 3px solid red; */
	    z-index: 200;
	    width: 420px;
	    height: 100%
  	}
  </style>

  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <!-- Bootstrap JavaScript 파일 -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!-- External JavaScript 파일: index.js -->
  <%-- <script src="${pageContext.request.contextPath}/js/index.js"></script> --%>
  
</head>
<body>
	<div class="wrapper">
		<!-- Sidebar Holder -->
		<nav id="sidebar" class="active">
			<!-- sidebar 영역 -->
			<tiles:insertAttribute name="sidebar" />
		</nav>
		
		<nav class="navbar navbar-default" id="header">
			<c:choose>
				<c:when test="${sessionScope.sessionProjectNum != null}">
					<!-- Header 영역 -->
					<tiles:insertAttribute name="header" />
				</c:when>
			</c:choose>
		</nav>
		
		<!-- Page Content Holder -->
		<div id="content">
			<!-- Content 영역 -->
			<tiles:insertAttribute name="content" />
		</div>
		<se:authorize access="hasRole('ROLE_USER')">
			<div class="sidebar-chat">
				<!-- Chatting 영역 -->
				<tiles:insertAttribute name="chatting" />
			</div>
		</se:authorize>
	</div>
	
	<!-- 페이지 로딩 -->
	<div id="fakeloader"></div>
	
	<script src="resources/js/loading/fakeLoader.js">
	
	<script>
		var sessionProjectNum = "<%=(String)session.getAttribute("sessionProjectNum")%>";
		$("#fakeloader").fakeLoader();
	</script>        
</body>
</html>