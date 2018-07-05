/**
    파일명: profile.js
    설   명: 프로필 창에 대한 javascript
    작성일: 2018. 6. 19.
    작성자: 강 진 광
*/
$(function(){
		/**
	     * @함수명 : 비밀번호 수정하기
	     * @작성일 : 2018. 6. 19.
	     * @작성자 : 강진광
	     * @설명 : 첫번째 input tag에 있는 password값을 두번째 input tag에 있는 
	     * 		 password2값과 비교하여 같을 때에만 userid에 맞는 비밀번호를 변경 할 수 있도록 하는 비동기 함수입니다.
	     * @param userid , password, password2
	     **/
		$('#password-button').click(function(){
			if($('#password').val().trim().length >= 3 && $('#password').val() == $('#password2').val()){
			$.ajax({
				url:"userpassupdate",
				type: "post",
				datatype:"JSON",
				data:{userId:$("#userId-profile").val(), 
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
						},
						error: function() {
				            swal({
				                 type: 'error',
				                 title: 'Oops...',
				                 text: 'Something went wrong!',
				                 footer: '<a href>Why do I have this issue?</a>'
				                })
				        }
					});
				},
				error: function() {
		            swal({
		                 type: 'error',
		                 title: 'Oops...',
		                 text: 'Something went wrong!',
		                 footer: '<a href>Why do I have this issue?</a>'
		                })
		        }
			});
			}else if($('#password').val() != $('#password2').val()){
				swal("비밀번호와 비밀번호 확인이 다릅니다.");
			}else{
				swal("비밀번호는 3자이상입니다.");
			}
		});
		/**
	     * @함수명 : 닉네임 변경하기
	     * @작성일 : 2018. 6. 19.
	     * @작성자 : 강진광
	     * @설명 : input tag에 있는 nickname값이 빈문자열이 아니라면 userid에 맞는 닉네임을 변경 할 수 있도록 하는 비동기 함수입니다.
	     * @param userid , nickname
	     **/
		$('#nickname-button').click(function(){
			console.log($('#userName').val().trim().length)
			if($('#userName').val().trim().length >= 3 ){
				$.ajax({
					url:"usernickupdate",
					type: "post",
					datatype:"JSON",
					data:{userId:$("#userId-profile").val(), 
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
								},
								error: function() {
									swal({
										type: 'error',
										title: 'Oops...',
										text: 'Something went wrong!',
										footer: '<a href>Why do I have this issue?</a>'
									})
								}
							});
					},
					error: function() {
			            swal({
			                 type: 'error',
			                 title: 'Oops...',
			                 text: 'Something went wrong!',
			                 footer: '<a href>Why do I have this issue?</a>'
			                })
			        }
				});
			}else{
				swal("닉네임은 3글자 이상 입력해주세요.");
			}
		});
		
		/**
	     * @함수명 : 유저 탈퇴하기
	     * @작성일 : 2018. 6. 19.
	     * @작성자 : 강진광
	     * @설명 : alert창의 confirmbutton을 누른다면 userid에 맞는 user를 삭제 하는 비동기 함수입니다.
	     * @param userid
	     **/
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
						  },
						  error: function() {
							  swal({
				                 type: 'error',
				                 title: 'Oops...',
				                 text: 'Something went wrong!',
				                 footer: '<a href>Why do I have this issue?</a>'
				              })
					      }
					  	});
					  }
					});
		});
	});
	
	