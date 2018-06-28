$(function () {
	fileselect();
	firstFileSelect();
	drag();
});
/*//검색 keyup
function searcherSelect(){
	
}
*/
//드래그시 이미지 보이게 
function drag() {
    // handle drag/drop
    $('body').bind("dragover", function (e) {
        $('#dropzone').addClass('drag');
        $('#dropzoneimg').addClass('drag');
        $('.dropzoneimg').attr('src','resources/images/board/dropzone1.png');
        return false;
    }).bind("dragleave", function (e) {
        $('#dropzone').removeClass('drag');
        $('.dropzoneimg').removeAttr('src','resources/images/board/dropzone1.png'); 
        return false;
    }).bind("drop", function (e) {
        $('#dropzone').removeClass('drag');
        $('.dropzoneimg').removeAttr('src','resources/images/board/dropzone1.png'); 
        return false;
    });
}
//드래그로 파일 업로드 ( DB에 저장 된는 동시에 파일뿌리기)
function fileselect(){

	$('#fileupload').fileupload({
     dataType: 'json',
 
     done: function (e,data) {	  
     $(".dropzonediv").empty();
       
     var html="" 
    	
    	 $.each(data.result, function(index , file) {
			 html +=
				"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:-10px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
				  +"<div style='word-wrap: break-word;margin-left:-10px;margin-top:5px'>" 
				  +"<img style='word-wrap: break-word;width:30px;height:30px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
				  +"></img>"
				  +"<img class='thumbnail' style='display:inline;width:30px;height:30px;border: 1px solid lightgray; margin: 0; padding: 0;background-color:lightgray;borderword-wrap: break-word;'src='resources/images/board/see.png' onmouseover=preview('"+file.uploadAlias+"')></img>"
	    		  +"<img style='word-wrap: break-word;width:30px;height:30px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img>"
	    		  +"</div>"
	    		  +"<div class ='dropzonecontent' style='word-wrap: break-word;float:left;width:200px;height:100px;background-color:white;vertical-align:middle;text-align:center;color:black;border: 1px solid white;margin-left:50px;border-radius:10px;'>"
	    		  +"<p style='word-wrap: break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;margin-top:20px;color:black;font-size:30px;'>"+file.uploadOrigin+"</p>"
	    		  +"<p><img class='img-circle' style='word-wrap: break-word;width:30px;hight:30px;margin-right:10px;' src='resources/images/profile/"+file.userProfile+"'><label style='margin-top:30px;color:black'>"+file.userName+"</label></p></img>"
	    		  +"<p style='word-wrap: break-word;color:black;'>"+file.boardDate+"</p>"
	    		  +"</div>"
	    		  +"</div>"
	
		})
          $(".dropzonediv").html(html);  
      },
      dropZone: $('#dropzone') 
		 
    });
	
	
}

//파일 뿌리기
function firstFileSelect() {
	  
    $.ajax({
    	type: "get",
    	url: "fileUpload1",
    	datatype:"JSON",
		data : {projectNum : $('#hiddenProjectNum').val()
		
		},
    	success: function(data) {
    		var html=""
    		 $(".dropzonediv").empty();
    		 $.each(data.file1, function(index , file) {
    			 html +=
    					"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:-10px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
    					  +"<div style='word-wrap: break-word;margin-left:-10px;margin-top:5px'>" 
    					  +"<img style='word-wrap: break-word;width:30px;height:30px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
    					  +"></img>"
    					  +"<img class='thumbnail' style='display:inline;width:30px;height:30px;border: 1px solid lightgray; margin: 0; padding: 0;background-color:lightgray;borderword-wrap: break-word;'src='resources/images/board/see.png' onmouseover=preview('"+file.uploadAlias+"')></img>"
    		    		  +"<img style='word-wrap: break-word;width:30px;height:30px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img>"
    		    		  +"</div>"
    		    		  +"<div class ='dropzonecontent' style='word-wrap: break-word;float:left;width:200px;height:100px;background-color:white;vertical-align:middle;text-align:center;color:black;border: 1px solid white;margin-left:50px;border-radius:10px;'>"
    		    		  +"<p style='word-wrap: break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;margin-top:20px;color:black;font-size:30px;'>"+file.uploadOrigin+"</p>"
    		    		  +"<p><img class='img-circle' style='word-wrap: break-word;width:30px;hight:30px;margin-right:10px;' src='resources/images/profile/"+file.userProfile+"'><label style='margin-top:30px;color:black'>"+file.userName+"</label></p></img>"
    		    		  +"<p style='word-wrap: break-word;color:black;'>"+file.boardDate+"</p>"
    		    		  +"</div>"
    		    		  +"</div>"
   		
    		 })
    		
			$(".dropzonediv").html(html);  
    	}
 	   
    }); 
}
//이미지 미리보기 
function preview(uploadAlias){
	var xOffset = 10;
    var yOffset = 30;

    $(document).on("mouseover",".thumbnail",function(e){ //마우스 오버시
     
        $(".preview").remove();
        $("body").append("<span class ='preview'><img src='resources/upload/"+ uploadAlias +"' width='350px' /></span>"); //보여줄 이미지를 선언                       
        $(".preview")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px")
            .fadeIn("fast"); //미리보기 화면 설정 셋팅
    });
     
    $(document).on("mousemove",".thumbnail",function(e){ //마우스 이동시
        $(".preview")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
     
    $(document).on("mouseout",".thumbnail",function(){ //마우스 아웃시
        $(".preview").remove();
    });
      
  
}

//파일 다운로드
function download(uploadAlias) {
	location.href = 'https://s3.ap-northeast-2.amazonaws.com/corin2.site/' + uploadAlias;
	 //location.href='download?fileName='+uploadAlias;
}


//파일삭제
function deleteFile(boardNum) {
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
    
    		firstFileSelect();
    	}
    }); 
}

 