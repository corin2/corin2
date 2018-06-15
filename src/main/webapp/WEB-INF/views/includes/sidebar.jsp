<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="resources/js/msg/inviteMsg.js"></script>
<script src="resources/js/msg/msgSocket.js"></script>
<script src="resources/js/keyUp.js"></script>

<input type="hidden" id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
<div class="sidebar-header">
    <h3>corin2</h3>
    <strong>C2</strong>
</div>

<ul class="list-unstyled components">
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum eq null}">
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
		</c:when>
	</c:choose>
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
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum != null}" >
		    <li>
		        <a href="calendar">
		            <i class="glyphicon glyphicon-calendar"></i>
		            Calendar
		        </a>
		    </li>
		    <li>
				<a href="#">
				    <i class="glyphicon glyphicon-th-list"></i>
				    Checklist
				</a>
		    </li>
		    <li>
		        <a href="#">
		            <i class="glyphicon glyphicon-stats"></i>
		            Chart
		        </a>
		    </li>
		    <li>
		        <a href="fileUpload">
		            <i class="glyphicon glyphicon-file"></i>
		            Files
		        </a>
		    </li>
		    <li>
		        <a href="kanban?projectNum=${sessionScope.sessionProjectNum}">
		            <i class="glyphicon glyphicon-tasks"></i>
		            Kanban
		        </a>
		    </li>
		    <li>
		        <a href="trouble">
		            <i class="glyphicon glyphicon-exclamation-sign"></i>
		            Trouble Shooting
		        </a>
		    </li>
		    <li>
		        <a href="boardList">
		            <i class="glyphicon glyphicon-bullhorn"></i>
		            Notices
		        </a>
		    </li>
			<ul class="list-unstyled CTAs">
	    		<li><a href="#" class="#">corin2</a></li>
			</ul>
		    <li>
		        <a href="chatting">
		            <i class="glyphicon glyphicon-comment"></i>
		            Chatting
		        </a>
		    </li>
</ul>
    	</c:when>
	</c:choose>

<ul class="list-unstyled components">
    <li>
        <a href="logout">
            <i class="glyphicon glyphicon glyphicon-log-out"></i>
            Logout
        </a>
    </li>
</ul>