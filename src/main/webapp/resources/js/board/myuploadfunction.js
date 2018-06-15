$(function () {
	b();
	a();
  
});

//드래그로 파일 업로드 ( DB에 저장 )
function a(){
	$('#fileupload').fileupload({
        dataType: 'json',
        
      done: function (e, data) {
         	$("#dropzonediv").empty();
            $.each(data.result, function (index, file) {
           /*     	
          
             $("#dropzonediv").append(
             $('<div/>').html(
         				
            			html =
            				"<div class='dropnamesuper'"+index+">"+
                			"<div class ='dropnamechild'><p class ='dropzonecontent'>"+file.fileName+"</p><a href='get/"+index+"'>저장</a></div>	</div>"
            		)
               	)*/
           });
            var html=""
            $.ajax({
            	type: "post",
            	url: "dragInsert" ,
            	data: file.fileName ,
            	success: function(data) {
					
            		html =
        				"<div class='dropnamesuper'"+index+">"+
            			"<div class ='dropnamechild'><p class ='dropzonecontent'>"+file.fileName+"</p><a href='get/"+index+"'>저장</a></div>	</div>"
				}
            	
            });
            
      /*      ajax()
            성공 {
            	b();
            }*/
        },
    
		dropZone: 
			$('#dropzone')
    });
	
	
}

//DB에 있는 파일들을 화면에 뿌려준다.
function b(){
	
}
