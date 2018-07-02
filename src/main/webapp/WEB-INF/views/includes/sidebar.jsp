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
			            <img src="/resources/images/icons/announce.png" style = "width : 28px;"><br>
			            Notices
			        </a>
			    </li>
		    </se:authorize>
		    <se:authorize access="hasRole('ROLE_ADMIN')">
		    	<li>
			        <a href="adminMain">
			            <img src="/resources/images/icons/statistics.png" style = "width : 28px;"><br>
			            Statistics
			        </a>
			    </li>
			    <li>
			        <a href="adminUserController">
			            <img src="/resources/images/icons/usermanager.png" style = "width : 28px;"><br>
						User Manager
			        </a>
			    </li>
			    <li>
			        <a href="adminMenu">
			            <img src="/resources/images/icons/manumanager.png" style = "width : 28px;"><br>
						Menu Manager
			        </a>
			    </li>
			    <li>
			        <a href="adminMail">
			            <img src="/resources/images/icons/mailmanager.png" style = "width : 28px;"><br>
						Mail Manager
			        </a>
			    </li>
			    <li>
			        <a href="adminPeaples">
			            <img src="/resources/images/icons/credits.png" style = "width : 28px;"><br>
						Credits
			        </a>
			    </li>
		    </se:authorize>
		</c:when>
	</c:choose>
	<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER')">
		<li>
	        <a href="project">
	            <img src="/resources/images/icons/project.png" style = "width : 28px;"><br>
	            Projects
	        </a>
	    </li>
	</se:authorize>
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum != null}" >
		    <li>
		    	<a class="sidebaricon" href="leancanvas">
					<img src="/resources/images/icons/leancanvas.png" style = "width : 28px;"><br>
		            Lean canvas
		        </a>
	   	    </li>
		    <li>
				<a class="sidebaricon" href="checklist" id="checklisticon">
				    <img src="/resources/images/icons/checklist.png" style = "width : 28px;"><br>
				    Checklist
				</a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="calendar" id="calendaricon">
		               <img src="/resources/images/icons/calendar.png" style = "width : 28px;"><br>
		            Calendar
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="kanban?projectNum=${sessionScope.sessionProjectNum}" id="kanbanicon">
		            <img src="/resources/images/icons/kanban.png" style = "width : 28px;"><br>
		            Kanban
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="trouble?projectNum=${sessionScope.sessionProjectNum}" id="troubleshootingicon">
					<img src="/resources/images/icons/troubleshooting.png" style = "width : 28px;"><br>
		            Trouble Shooting
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" id="filesicon" href="fileUpload?projectNum=${sessionScope.sessionProjectNum}">
		            <img src="/resources/images/icons/files.png" style = "width : 28px;"><br>
		            Files
		        </a>
		    </li>
		    <li>
		        <a class="sidebaricon" href="chart" id="charticon">
		            <img src="/resources/images/icons/chart.png" style = "width : 28px;"><br>
		            Chart
		        </a>
		    </li>
    	</c:when>
	</c:choose>
	<se:authorize access="hasRole('ROLE_AUTH') or hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')">
		    <li style="background-color: #333333;">
		        <a onclick="logoutpage()">
		            <img src="/resources/images/icons/exit.png" style = "width : 28px;"><br>
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