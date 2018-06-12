<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script src="resources/js/header/header.js"></script>
<!-- Compiled and minified CSS -->
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"> -->
<!-- Compiled and minified JavaScript -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script> -->
<header>
	<nav class="navbar navbar-default">
		<div class="navbar-header">
			<label class="navbar-brand" id="headerProjectName" >코린이</label>
			<label id="headerProjectMemberProfile" >
				<img src="resources/profile/nogon.JPG" class="img-circle person" width="30" height="30">
			</label>
			<div class="dropdown"  style="float:right; margin-top:10px; cursor: pointer;">
				<button type="button" id = "plus" class="btn btn-default"  data-toggle="dropdown" style="margin: 0px 0px 10px 30px;">
					<span class="glyphicon glyphicon-plus" ></span> 멤버 초대
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
</header>