$(function () {
	fileselect();
	firstFileSelect();

});

//드래그로 파일 업로드 ( DB에 저장 )
function fileselect(){

	$('#fileupload').fileupload({
     dataType: 'json',
   
     done: function (e,data) {	  
     $(".dropzonediv").empty();
       
     var html="" 
     
    	 $.each(data.result, function(index , file) {
			 html +=
				  "<div class='dropzonechild' style='float:left;background-color:lightgray;width:300px;height:200px;margin-right:50px;margin-bottom:50px;border-radius:20px;'>"
				  +"<div style='margin-left:220px;margin-top:5px'><img style='width:30px;height:30px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
				  +"></img>"
	    		  +"<img style='width:30px;height:30px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img></div>"
	    		  +"<div class ='dropzonecontent' style='float:left;width:200px;height:100px;background-color:white;vertical-align:middle;text-align:center;color:black;border: 1px solid white;margin-left:50px;margin-top:20px;border-radius:10px;'>"
	    		  +"<p style='text-align:center;margin-top:20px;color:black;font-size:30px;'>"+file.uploadOrigin+"</p>"
	    		  +"<p><img class='sns-icon' style='width:30px;hight:30px;margin-right:10px' src='resources/images/"+file.userProfile+"'><label style='margin-top:30px;color:black'>"+file.userName+"</label></p></img>"
	    		  +"</div>"
	    		  +"</div>"
		})
          $(".dropzonediv").html(html);  
        
      },
      dropZone: $('#dropzone') 
		 
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
    	
    		 $.each(data.file1, function(index , file) {
    			 html +=
    				  "<div class='dropzonechild' style='float:left;background-color:lightgray;width:300px;height:200px;margin-right:50px;margin-bottom:50px;border-radius:20px;'>"
   				  +"<div style='margin-left:220px;margin-top:5px'><img style='width:30px;height:30px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
   				  +"></img>"
   	    		  +"<img style='width:30px;height:30px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img></div>"
   	    		  +"<div class ='dropzonecontent' style='float:left;width:200px;height:100px;background-color:white;vertical-align:middle;text-align:center;color:black;border: 1px solid white;margin-left:50px;margin-top:20px;border-radius:10px;'>"
   	    		  +"<p style='text-align:center;margin-top:20px;color:black;font-size:30px;'>"+file.uploadOrigin+"</p>"
   	    		  +"<p><img class='sns-icon' style='width:30px;hight:30px;margin-right:10px' src='resources/images/"+file.userProfile+"'><label style='margin-top:30px;color:black'>"+file.userName+"</label></p></img>"
   	    		  +"</div>"
   	    		  +"</div>"
   		})
    		
			$(".dropzonediv").html(html);  
    	}
 	   
    }); 
}

function download(uploadAlias) {

	 location.href='download?fileName='+uploadAlias;
}

function deleteFile(boardNum) {
	console.log(boardNum);
	var boardnum = boardNum;
    $.ajax({
    	type: "get",
    	url: "deleteFile",
    	datatype:"JSON",
		data : {
			boardNum: boardnum,
			projectNum : $('#hiddenProjectNum').val()
		
		},
    	success: function(data) {
    
    		console.log(data);
    		
    		firstFileSelect();
    		
		
    	}
 	   
    }); 
}
