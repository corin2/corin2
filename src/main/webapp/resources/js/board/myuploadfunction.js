$(function () {
	firstFileSelect();
	fileselect();
});

//드래그로 파일 업로드 ( DB에 저장 )
function fileselect(){

	$('#fileupload').fileupload({
     dataType: 'json',
   
     done: function (e,data) {	  
     $(".dropzonediv").empty();
       
     var html="" 
     
      $.each(data.result, function (index, file) {
    	  html +=
    		  "<div class='dropzonechild' style='float:left;background-color:lightgray;width:350px;height:200px;margin-right:50px;margin-bottom:50px;border-radius:20px;'>"
    		  +"<span class='glyphicon glyphicon-cog setting'  style='margin-top=10px;' onclick=download("+index+")"
    		  +"></span>"
    		  +"<div class ='dropzonecontent' style='float:left;width:250px;height:100px;background-color:white;vertical-align:middle;text-align:center;color:black;border: 1px solid white;margin-left:50px;margin-top:50px;border-radius:10px;'>"
    		  +"<p style='text-align:center;margin-top:25px;color:black;font-size:30px;'>"+file.uploadOrigin+"</p>"
    		  +"<p><img class='sns-icon' style='width:30px;hight:30px;margin-top:3px;margin-right:10px' src='resources/images/"+file.userProfile+"'><label style='margin-top:30px;color:black'>"+file.userName+"</label></p></img>"
    		  +"</div>"
    		  +"</div>"
    		
       });
          $(".dropzonediv").html(html);  
        
      },
      dropZone: $('#dropzone') 
		 
		,
		downloadCallback:function(files,pd)
		{
		    location.href="get/"+index+files[0];
		}
		 
    });
	
	
}

function firstFileSelect() {
  
    $.ajax({
    	type: "get",
    	url: "fileUpload1",
    	datatype:"JSON",
		data : {projectNum : $('#hiddenProjectNum').val()
		
		},
    	success: function(data) {
    		var html=""
    		console.log(data);
    		
    		 $.each(data.file1 , function(index , file) {
    			 html +=
    				  "<div class='dropzonechild' style='float:left;background-color:lightgray;width:350px;height:200px;margin-right:50px;margin-bottom:50px;border-radius:20px;'>"
    	    		  +"<span class='glyphicon glyphicon-cog setting'  style='margin-top=10px;' onclick=download("+index+")"
    	    		  +"></span>"
    	    		  +"<div class ='dropzonecontent' style='float:left;width:250px;height:100px;background-color:white;vertical-align:middle;text-align:center;color:black;border: 1px solid white;margin-left:50px;margin-top:50px;border-radius:10px;'>"
    	    		  +"<p style='text-align:center;margin-top:25px;color:black;font-size:30px;'>"+file.uploadOrigin+"</p>"
    	    		  +"<p><img class='sns-icon' style='width:30px;hight:30px;margin-top:3px;margin-right:10px' src='resources/images/"+file.userProfile+"'><label style='margin-top:30px;color:black'>"+file.userName+"</label></p></img>"
    	    		  +"</div>"
    	    		  +"</div>"
			})
    		
			$(".dropzonediv").html(html);  
    	}
 	   
    }); 
}

function download(index) {
	 
	 location.href='get/'+index
}
