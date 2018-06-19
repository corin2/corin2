<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">


<script src="resources/js/msg/inviteMsg.js"></script>
<script src="resources/js/msg/msgSocket.js"></script>
<script src="resources/js/keyUp.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> 
<script src="resources/js/header/headerSocket.js"></script>

<input type="hidden" id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >

<div class="navbar nav_title" style="border: 0;">
  <a href="home" class="site_title"><i class="fa fa-child"></i> <span>corin2</span></a>
</div>
<div class="clearfix"></div>

<!-- menu prile quick info -->
<div class="profile">
  <div class="profile_pic">
    <img src="https://i.pinimg.com/236x/7b/5c/7a/7b5c7a5b34131d5c6395470e08f9a61c--star-wallpaper-cartoon-wallpaper.jpg" alt="..." class="img-circle profile_img">
  </div>
  <div class="profile_info">
    <span>Welcome,</span>
    <h2>corin2</h2>
  </div>
</div>
<!-- /menu prile quick info -->

<br />

<!-- sidebar menu -->
<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

  <div class="menu_section">
    <h3>General</h3>
    <ul class="nav side-menu">
      <li><a><i class="fa fa-user"></i> User <span class="fa fa-chevron-down"></span></a>
        <ul class="nav child_menu" style="display: none">
          <li><a href="#">User Info</a>
          </li>
          <li><a href="#">Profile Modification</a>
          </li>
          <li><a href="#">Delete</a>
          </li>
        </ul>
      </li>
      <li>
	      <a href="project">
	      <i class="fa fa-book"></i> Projects </a>
      </li>
      <li>
	      <a href="calendar" id="calendaricon">
	      <i class="fa fa-calendar"></i> Calendar </a>
      </li>
      <li>
	      <a href="#">
	      <i class="fa fa-check-square-o"></i> Checklist </a>
      </li>
      <li>
	      <a href="chart">
	      <i class="fa fa-pie-chart"></i> Chart </a>
      </li>
      <li>
	      <a href="fileUpload" id="filesicon">
	      <i class="fa fa-file-o"></i> Files </a>
      </li>
      <li>
	      <a href="kanban?projectNum=${sessionScope.sessionProjectNum}" id="kanbanicon">
		   <i class="fa fa-tasks"></i> Kanban </a>
      </li>
      <li>
	      <a href="trouble" id="troubleshootingicon">
	      <i class="fa fa-exclamation-circle"></i> Trouble Shooting </a>
      </li>
      <li><a href="boardList"><i class="fa fa-thumb-tack"></i> Notice </a>
      </li>
      <li>
	      <a href="chatting" id="chattingicon">
	      <i class="fa fa-comments-o"></i> Chatting </a>
      </li>
    </ul>
  </div>
</div>
<!-- /sidebar menu -->

<!-- menu footer buttons -->
<div class="sidebar-footer hidden-small">
  <a data-toggle="tooltip" data-placement="top" title="Settings">
    <span class="fa fa-cog" aria-hidden="true"></span>
  </a>
  <a data-toggle="tooltip" data-placement="top" title="FullScreen">
    <span class="fa fa-expand" aria-hidden="true"></span>
  </a>
  <a data-toggle="tooltip" data-placement="top" title="Lock">
    <span class="fa fa-lock" aria-hidden="true"></span>
  </a>
  <a data-toggle="tooltip" data-placement="top" title="Logout">
    <span class="fa fa-sign-out" aria-hidden="true"></span>
  </a>
</div>
<!-- /menu footer buttons -->
