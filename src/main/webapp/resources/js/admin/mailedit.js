/**
    파일명: mailedit.js
    설   명: admin의 email template에 대한 javascript
    작성일: 2018. 6. 18.
    작성자: 강 진 광
*/
var signup = '';
    
    $(document).ready(function() { 
    	
    	 /**
	     * @함수명 : summernote생성하기
	     * @작성일 : 2018. 6. 18.
	     * @작성자 : 강진광
	     * @설명 : summernote를 불러오는 함수입니다.
	     **/
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
    	  
    	 /**
  	     * @함수명 : signuptemplate1
  	     * @작성일 : 2018. 6. 18.
  	     * @작성자 : 강진광
  	     * @설명 : mail template1을 summernote에 넣어주는 함수입니다.
  	     **/
    	  $('#signup').click(function(){
    		  $.ajax({
					type : "post",
					url : "vmload",
					async:false,
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						signup = "signup";
						$(".summernote").summernote("code", data.line);
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
    	  });
    	  
    	 /**
  	     * @함수명 : signuptemplate1
  	     * @작성일 : 2018. 6. 18.
  	     * @작성자 : 강진광
  	     * @설명 : mail template2을 summernote에 넣어주는 함수입니다.
  	     **/
    	  $('#signup2').click(function(){
    		  $.ajax({
					type : "post",
					url : "vmload2",
					async:false,
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						signup = "signup2";
						$(".summernote").summernote("code", data.line);
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
    	  });
    	  
    	 /**
  	     * @함수명 : template save
  	     * @작성일 : 2018. 6. 18.
  	     * @작성자 : 강진광
  	     * @설명 : summernote에서 변경한 template code를 signup이라는 문자열과 같이 보낸 뒤 DATABASE의 값을 변수 signup의 값으로 바꾸어주고 변수 signup의 값.vm파일의 코드를 변경 시켜주는 함수입니다.
  	     * @param : code , signup
  	     **/
    	  $('#save').click(function(){
    		  var savedata = $('#summernote').summernote('code');
    		  $.ajax({
    			  	type : "post",
					url : "vmsave",
					async:false,
					data : {savedata : $('#summernote').summernote('code') , signup : signup},
					success : function(data) {
						swal({type: "success",
							text:"변경이 완료되었습니다."
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
    	  });
    	  
    	 /**
  	     * @함수명 : template사용하기
  	     * @작성일 : 2018. 6. 18.
  	     * @작성자 : 강진광
  	     * @설명 : 사용자가 회원가입할 때 사용할 signuptemplate를 변경해주는 함수입니다. 변수 signup의 값을 signup을 하는 함수의 mail velocity template의 값으로 변경해주는 비동기 함수입니다.
  	     * @param : signup
  	     **/
    	  $('#usetemplate').click(function(){
    		  $.ajax({
    			  	type : "post",
					url : "usetemplate",
					data : {signup : signup},
					async:false,
					success : function(data) {
						swal({type: "success",text:"저장이 완료되었습니다."});
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
    	  });
    	  
    });