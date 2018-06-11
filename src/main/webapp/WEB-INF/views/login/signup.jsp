<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src= "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script type="text/javascript">
$(function(){
	$("#submit").click(function(){
		$.ajax({
 			type: "post",
 			url:  "idcheck",
 			data: $('#userId').val(),
 			contentType: "application/json; charset=utf-8",
 		    success:function(data){ 
 		    	console.log(data);
 		    	if(data.trim()=="true"){
 		    		alert("아이디가 중복됩니다.")
 		    		console.log(data.trim());
 		    		$('#userId').val("");
 		    	}else{
 		    		console.log(data.trim());
 		    		$('#submit').attr("type","submit");
 		    		$('#validation').submit();
 		    	}
 		     },
 			error: function(){						
 				alert('이메일을 입력해주세요');
 				console.log(data.trim());
 				
 			}
 		});
	});
	
 	 // validation
		$.validator.addMethod("regx",
				function(value, element, regexpr) {
					return regexpr.test(value);
				}
		);

		$('#validation')
		.validate(
				{
					rules : {
						userId : {
							required : true,
							email: true,
						},
						userName : {
							required : true,
							rangelength : [ 3, 10 ],
							regx : /^[a-z|0-9|A-Z|ㄱ-ㅎ|가-힣]+$/  
						},
						password : {
							required : true,
							rangelength : [ 3, 20 ],
							regx :/^[a-z|0-9]+$/ 
						},
						password2 : {
							required : true,
							rangelength : [ 3, 20 ],
							equalTo: '#password'
						},
						
					},
					messages : {
						userId : {
							required : "아이디를 입력해주세요.",
							email : "아이디는 이메일 형식입니다."
						},
						userName : {
							required : "닉네임을 입력해주세요.",
							rangelength : $.validator.format("닉네임 글자수는 3~10자까지 입니다."),
							regx : "특수문자는 사용할 수 없습니다."
						},
						password : {
							required : "비밀번호를 입력해주세요.",
							rangelength : $.validator.format("암호의 글자수는 3~20자까지 입니다."),
							regx : "암호는 영문자와 숫자만 가능합니다.!!!"
						},
						password2 : {
							required : "비밀번호 확인을 해주세요.",
							rangelength : $.validator.format("암호의 글자수는 3~20자까지 입니다."),
							equalTo:"비밀번호가 일치하지않습니다."
						}
						
					}
				});
		
		
		
		
});
</script>
<div id="content">
	<form id="validation" method="post" action="signup">
		<h2>회원가입</h2>
		<h3 class="hidden">회원가입 폼</h3>
		<div id="join-form" class="join-form margin-large">
			<dl class="join-form-row">
				<dt class="join-form-title">아이디</dt>
				<dd class="join-form-data">
					<input type="text" id = "userId" name="userId" /> 
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">닉네임</dt>
				<dd class="join-form-data">
					<input type="text" id="userName" name="userName" />
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">비밀번호</dt>
				<dd class="join-form-data">
					<input type="password" id="password" name="password" />
				</dd>
			</dl>
			<dl class="join-form-row">
				<dt class="join-form-title">비밀번호 확인</dt>
				<dd class="join-form-data">
					<input type="password" id="password2" name="password2" />
				</dd>
			</dl>
		</div>
		<div id="buttonLine">
			<input class="btn btn-default" id="submit" type="button" value="sign up"/>
		</div>
	</form>
</div>
