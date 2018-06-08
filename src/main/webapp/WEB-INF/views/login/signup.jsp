<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript">
$(function(){
	$("#btnCheckUid").click(function(){
		$.ajax({
 			type: "post",
 			url:  "idcheck.htm",
 			data: $('#userId').val(),
 			contentType: "application/json; charset=utf-8",
 		    success:function(data){ 
 		    	console.log(data);
 		    	if(data.trim()=="true"){
 		    		alert("아이디가 중복됩니다.")
 		    		$('#userId').val("");
 		    	}else{
 		    	 	alert("아이디를 사용할 수 있습니다.")
 		    	}
 		     },
 			error: function(){						
 				alert('Error while request..'	);
 			}
 		});
	});
});
</script>
<div id="content">
	<form action="" method="post">
		<h2>회원가입</h2>
		<h3 class="hidden">회원가입 폼</h3>
		<div id="join-form" class="join-form margin-large">
			<dl class="join-form-row">
				<dt class="join-form-title">아이디</dt>
				<dd class="join-form-data">
					<input type="text" id = "userId" name="userId" /> <input id="btnCheckUid"
						class="button" type="button" value="중복확인" />
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">닉네임</dt>
				<dd class="join-form-data">
					<input type="text" name="userName" />
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">비밀번호</dt>
				<dd class="join-form-data">
					<input type="password" name="password" />
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">비밀번호 확인</dt>
				<dd class="join-form-data">
					<input type="password" name="password2" />
				</dd>
			</dl>
		</div>
		<div id="buttonLine">
			<input class="btn-okay button" type="submit" value="가입" />
		</div>
	</form>
</div>
