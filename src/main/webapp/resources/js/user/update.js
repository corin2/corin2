	$(function(){
			$.ajax({
				type : "post",
				url  : "showUser",
				datatype:"JSON",
				data : {userId : $('#hiddenUserId').val()},
				success : function(data){
					$.each(data, function(index, obj) {
						$('#recentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
					});
				}
			});
		
	    $('#fileupload').fileupload({
	        dataType: 'json',
	        add: function(e, data){
                var uploadFile = data.files[0];
                var isValid = true;
                if (!(/png|jpe?g|gif|svg/i).test(uploadFile.name)) {
                    alert('png, jpg, gif 만 가능합니다');
                    isValid = false;
                }
                if (isValid) {
                    data.submit();
                }
	        },
	        done: function (e, data) {
	        	console.log(data.result);
	        	$.ajax({
					type : "post",
					url  : "showUser",
					datatype:"JSON",
					data : {userId : $('#hiddenUserId').val()},
					success : function(data){
						$.each(data, function(index, obj) {
							$('#recentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
						});
					}
				});
	        },
	    }).on('fileuploadfail', function (e, data) {
	    	alert("형식이 맞지 않습니다.")
	    });
		
		$('#button').click(function(){
			if($('#password').val() != "" && $('#password').val() == $('#password2').val()){
			$.ajax({
				url:"userupdate",
				type: "post",
				datatype:"JSON",
				data:{userId:$("#userId").val(), 
					  userName:$("#userName").val(),
					  password:$("#password").val(), 
					  userProfile:$("#fileupload").val()},
				success:function(data){
					alert("수정하기에 성공하였습니다.");
					location.href="project.project";
				}
			});
			}else if($('#password').val() == ""){
				alert("비밀번호를 입력해주세요.")
			}
				else{
				alert("비밀번호와 비밀번호 확인이 다릅니다.")
			}
		});
	
	});
	
	