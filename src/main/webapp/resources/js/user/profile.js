	$(function(){
		//비밀번호 변경하기
		$('#password-button').click(function(){
			if($('#password').val() != "" && $('#password').val() == $('#password2').val()){
			$.ajax({
				url:"userpassupdate",
				type: "post",
				datatype:"JSON",
				data:{userId:$("#userId").val(), 
					  password:$("#password").val(), 
					  },
				success:function(data){
					swal("비밀번호 수정하기에 성공하였습니다.");
					$.ajax({
						type : "post",
						url  : "showUser",
						datatype:"JSON",
						data : {userId : $('#hiddenUserId').val()},
						success : function(data){
							$.each(data, function(index, obj) {
								$('#password').val("");
								$('#password2').val("");
							});
						}
					});
				}
			});
			}else if($('#password').val() == ""){
				swal("비밀번호를 입력해주세요.");
			}
				else{
				swal("비밀번호와 비밀번호 확인이 다릅니다.");
			}
		});
		//닉네임 변경하기
		$('#nickname-button').click(function(){
			if($('#userName').val() != "" ){
				$.ajax({
					url:"usernickupdate",
					type: "post",
					datatype:"JSON",
					data:{userId:$("#userId").val(), 
						  userName:$("#userName").val()},
					success:function(data){
						swal({text:"닉네임 수정하기에 성공하였습니다."});
						$.ajax({
							type : "post",
							url  : "showUser",
							datatype:"JSON",
							data : {userId : $('#hiddenUserId').val()},
							success : function(data){
								$.each(data, function(index, obj) {
									$('#userId').attr("value", obj.userId);
									$('#userName').attr("value", obj.userName);
								});
							}
						});
					}
				});
			}else if($('#userName').val() == ""){
				swal("닉네임을 입력해주세요.");
			}
		});
		
		// user delete
		$('#delete-button').click(function(){
			swal({
				type: "warning",
				text: "정말로 탈퇴하시겠습니다?.",
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'delete',
			    showCancelButton: true
			}).then((result) => {
				  if (result.value) {
					  $.ajax({
						  type: "post",
						  url:  "userdelete",
						  data: $("#userId").val(),
						  contentType: "application/json; charset=utf-8",
						  success:function(data){ 
							  swal({
								  text: "삭제가 완료 되었습니다."
							  }).then((willDelete) => {
								  location.href = "login.html";
							  });
						  }
					  	});
					  }
					});
		});
	});
	
	