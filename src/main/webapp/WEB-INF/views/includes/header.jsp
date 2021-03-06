<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="resources/css/header/header.css">
<script src="resources/js/header/header.js"></script>

<!-- 프로젝트 정보 -->
<div class="container-fluid-header">
	<c:choose>
		<c:when test="${sessionScope.sessionProjectNum != null}">
		<div class="navbar-header">
			<!-- 프로젝트 명, 멤버 리스트 -->
			<div class="navbar-header">
		    	<b>
		    		<a class="navbar-brand" id="position" href="position?projectNum=${sessionScope.sessionProjectNum}"></a>
		    	</b>
		    </div>
			<!-- 드롭다운 버튼 -->
			<button class="btn btn-default navbar-btn" id="plus" data-toggle="dropdown" style="margin-left: 10px;">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
			<!-- 드롭다운 메뉴 -->
			<ul class="dropdown-menu" id="friend" onclick="notHideAuto(event)">
				<li>
					<div class="input-group">
						<div class="form-group">
				   			<input type="email" class="form-control" id="emailSearch" onclick="autoComplete()" onkeypress="if(event.keyCode==13) {memberinvite();}" placeholder="이메일 입력..">
						</div>
						<span class="input-group-btn">
							<input type="hidden" id="thisProjectNum">
							<button class="btn btn-invitebutton" type="button" onclick="memberinvite()">
								<span class="glyphicon" id="invitebutton">&#xe171;</span>
							</button>
						</span>
					</div>
				</li>
			</ul>
		</div>
		    <div class="nav navbar-nav" id="profileimagebox">
		    	<label id="headerProjectMemberProfile">
					<img src="resources/images/profile/none.png" class="img-circle person" width="35" height="35">
				</label>
		    </div>
		</c:when>
	</c:choose>
	<div class="sidebar-header">
    	<img src="resources/images/logo/corin2.PNG" class="logoCorin2"></img>
	</div>
	<ul class="nav navbar-nav navbar-right menubtn">
		<!-- 메세지 버튼 -->
		<li role="presentation" class="dropdown alramdropdown" onclick="showMsg()">
			<a id="alramicona" href="javascript:;"	class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false" style="padding">
				<img src="/resources/images/icons/alram.png" style = "width : 28px;" id="alramicon">	
			</a>
			<ul id="inviteMsg" class="dropdown-menu list-unstyled msg_list animated fadeInDown" role="menu">
				<!-- 초대메시지 함 -->
			</ul>
		</li>
		
		<!-- 채팅 버튼 -->
		<c:choose>
			<c:when test="${sessionScope.sessionProjectNum != null}">
		    	<li>
			    	<div id="showChatting" class="language-num">
			    	<img src="/resources/images/icons/chatting.png" style = "cursor:pointer; width : 39px;" id="showChatting">	
			    	</div>
			    </li>
		    </c:when>
		</c:choose>
	</ul>
</div>
