<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<!-- include summernote css/js -->
    <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
    <script>
    $(document).ready(function() { 
    	  $('#summernote').summernote({
    		 height: 300,
    		 toolbar:[

    	      // This is a Custom Button in a new Toolbar Area
    	      ['custom', ['examplePlugin']],

    	      // You can also add Interaction to an existing Toolbar Area
    	      ['style', ['style' ,'examplePlugin']]
    	    ],
    	    toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link','picture','video','hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ]
    	});
    
    	  $('#signup').click(function(){
    		  $.ajax({
					type : "post",
					url : "vmload",
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						$(".summernote").summernote("code", data.line);
					}
    		  });
    	  });
    	  
    	  $('#save').click(function(){
    		  var savedata = $('#summernote').summernote('code');
    		  console.log(savedata);
    		  $.ajax({
    			  	type : "post",
					url : "vmsave",
					data :{savedata : savedata},
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						alert("저장이 완료되었습니다.");
					}
		 	 });
    	  });
    });
    </script>
</head>
<body>
	<div class="container">
		<h4>메일 templete 변경하기</h4>
		<form action=""
			method="post">
			<textarea id="summernote" class="summernote"></textarea>
			  <script>
			    $(document).ready(function() {
			        $('#summernote').summernote();
			    });
			  </script>
			<p>
			<div align="center">
				<input type="button" id="signup" value="sign up templete" class="btn btn-warning">
				<input type="button" id="save" value="save form" class="btn btn-warning">
			</div>
			
		</form>
	</div>
</body>
</html>