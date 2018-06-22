<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="resources/css/header/header.css">
<script src="resources/js/header/header.js"></script>

<!-- 프로젝트 정보 -->
<div class="container-fluid">
	<div class="navbar-header">
		<!-- 프로젝트 명, 멤버 리스트 -->
		<div class="navbar-header">
	    	<a class="navbar-brand" id="headerProjectName" href="#">코린이</a>
	    </div>
	    <div class="nav navbar-nav">
	    	<label id="headerProjectMemberProfile">
				<img src="resources/images/profile/none.png" class="img-circle person" width="35" height="35">
			</label>
	    </div>
			
		<!-- 드롭다운 버튼 -->
		<button class="btn btn-default navbar-btn" id="plus" data-toggle="dropdown" style="margin-left: 10px;">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
		<!-- 드롭다운 메뉴 -->
		<ul class="dropdown-menu" id="friend" onclick="notHideAuto(event)" style="width: 300px; height:200px;">
			<li>
				<div class="input-group">
					<div class="form-group">
			   			<input type="email" class="form-control" id="emailSearch" onclick="autoComplete()" onkeypress="if(event.keyCode==13) {memberinvite();}" placeholder="이메일 입력..">
					</div>
					<span class="input-group-btn">
						<input type="hidden" id="thisProjectNum">
						<button class="btn btn-default" type="button" onclick="memberinvite()">
							<span class="glyphicon">&#xe171;</span>
						</button>
					</span>
				</div>
			</li>
		</ul>
    </div>
	
	<!-- 채팅 버튼 -->
    <div class="nav navbar-nav navbar-right">
    	<button class="btn btn-warning navbar-btn" id="showChatting">
    		<span class="glyphicon glyphicon-comment"></span>
    	</button>
    </div>
	
</div>
		
	
<script>
	$(function() {
		$('#showChatting').click(function() {
			// $('.sidebar-chat').toggle();
			$('.sidebar-chat').animate({width: 'toggle'});
		});
	});
</script>
