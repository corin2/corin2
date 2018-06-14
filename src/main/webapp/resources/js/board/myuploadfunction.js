$(function () {

    $('#fileupload').fileupload({
        dataType: 'json',
        
        done: function (e, data) {
         	$("#dropzonediv").empty();
            $.each(data.result, function (index, file) {
            	
     
             $("#dropzonediv").append(
            		$('<div/>').html("<p>"+file.fileName+"</p>" +
            				"<a href='get/"+index+"'>저장</a>"		
            		)
               	)
           }); 
        },
       
  	
		dropZone: 
			$('#dropzone')
    });
  
});


