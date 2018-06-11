<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" rel="stylesheet">
<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js"></script>
<script src= "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script type="text/javascript">
	var idCheck = 0;
	var nickCheck = 0;
	var pwdCheck = 0;
	//아이디 체크하여 가입버튼 비활성화, 중복확인.
	//아이디와 비밀번호가 맞지 않을 경우 가입버튼 비활성화를 위한 변수설정
	function checkId() {
	    var inputed = $('#checkaa').val();
	    
	    console.log(inputed);
	    $.ajax({
	    	type: "post",
 			url:  "idcheck",
 			data: $('#checkaa').val().trim(),
 			contentType: "application/json; charset=utf-8",
 		    success:function(data){ 
	        	console.log(data);
	            if(inputed=="" && data=='true'){
	                $(".signupbtn").prop("disabled", true);
	                $(".signupbtn").css("background-color", "#aaaaaa");
	                $("#checkaa").css("background-color", "#FFCECE");
	                idCheck = 0;
	            } else if (data == 'false') {
	                $("#checkaa").css("background-color", "#B0F6AC");
	                idCheck = 1;
	                if(idCheck==1 && pwdCheck == 1 && nickCheck == 1) {
	                    $(".signupbtn").prop("disabled", false);
	                    $(".signupbtn").css("background-color", "#4CAF50");
	                } 
	            } else if (data == 'true') {
	                $(".signupbtn").prop("disabled", true);
	                $(".signupbtn").css("background-color", "#aaaaaa");
	                $("#checkaa").css("background-color", "#FFCECE");
	                idCheck = 0;
	            } 
	        }
	    });
	}
	//재입력 비밀번호 체크하여 가입버튼 비활성화 또는 맞지않음을 알림.

	function checkPwd() {
		var inputed = $('.pass').val();
		var reinputed = $('#repwd').val();
		console.log(inputed);
		console.log(reinputed);
		$.ajax({
			type : "post",
			url : "passwordcheck",
			data : $('#password').val().trim(),
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				if (reinputed == ""
						&& (inputed != reinputed || inputed == reinputed) && data=='true') {
					$(".signupbtn").prop("disabled", true);
					$(".signupbtn").css("background-color", "#aaaaaa");
					$("#password").css("background-color", "#FFCECE");
					$("#repwd").css("background-color", "#FFCECE");
				} else if (inputed == reinputed && data=='false') {
					$("#password").css("background-color", "#B0F6AC");
					$("#repwd").css("background-color", "#B0F6AC");
					pwdCheck = 1;
					if (idCheck == 1 && pwdCheck == 1 && nickCheck == 1) {
						$(".signupbtn").prop("disabled", false);
						$(".signupbtn").css("background-color", "#4CAF50");
					}
				} else if (inputed != reinputed && data=='true') {
					pwdCheck = 0;
					$(".signupbtn").prop("disabled", true);
					$(".signupbtn").css("background-color", "#aaaaaa");
					$("#repwd").css("background-color", "#FFCECE");
					$("#repwd").css("background-color", "#FFCECE");

				}
			}
		});
	};
	//닉네임 입력하지 않았을 경우 가입버튼 비활성화

	function checkNick() {
		var nickname = $("#nickname").val();
		console.log(nickname);
		$.ajax({
			type : "post",
			url : "nickcheck",
			data : $('#nickname').val().trim(),
			contentType : "application/json; charset=utf-8",
			success : function(data) {
                if(nickname=="" && data=='true') {
                    $(".signupbtn").prop("disabled", true);
                    $(".signupbtn").css("background-color", "#aaaaaa");
                    $("#nickname").css("background-color", "#FFCECE");
                    nickCheck = 0;
                } else if (data == 'false') {
                    $("#nickname").css("background-color", "#B0F6AC");
                    nickCheck = 1;
                    if(nickCheck ==1 && pwdCheck == 1) {
                        $(".signupbtn").prop("disabled", false);
                        $(".signupbtn").css("background-color", "#4CAF50");
                    } 
                } else if (data == 'true') {
                    $(".signupbtn").prop("disabled", true);
                    $(".signupbtn").css("background-color", "#aaaaaa");
                    $("#nickname").css("background-color", "#FFCECE");
                    nickCheck = 0;
                } 
            }
        });

	}
	/*캔슬버튼 눌렀을 눌렀을시 인풋박스 클리어
	$(".cancelbtn").click(function(){
	        $(".id").val(null);
	        $(".pass").val('');
	        $(".signupbtn").prop("disabled", true);
	        $(".signupbtn").css("background-color", "#aaaaaa");
	});*/

	$(function() {
		// validation
		$.validator.addMethod("regx", function(value, element, regexpr) {
			return regexpr.test(value);
		});

		$('#validation').validate({
			rules : {
				userId : {
					required : true,
					email : true,
				},
				userName : {
					required : true,
					rangelength : [ 3, 10 ],
					regx : /^[a-z|0-9|A-Z|ㄱ-ㅎ|가-힣]+$/
				},
				password : {
					required : true,
					rangelength : [ 3, 20 ],
					regx : /^[a-z|0-9]+$/
				},
				password2 : {
					required : true,
					rangelength : [ 3, 20 ],
					equalTo : '#password'
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
					equalTo : "비밀번호가 일치하지않습니다."
				}

			}
		});

	});
</script>
<div id="content">
	<form id="validation" action="signup" method="post">
		<h2>회원가입</h2>
		<div>
			<input type="email" class="form-control id" name="userId"
				placeholder="Email" oninput="checkId()" id="checkaa" autofocus>
		</div>
		<div>
			<input type="password" class="form-control pass" name="password" id="password"
				placeholder="Password" oninput="checkPwd()">
		</div>
		<div>
			<input type="password" class="form-control pass" name="password2"
				placeholder="Confirm Password" id="repwd" oninput="checkPwd()">
		</div>
		<div>
			<input type="text" class="form-control nickname" name="userName"
				id="nickname" placeholder="Your Nickname" oninput="checkNick()"
				autofocus>
		</div>
		<div>
			<input type="submit" class="form-control btn btn-primary signupbtn"
				disabled="disabled" value="sign up"/>
		</div>
	</form>
</div>
