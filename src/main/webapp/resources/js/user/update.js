	$(function(){
		$(function () {
		    'use strict';
		    var url = window.location.hostname === 'blueimp.github.io' ?
		                '//jquery-file-upload.appspot.com/' : 'server/php/',
		        uploadButton = $('<button/>')
		            .addClass('btn btn-primary')
		            .text('Processing...')
		            .on('click', function () {
		                var $this = $(this),
		                    data = $this.data();
		                $this
		                    .off('click')
		                    .text('Abort')
		                    .on('click', function () {
		                        $this.remove();
		                        data.abort();
		                    });
		                data.submit().always(function () {
		                    $this.remove();
		                });
		            });
		    $('#fileupload').fileupload({
		        url: url,
		        dataType: 'json',
		        autoUpload: false,
		        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		        maxFileSize: 999000,
		        disableImageResize: /Android(?!.*Chrome)|Opera/
		            .test(window.navigator.userAgent),
		        previewMaxWidth: 100,
		        previewMaxHeight: 100,
		        previewCrop: true
		    }).on('fileuploadadd', function (e, data) {
		        data.context = $('<div/>').appendTo('#files');
		        $.each(data.files, function (index, file) {
		            var node = $('<p/>')
		                    .append($('<span/>').text(file.name));
		            if (!index) {
		                node
		                    .append('<br>')
		                    .append(uploadButton.clone(true).data(data));
		            }
		            node.appendTo(data.context);
		        });
		    }).on('fileuploadprocessalways', function (e, data) {
		        var index = data.index,
		            file = data.files[index],
		            node = $(data.context.children()[index]);
		        if (file.preview) {
		            node
		                .prepend('<br>')
		                .prepend(file.preview);
		        }
		        if (file.error) {
		            node
		                .append('<br>')
		                .append($('<span class="text-danger"/>').text(file.error));
		        }
		        if (index + 1 === data.files.length) {
		            data.context.find('button')
		                .text('Upload')
		        }
		    }).on('fileuploadprogressall', function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        $('#progress .progress-bar').css(
		            'width',
		            progress + '%'
		        );
		    }).on('fileuploaddone', function (e, data) {
		        $.each(data.result.files, function (index, file) {
		            if (file.url) {
		                var link = $('<a>')
		                    .attr('target', '_blank')
		                    .prop('href', file.url);
		                $(data.context.children()[index])
		                    .wrap(link);
		            } else if (file.error) {
		                var error = $('<span class="text-danger"/>').text(file.error);
		                $(data.context.children()[index])
		                    .append('<br>')
		                    .append(error);
		            }
		        });
		    }).on('fileuploadfail', function (e, data) {
		        $.each(data.files, function (index) {
		            var error = $('<span class="text-danger"/>').text('File upload failed.');
		            $(data.context.children()[index])
		                .append('<br>')
		                .append(error);
		        });
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
	
	