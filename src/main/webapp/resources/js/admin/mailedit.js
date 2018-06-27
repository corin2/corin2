 var signup = '';
    
    $(document).ready(function() { 
    	  $('#summernote').summernote({
    		 height: 690,
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
						signup = "signup";
						$(".summernote").summernote("code", data.line);
					}
    		  });
    	  });
    	  
    	  $('#signup2').click(function(){
    		  $.ajax({
					type : "post",
					url : "vmload2",
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						signup = "signup2";
						$(".summernote").summernote("code", data.line);
					}
    		  });
    	  });
    	  
    	  $('#save').click(function(){
    		  var savedata = $('#summernote').summernote('code');
    		  $.ajax({
    			  	type : "post",
					url : "vmsave",
					data : {savedata : $('#summernote').summernote('code') , signup : signup},
					success : function(data) {
						swal({type: "success",
							text:"변경이 완료되었습니다."
								});
					}
		 	 });
    	  });
    	  
    	  $('#usetemplate').click(function(){
    		  $.ajax({
    			  	type : "post",
					url : "usetemplate",
					data : {signup : signup},
					success : function(data) {
						swal({type: "success",text:"저장이 완료되었습니다."});
					}
		 	 });
    	  });
    	  
    });