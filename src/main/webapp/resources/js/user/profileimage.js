$(function(){
		$.ajax({
			type : "post",
			url  : "showUser",
			datatype:"JSON",
			data : {userId : $('#hiddenUserId').val()},
			success : function(data){
				$.each(data, function(index, obj) {
					//$('#recentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
					$('#recentUserProfile').attr("src", "https://s3.ap-northeast-2.amazonaws.com/corin2.site/" + obj.userProfile);
				});
			}
		});
		
	    $('#profileimageupdate').fileupload({
	        dataType: 'json',
	        add: function(e, data){
                var uploadFile = data.files[0];
                var isValid = true;
                if (!(/png|jpe?g|gif|svg/i).test(uploadFile.name)) {
                    swal('png, jpg, gif 만 가능합니다');
                    isValid = false;
                }
                if (isValid) {
                    data.submit();
                }
	        },
	        done: function (e, data) {
	        	$.ajax({
					type : "post",
					url  : "showUser",
					datatype:"JSON",
					data : {userId : $('#hiddenUserId').val()},
					success : function(data){
						$.each(data, function(index, obj) {
							//$('#recentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
							//$('#currentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
							$('#recentUserProfile').attr("src", "https://s3.ap-northeast-2.amazonaws.com/corin2.site/" + obj.userProfile);
							$('#currentUserProfile').attr("src", "https://s3.ap-northeast-2.amazonaws.com/corin2.site/" + obj.userProfile);
						});
					}
				});
	        },
	    }).on('fileuploadfail', function (e, data) {
	    	swal("형식이 맞지 않습니다.");
	    });
});
