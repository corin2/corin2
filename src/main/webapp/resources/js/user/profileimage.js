/**
    파일명: profileimage.js
    설   명: 프로필이미지 창에 대한 javascript
    작성일: 2018. 6. 20.
    작성자: 강 진 광
*/
$(function(){
		/**
	     * @함수명 : 프로필 사진 보여주기
	     * @작성일 : 2018. 6. 20.
	     * @작성자 : 강진광
	     * @설명 : 페이지를 불러올 떄 자동으로 프로필 이미지를 지정된 곳에 넣어주는 비동기 함수 입니다.
	     * @param : userid
	     * @return : userprofile
	     **/
		$.ajax({
			type : "post",
			url  : "showUser",
			datatype:"JSON",
			data : {userId : $('#hiddenUserId').val()},
			success : function(data){
				$.each(data, function(index, obj) {
					//$('#recentUserProfile').attr("src", "resources/images/profile/" + obj.userProfile);
					$('#recentUserProfile').attr("src",  "resources/images/profile/"+obj.userProfile);
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
		
		/**
	     * @함수명 : 파일 걸러내기
	     * @작성일 : 2018. 6. 20.
	     * @작성자 : 강진광
	     * @설명 : upload하는 profile 파일의 형식이 지정해준 것과 다르다면 alert창을 띄워주고 지정해준 것이 맞다면 바뀐 프로필파일로 사진들을 변경 시켜주는 비동기 함수입니다.
	     * @param : userid
	     * @return : userprofile
	     **/
	    $('#profileimageupdate').fileupload({
	        dataType: 'json',
	        add: function(e, data){
                var uploadFile = data.files[0];
                var isValid = true;
                if (!(/png|jpe?g|gif|svg/i).test(uploadFile.name)) {
                    isValid = false;
                }
                if (isValid) {
                    data.submit();
                }else{
                	swal({type: 'error',title:'png, jpg, gif 만 가능합니다'});
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
							$('#recentUserProfile').attr("src", "resources/images/profile/"+obj.userProfile);
							$('#currentUserProfile').attr("src","resources/images/profile/"+ obj.userProfile);
							$('#currentChatUserProfile').attr("src",  "resources/images/profile/"+obj.userProfile);
							getChatUsers();
							if(sessionProjectNum != 'null') {
								projectMemberProfile();
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
	        },dropZone: $('#recentUserProfile') 
	    }).on('fileuploadfail', function (e, data) {
	    	swal({type: 'error',title:"형식이 맞지 않습니다."});
	    });
});
