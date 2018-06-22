	$(function(){
		
		timer = setInterval( function () {
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
		}, 1); 
		
		$(function () {
		    'use strict';
		    // Change this to the location of your server-side upload handler:
		    var url = window.location.hostname === 'blueimp.github.io' ?
		                '//jquery-file-upload.appspot.com/' : 'server/php/';
		    $('#fileupload').fileupload({
		        url: url,
		        dataType: 'json',
		        done: function (e, data) {
		            $.each(data.result.files, function (index, file) {
		                $('<p/>').text(file.name).appendTo('#files');
		            });
		        },
		    })
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
	
	