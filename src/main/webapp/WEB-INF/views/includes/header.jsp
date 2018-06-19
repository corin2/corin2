<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
	.dropdown-menu {
		z-index: 1100;
	}
</style>
	
<script src="resources/js/header/header.js"></script>

<header>
	<nav class="navbar navbar-left navbar-default navbar-user">
		<div class="navbar-header">
			<label class="navbar-brand" id="headerProjectName" >코린이</label>
			<label id="headerProjectMemberProfile" >
				<img src="resources/images/profile/nogon.JPG" class="img-circle person" width="30" height="30">
			</label>
			<div class="dropdown"  style="float:right; margin-top:10px; cursor: pointer;">
				<button aria-expanded="true" type="button" id="plus" class="btn btn-default"  data-toggle="dropdown" style="margin: 0px 0px 10px 30px;">
					<span class="glyphicon glyphicon-plus"></span>
				</button>
				<ul class="dropdown-menu" id="friend" onclick="notHideAuto(event)" style="width: 300px; height:200px;">
					<li><div class="input-group">
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
		</div>
	</nav>
	<nav class="navbar-right">
		<button type="button" class="btn btn-info" id="showChatting">
			<span class="glyphicon glyphicon-comment"></span>
		</button>
	</nav>
</header>
<script>
	$(function() {
		/* $('#showChatting').click(function() {
			$('.sidebar-chat').toggleClass("sidebar-right-open");
		}); */
		$('#showChatting').click(function() {
			// $('.sidebar-chat').toggle();
			$('.sidebar-chat').animate({width: 'toggle'});
		});
	});
</script>
