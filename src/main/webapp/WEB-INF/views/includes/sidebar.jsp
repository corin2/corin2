<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>

<script src="resources/js/msg/msgSocket.js"></script>
<script src="resources/js/header/headerSocket.js"></script>
<script src="resources/js/sidebar/multiSocket.js"></script>
<script src="resources/js/user/kakao.min.js"></script>
<script src="resources/js/msg/inviteMsg.js"></script>
<script src="resources/js/keyUp.js"></script>
<script src="resources/js/loading/cursor.js"></script>
<link rel="stylesheet" href="resources/css/sidebar/scrollbar.css">
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<input type="hidden" id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
<div class="sidebar-header">
    <img src="resources/images/logo/corin2.PNG"></img>
</div>
<c:choose>
	<c:when test="${pageContext.request.userPrincipal.name eq null}">
	    <script>
	    	location.href="http://localhost:8090/login.html";
	    </script>
	</c:when>
</c:choose>
<ul class="list-unstyled components">
 				<li>
				    <img class="img-circle" id="currentUserProfile" src="resources/images/profile/none.png" width=40 height=40>
				</li>
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum eq null}">
		    <se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')">
			    <li>
			        <a href="boardList?countPerPage=5&blockCount=5&nowPage=1">
			            <i class="glyphicon glyphicon-bullhorn"></i>
			            Notices
			        </a>
			    </li>
		    </se:authorize>
		    <se:authorize access="hasRole('ROLE_ADMIN')">
		    	<li>
			        <a href="adminMain">
			            <i class="glyphicon glyphicon-stats"></i>
			            Statistics
			        </a>
			    </li>
			    <li>
			        <a href="adminUserController">
			            <i class="glyphicon glyphicon-user"></i>
						User Manager
			        </a>
			    </li>
			    <li>
			        <a href="adminMenu">
			            <i class="glyphicon glyphicon-list"></i>
						Menu Manager
			        </a>
			    </li>
			    <li>
			        <a href="adminMail">
			            <i class="glyphicon glyphicon-envelope"></i>
						Mail Manager
			        </a>
			    </li>
			    <li>
			        <a href="adminPeaples">
			            <i class="glyphicon glyphicon-heart"></i>
						Credits
			        </a>
			    </li>
		    </se:authorize>
		</c:when>
	</c:choose>
	<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER')">
		<li>
	        <a href="project">
	            <i class="glyphicon glyphicon-th-large"></i>
	            Projects
	        </a>
	    </li>
	</se:authorize>
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum != null}" >
		    <li>
		    	<a class="sidebaricon" href="leancanvas">
					<i class="glyphicon glyphicon-list-alt"></i>
		            Lean canvas
		        </a>
	   	    </li>
		    <li>
				<a class="sidebaricon" href="checklist" id="checklisticon">
				    <i class="glyphicon glyphicon-th-list"></i>
				    Checklist
				</a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="calendar" id="calendaricon">
		             <i class="glyphicon glyphicon-calendar"></i>
		            Calendar
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
		    <li>
		        <a class="sidebaricon" id="filesicon" href="fileUpload?projectNum=${sessionScope.sessionProjectNum}">
		            <i class="glyphicon glyphicon-file" ></i>
		            Files
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="chart" id="charticon">
		            <i class="glyphicon glyphicon-stats"></i>
		            Chart
		        </a>
		    </li>
    	</c:when>
	</c:choose>
	<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')">
		    <li style="background-color: #333333;">
		        <a onclick="logoutpage()">
		            <i class="glyphicon glyphicon glyphicon-log-out"></i>
		            Logout
		        </a>
		    </li>
	</se:authorize>
</ul>

<script>
	function logoutpage() {
		Kakao.init("");
		Kakao.Auth.logout();
		location.href = 'logout';
	}
	
	$(function() {
		function getCurrentUserProfile() {
			$.ajax({
				type : "post",
				url  : "showUser",
				datatype:"JSON",
				data : {userId : $('#hiddenUserId').val()},
				success : function(data){
					$.each(data, function(index, obj) {
						$('#currentUserProfile').attr("src", profileStorageURL + obj.userProfile);
					});
				}
			});
		}
		
		getCurrentUserProfile();
		
		function profile() {
			$.ajax({
				type : "post",
				url  : "showUser",
				datatype:"JSON",
				data : {userId : $('#hiddenUserId').val()},
				success : function(data){
					$.each(data, function(index, obj) {
						$('#userId').attr("value", obj.userId);
						$('#userName').attr("value", obj.userName);
					});
				}
			});
		}
		
		profile();
		
		$("#currentUserProfile").click(function() {
			if($('.profile').css('display')=="block"){
				$('.profile').animate({width: 'toggle'});
				$('.profileimage').animate({width: 'toggle'});
			}else{
				$('.profileimage').animate({width: 'toggle'});
			}
		});
		$("#reformbutton").click(function(){
			$('.profile').slideToggle();
		});
	});
	
</script>