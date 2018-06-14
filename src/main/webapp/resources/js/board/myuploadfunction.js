$(function () {

    $('#fileupload').fileupload({
        dataType: 'json',
        
        done: function (e, data) {
         	$("#dropzonediv p").remove();
            $.each(data.result, function (index, file) {
            	
           	/*
               $("#uploaded-files").append(
                		$('<tr/>')
                		.append($('<td/>').text(file.fileName))
                		.append($('<td/>').text(file.fileSize))
                		.append($('<td/>').text(file.fileType))
                		.append($('<td/>').html("<a href='get/"+index+"'>저장</a>"))
                		)*/

             $("#dropzonediv").append(
            		$('<div/>').html("<p>"+file.fileName+"</p>")
               	)
            	
            	
	
           }); 
        },
       
  	
		dropZone: 
			$('#dropzone')
    });
  
});


