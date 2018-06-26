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

  <!-- [css] Bootstrap CDN -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <!-- [css] font-awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- [css] 레이아웃 -->
  <link rel="stylesheet" type="text/css" href="resources/css/layout/layout.css">
  <!-- [css] 사이드바 -->
  <link rel="stylesheet" type="text/css" href="resources/css/sidebar/sidebar.css">
  <!-- [css] 페이지 로딩 -->
  <link rel="stylesheet" type="text/css" href="resources/css/loading/fakeLoader.css">

  <!-- js파일 순서 변경하지말것! 순서 중요! -->
  <!-- [js] jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <!-- [js] jQuery ui widget -->
  <script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
  <!-- [js] Bootstrap 3 -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!-- [js] fileupload -->
  <script src="resources/js/board/jquery.fileupload.js"></script>
  <!-- External JavaScript 파일: index.js -->
  <%-- <script src="${pageContext.request.contextPath}/js/index.js"></script> --%>
  	<script type="text/javascript">
		var sessionProjectNum = "<%=(String)session.getAttribute("sessionProjectNum")%>";
	</script>   
</head>
<body>
	<!-- 페이지 로딩 -->
	<div id="fakeloader"></div>
	
	<!-- 레이아웃 -->
	<div class="wrapper">
		<!-- Sidebar Holder -->
		<nav id="sidebar" class="active">
			<!-- sidebar 영역 -->
			<tiles:insertAttribute name="sidebar" />
		</nav>
		<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER')">
			<div class="profile">
				<!-- profile -->
				<tiles:insertAttribute name="profile" />
			</div>
		</se:authorize>
		<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER')">
			<div class="profileimage">
				<!-- profile -->
				<tiles:insertAttribute name="profileimage" />
			</div>
		</se:authorize>
		
		<nav class="navbar navbar-default" id="header">
			<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER')">
				<!-- Header 영역 -->
				<tiles:insertAttribute name="header" />
			</se:authorize>
		</nav>
		
		<!-- Page Content Holder -->
		<div id="content">
			<!-- Content 영역 -->
			<tiles:insertAttribute name="content" />
		</div>
		<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER')">
			<div class="sidebar-chat">
				<!-- Chatting 영역 -->
				<tiles:insertAttribute name="chatting" />
			</div>
		</se:authorize>
		
	</div>

	<!-- 페이지 로딩 -->
	<!-- <script src="resources/js/loading/fakeLoader.js"></script> -->
	
	<script>
		var sessionProjectNum = "<%=(String)session.getAttribute("sessionProjectNum")%>";
		/* $("#fakeloader").fakeLoader({
			zIndex: '3999',
			bgColor:"rgba(51, 102, 153, 0.2)",
		}); */
	</script>        
</body>
</html>