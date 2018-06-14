<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="resources/js/msg/inviteMsg.js"></script>
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
            <li><a href="#">Delete</a></li>
        </ul>
    </li>
    <li>
    	<a href="#inviteMsg" data-toggle="collapse" aria-expanded="false" onclick="showMsg()">
            <i class="glyphicon glyphicon-envelope"></i>
            Alarm
        </a>
        <ul class="collapse list-unstyled" id="inviteMsg">
            <li><a>
            	<label>RRRRRRRRRRRRRRRRRw</label>
            	<button class="btn-warning">Y</button>
            	<button class="btn-success">N</button>
            </a></li>
            <li><a>
            	<label>18바이트만이하임</label>
            	<button class="btn-warning">Y</button>
            	<button class="btn-success">N</button>
            </a></li><li><a>
            	<label>18바이트만이상입니다</label><br>
            	<button class="btn-warning">Y</button>
            	<button class="btn-success">N</button>
            </a></li>
        </ul>
    </li>
    <li>
        <a href="#">
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
        <a href="#">
            <i class="glyphicon glyphicon-file"></i>
            Files
        </a>
    </li>
    <li>
        <a href="kanban?projectNum=1">
            <i class="glyphicon glyphicon-tasks"></i>
            Kanban
        </a>
    </li>
    <li>
        <a href="#">
            <i class="glyphicon glyphicon-exclamation-sign"></i>
            Trouble Shooting
        </a>
    </li>
    <li>
        <a href="#">
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