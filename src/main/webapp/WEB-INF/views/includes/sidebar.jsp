<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>

<script src="resources/js/msg/inviteMsg.js"></script>
<script src="resources/js/msg/msgSocket.js"></script>
<script src="resources/js/keyUp.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<input type="hidden" id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
<div class="sidebar-header">
    <h3>corin2</h3>
    <strong>C2</strong>
</div>
<c:choose>
	<c:when test="${pageContext.request.userPrincipal.name eq null}">
	    <script>
	    	location.href="http://localhost:8090/controller/login.html";
	    </script>
	</c:when>
</c:choose>
<ul class="list-unstyled components">
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum eq null}">
			<se:authorize access="hasRole('ROLE_USER')">
			    <li class="active">
			        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
			            <i class="glyphicon glyphicon-user"></i>
			            User
			        </a>
			        <ul class="collapse list-unstyled" id="homeSubmenu">
			            <li><a href="content">User Info</a></li>
			            <li><a href="#">Profile Modification</a></li>
			            <li><a href="#">Delete</a></li>
			        </ul>
			    </li>
		    </se:authorize>
		    <se:authorize access="hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')">
			    <li>
			        <a href="boardList">
			            <i class="glyphicon glyphicon-bullhorn"></i>
			            Notices
			        </a>
			    </li>
		    </se:authorize>
		    <se:authorize access="hasRole('ROLE_ADMIN')">
		    	<li>
			        <a href="boardList">
			            <i class="glyphicon glyphicon-bullhorn"></i>
			            (통계)
			        </a>
			    </li>
			    <li>
			        <a href="boardList">
			            <i class="glyphicon glyphicon-bullhorn"></i>
						(만든사람들)
			        </a>
			    </li>
		    </se:authorize>
		</c:when>
	</c:choose>
	<se:authorize access="hasRole('ROLE_USER')">
		<li>
	        <a href="project">
	            <i class="glyphicon glyphicon-th-large"></i>
	            Projects
	        </a>
	    </li>
		<li>
	    	<a href="#inviteMsg" data-toggle="collapse" aria-expanded="false" onclick="showMsg()">
	            <i class="glyphicon glyphicon-envelope"></i>
	            Alarm
	        </a>
	        <ul class="collapse list-unstyled" id="inviteMsg">
	        </ul>
	    </li>
	</se:authorize>
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum != null}" >
		    <li>
		        <a class="sidebaricon" href="calendar" id="calendaricon">
		             <i class="glyphicon glyphicon-calendar"></i>
		            Calendar
		        </a>
		    </li>
		    <li>
				<a class="sidebaricon" href="#" id="checklisticon">
				    <i class="glyphicon glyphicon-th-list"></i>
				    Checklist
				</a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="#" id="charticon">
		            <i class="glyphicon glyphicon-stats"></i>
		            Chart
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="fileUpload" id="filesicon">
		          <i class="glyphicon glyphicon-file"></i>
		            Files
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="kanban?projectNum=${sessionScope.sessionProjectNum}" id="kanbanicon">
		            <i class="glyphicon glyphicon-tasks"></i>
		            Kanban
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="trouble?projectNum=${sessionScope.sessionProjectNum}" id="troubleshootingicon">
					<i class="glyphicon glyphicon-exclamation-sign"></i>
		            Trouble Shooting
		        </a>
		    </li>
			<ul class="list-unstyled CTAs">
	    		<li><a href="#" class="#">corin2</a></li>
			</ul>
    	</c:when>
	</c:choose>
</ul>

<se:authorize access="hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')">
	<ul class="list-unstyled components">
		<se:authorize access="hasRole('ROLE_USER')">
			<c:choose>
				<c:when test="${sessionScope.sessionProjectNum != null}" >
					<li>
					    <a href="chatting">
					        <i class="glyphicon glyphicon-comment"></i>
					        Chatting
					    </a>
					</li>
			    </c:when>
			</c:choose>
		</se:authorize>
	    <li>
	        <a href="logout">
	            <i class="glyphicon glyphicon glyphicon-log-out"></i>
	            Logout
	        </a>
	    </li>
	</ul>
</se:authorize>
