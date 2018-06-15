<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="resources/js/msg/inviteMsg.js"></script>
<script src="resources/js/keyUp.js"></script>

<input type="hidden" id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
<div class="sidebar-header">
    <h3>corin2</h3>
    <strong>C2</strong>
</div>

<ul class="list-unstyled components">
    <li class="active">
        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
            <i class="glyphicon glyphicon-user"></i>
            User
        </a>
        <ul class="collapse list-unstyled" id="homeSubmenu">
            <li><a href="content">User Info</a></li>
            <li><a href="#">Profile Modification</a></li>
			<li>
				<form method="post" action="userdelete">
					<a class="btn btn-default" type="submit" value="Login">delete</a>
				</form>
			</li>
		</ul>
    </li>
    <li>
    	<a href="#inviteMsg" data-toggle="collapse" aria-expanded="false" onclick="showMsg()">
            <i class="glyphicon glyphicon-envelope"></i>
            Alarm
        </a>
        <ul class="collapse list-unstyled" id="inviteMsg">
        </ul>
    </li>
    <li>
        <a href="calendar">
             <i class="glyphicon glyphicon-calendar" id="calendaricon"></i>
            Calendar
        </a>
    </li>
    <li>
		<a href="#">
		    <i class="glyphicon glyphicon-th-list" id="checklisticon"></i>
		    Checklist
		</a>
    </li>
    <li>
        <a href="#">
            <i class="glyphicon glyphicon-stats" id="charticon"></i>
            Chart
        </a>
    </li>
    <li>
        <a href="fileUpload">
          <i class="glyphicon glyphicon-file" id="filesicon"></i>
            Files
        </a>
    </li>
    <li>
        <a href="kanban">
             <i class="glyphicon glyphicon-tasks" id="kanbanicon"></i>
            Kanban
        </a>
    </li>
    <li>
        <a href="trouble">
			<i class="glyphicon glyphicon-exclamation-sign" id="troubleshootingicon"></i>
            Trouble Shooting
        </a>
    </li>
    <li>
        <a href="boardList">
            <i class="glyphicon glyphicon-bullhorn"></i>
            Notices
        </a>
    </li>
</ul>

<ul class="list-unstyled CTAs">
    <li><a href="#" class="#">corin2</a></li>
    <li><a href="#" class="#">corin2</a></li>
</ul>

<ul class="list-unstyled components">
    <li>
        <a href="#">
            <i class="glyphicon glyphicon-comment"></i>
            Chatting
        </a>
    </li>
</ul>