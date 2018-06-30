$(function(){
		$.ajax({
			type : "post",
			url  : "showUser",
			datatype:"JSON",
			data : {userId : $('#hiddenUserId').val()},
			success : function(data){
				$.each(data, function(index, obj) {
					//$('#recentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
					$('#recentUserProfile').attr("src", profileStorageURL + obj.userProfile);
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
							$('#recentUserProfile').attr("src", profileStorageURL + obj.userProfile);
							$('#currentUserProfile').attr("src", profileStorageURL + obj.userProfile);
						});
					}
				});
	        },
	    }).on('fileuploadfail', function (e, data) {
	    	swal("형식이 맞지 않습니다.");
	    });
});
