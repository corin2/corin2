$(function () {
	fileselect();
	firstFileSelect();
	drag();
	
	var datajsonarr;
	$('.jstree').jstree({
		"core" : {
			"check_callback" : true,
	    	'data' : datajsonarr,
	  
	        "plugins" :["types,wholerow"]
		
		}

	}).bind('select_node.jstree', function(event, data){
		
		//전체검색
		if(data.instance.get_node(data.selected).text =="All Files"){ 
			 $.ajax({
			    	type: "get",
			    	url: "fileUpload1",
			    	datatype:"JSON",
					data : {projectNum : $('#hiddenProjectNum').val()},
			    	success: function(data) {
			    		$(".dropzonediv").empty();
			    		var html="";
			    		var result = 0;
			    		var exdata = [];
			    		 $.each(data.file1, function(index , file) {
			    			var extension = file.uploadOrigin.split('.');
			    
			    			html +=
			    				  "<div class='dropzonechild' style='border:1px solid lightgray;word-wrap: break-word;float:left;width:250px;height:250px;margin-right:50px;margin-bottom:100px;border-radius:10px;'>"
			    				  +"<div style='word-wrap: break-word;margin-left:150px;margin-top:5px'>" 
				 				  +"<img style='word-wrap: break-word;width:25px;height:25px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
				 				  +"></img>"
				 				  +"<img class='thumbnail' style='display:inline;width:25px;height:25px;border: 1px solid #fff; margin: 0; padding: 0;borderword-wrap: break-word;'src='resources/images/board/see.png' onmouseover=preview('"+file.uploadAlias+"')></img>"
				 				 
				 	    		 if(file.userId == $("#hiddenUserId").val() ){
				  	 				  html+= "<img style='word-wrap: break-word;width:25px;height:25px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img>"
				  	 				 }
				 	    		  html+="</div>"
				 	    		  +"<div class ='dropzonecontent' style='word-wrap: break-word;float:left;width:200px;height:100px;background-color:white;text-align:center;color:black;border: 1px solid white;margin-left:20px;margin-top:30px;'>"
				 	    		  +"<img style='width:80px;hight:80px;margin-left:10px' src='resources/images/board/"
			  	 	    		  if(extension[extension.length-1].toUpperCase() == "CSS")html+="css.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "GIF")html+="gif.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "JPG")html+="jpg.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "JS")html+="js.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PDF")html+="pdf.svg"; 
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PNG")html+="png.svg";  
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PPT")html+="ppt.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "TXT")html+="txt.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "XLS")html+="xls.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "XML")html+="xml.svg";
			  	 	    		  else if(extension[extension.length-1].toUpperCase() == "ZIP")html+="zip.svg";
			  	 	    		  else html+="moo.svg"; 
			  	 	    		  
			  	 	    	html += "'></img><p style='word-wrap: break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:40px;color:black;font-size:20px;'>"+file.uploadOrigin+"</p>"
			  	    		  +"<img class='img-circle' style='width:30px;hight:30px;margin-right:10px;' src='"+profileStorageURL+file.userProfile+"'>" 
			  				  +"<label style='color:black;word-wrap: break-word;'>"+file.userName+"</label>"
			  				  +"</img>" 
			  				  +"<p style='word-wrap: break-word;color:black;'>"+file.boardDate+"</p>" 
			   	    		  +"</div>"
			   	    		  +"</div>";
			    		 })
			    		
						$(".dropzonediv").html(html);  
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
		} 
		//확장자 검색 
		if(data.instance.get_node(data.selected).text == data.instance.get_node(data.selected).id){ 
		
			$.ajax({
		    	type: "get",
		    	url: "exClick",
		    	datatype:"JSON",
		    	data : {projectNum : $('#hiddenProjectNum').val(), extension : data.instance.get_node(data.selected).text },//프로젝트 넘버랑 , 확장자명을 넘긴다.
		    	success: function(data) {
		    		$(".dropzonediv").empty();
		    		var html="";
		    		
		    		 $.each(data.extension, function(index , file) {
		    			 var extension = file.uploadOrigin.split('.');
		    			 html +=
		    				  "<div class='dropzonechild' style='border:1px solid lightgray;word-wrap: break-word;float:left;width:250px;height:250px;margin-right:50px;margin-bottom:100px;border-radius:10px;'>"
		    				  +"<div style='word-wrap: break-word;margin-left:150px;margin-top:5px'>" 
			 				  +"<img style='word-wrap: break-word;width:25px;height:25px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
			 				  +"></img>"
			 				  +"<img class='thumbnail' style='display:inline;width:25px;height:25px;border: 1px solid #fff; margin: 0; padding: 0;borderword-wrap: break-word;'src='resources/images/board/see.png' onmouseover=preview('"+file.uploadAlias+"')></img>"
			 				 
			 	    		 if(file.userId == $("#hiddenUserId").val() ){
			  	 				  html+= "<img style='word-wrap: break-word;width:25px;height:25px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img>"
			  	 				 }
			 	    		  html+="</div>"
			 	    		  +"<div class ='dropzonecontent' style='word-wrap: break-word;float:left;width:200px;height:100px;background-color:white;text-align:center;color:black;border: 1px solid white;margin-left:20px;margin-top:30px;'>"
			 	    		  +"<img style='width:80px;hight:80px;margin-left:10px' src='resources/images/board/"
		  	 	    		  if(extension[extension.length-1].toUpperCase() == "CSS")html+="css.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "GIF")html+="gif.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "JPG")html+="jpg.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "JS")html+="js.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PDF")html+="pdf.svg"; 
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PNG")html+="png.svg";  
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PPT")html+="ppt.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "TXT")html+="txt.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "XLS")html+="xls.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "XML")html+="xml.svg";
		  	 	    		  else if(extension[extension.length-1].toUpperCase() == "ZIP")html+="zip.svg";
		  	 	    		  else html+="moo.svg"; 
		  	 	    		  
		  	 	    	html += "'></img><p style='word-wrap: break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:40px;color:black;font-size:20px;'>"+file.uploadOrigin+"</p>"
		  	    		  +"<img class='img-circle' style='width:30px;hight:30px;margin-right:10px;' src='"+profileStorageURL+file.userProfile+"'>" 
		  				  +"<label style='color:black;word-wrap: break-word;'>"+file.userName+"</label>"
		  				  +"</img>" 
		  				  +"<p style='word-wrap: break-word;color:black;'>"+file.boardDate+"</p>" 
		   	    		  +"</div>"
		   	    		  +"</div>";
		    		 })
					$(".dropzonediv").html(html);  
		    	},
				error: function() {
					swal({
						 type: 'error',
						 title: 'Oops...',
						 text: 'Something went wrong!',
						 footer: '<a href>Why do I have this issue?</a>'
						})
				}
		  })
		}
	})
});	
	 

//폴더 생성
function foldermake(exdata) {
	
		//jsonarray 로 해서 data쪽으로 보내줌
		var datas = [];
		
		//폴더 : 전체조회
		datas.push({"id":"-1" , "parent":"#" ,"text":"All Files"});	

		//폴더 : 확장자 조회
		for( var key in exdata ) {
			   if(key == "CSS")	datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/css.svg" });
			   else if(key == "GIF")	datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/gif.svg" });
			   else if(key == "JPG")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/jpg.svg" })
			   else if(key == "JS")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/js.svg" })
			   else if(key == "PDF")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/pdf.svg" }) 
			   else if(key == "PNG")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/png.svg" }) 
			   else if(key == "PPT")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/ppt.svg" })
			   else if(key == "TXT")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/txt.svg" })
	    	   else if(key == "XLS")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/xls.svg" })
	    	   else if(key == "XML")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/xml.svg" })
	    	   else if(key == "ZIP")datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/zip.svg" })
	    	   else{
	    		   datas.push({'id': key,'parent': "-1", 'text': key ,"icon":"resources/images/board/moo.svg" })
	    	   }
			
		}
	
		//jsonArray 만들어서 data쪽으로 보냄
		var datajsonarr = JSON.stringify(datas);
        $(".jstree").jstree(true).settings.core.data = datas;
        $(".jstree").jstree(true).refresh();


}


// 드래그앤 드랍시에 이미지 띄우는 함수
function drag() {
	
    // 드래그앤 드랍시에  이미지 파일 띄우고 드래그 안할땐 이미지 삭제함
    $('#dropzone').bind("dragover", function (e) {
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
		firstFileSelect();
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
		data : {projectNum : $('#hiddenProjectNum').val()},
    	success: function(data) {
    		$(".dropzonediv").empty();
    		var html="";
    		var exdata = {};
    		var datedata = [];
    
    		 $.each(data.file1, function(index , file) {
    		 var extension = file.uploadOrigin.split('.');
  		     var date = file.boardDate.substring(0,10);
  		     var result = 0;
  		       // 2018 2017 2018 2016
  		       // [jpg, png]
  		       // [{ JPG : [2018-06-06, 2018-07-07], PNG : [] ]
  		       // 확장자가 중복일때 result값을 1로 바꾼다.
  		        var exdataKey = [];
 
  		        //exdata(json)에 있는 모든 키값을 exdataKey 배열에 담아준다.
				for( var key in exdata ) {
					exdataKey.push(key);
				
				}
				//exdataKey(ex->JPG, PNG ...) 담겨있는 값과 data.file1의 확장자명과 비교
  		       $.each(exdataKey, function(i, elt){
  		          if(extension[extension.length-1].toUpperCase() == elt){
  		              result = 1;
  		              return false;
  		          }
  		       });
  		       
  		       //exdataKey에  같은 확장자 명이 없다면 if에 타고
  		       if(result != 1){
		           datedata = [date]; // ex) date = 2018-06-06 이것을 datedata 배열에 담아준다 
		           exdata[extension[extension.length-1].toUpperCase()] = datedata;
  		       }else { //exdataKey에  같은 확장자 명이 있다면 else에 타고
  		    	 $.each(exdata[extension[extension.length-1].toUpperCase()], function(i, elt){
		               if(elt == date){ // json 확장자 배열에 들어있는 날짜와  뽑은 date의 값과 같다면 if문을
		                   result = 1;
		                   return false;
		               }else result = 0; // 다르다면 else
		           });
		     
		           if(result != 1){
		      
		               datedata = exdata[extension[extension.length-1].toUpperCase()];
		               datedata.push(date);
		               
		               exdata[extension[extension.length-1].toUpperCase()] = datedata;
		           }
		   
  		       }
  			 console.log(file.userId +"안타나요?"+$("#hiddenUserId").val());
  			html +=
				  "<div class='dropzonechild' style='border:1px solid lightgray;word-wrap: break-word;float:left;width:250px;height:250px;margin-right:50px;margin-bottom:100px;border-radius:10px;'>"
				  +"<div style='word-wrap: break-word;margin-left:150px;margin-top:5px'>" 
				  +"<img style='word-wrap: break-word;width:25px;height:25px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
				  +"></img>"
				  +"<img class='thumbnail' style='display:inline;width:25px;height:25px;border: 1px solid #fff; margin: 0; padding: 0;borderword-wrap: break-word;'src='resources/images/board/see.png' onmouseover=preview('"+file.uploadAlias+"')></img>"
				 
	    		 if(file.userId == $("#hiddenUserId").val() ){
	 				  html+= "<img style='word-wrap: break-word;width:25px;height:25px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img>"
	 				 }
	    		  html+="</div>"
	    		  +"<div class ='dropzonecontent' style='word-wrap: break-word;float:left;width:200px;height:100px;background-color:white;text-align:center;color:black;border: 1px solid white;margin-left:20px;margin-top:30px;'>"
	    		  +"<img style='width:80px;hight:80px;margin-left:10px' src='resources/images/board/"
 	    		  if(extension[extension.length-1].toUpperCase() == "CSS")html+="css.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "GIF")html+="gif.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "JPG")html+="jpg.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "JS")html+="js.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "PDF")html+="pdf.svg"; 
 	    		  else if(extension[extension.length-1].toUpperCase() == "PNG")html+="png.svg";  
 	    		  else if(extension[extension.length-1].toUpperCase() == "PPT")html+="ppt.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "TXT")html+="txt.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "XLS")html+="xls.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "XML")html+="xml.svg";
 	    		  else if(extension[extension.length-1].toUpperCase() == "ZIP")html+="zip.svg";
 	    		  else html+="moo.svg"; 
 	    		  
 	    	html += "'></img><p style='word-wrap: break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:40px;color:black;font-size:20px;'>"+file.uploadOrigin+"</p>"
    		  +"<img class='img-circle' style='width:30px;hight:30px;margin-right:10px;' src='"+profileStorageURL+file.userProfile+"'>" 
			  +"<label style='color:black;word-wrap: break-word;'>"+file.userName+"</label>"
			  +"</img>" 
			  +"<p style='word-wrap: break-word;color:black;'>"+file.boardDate+"</p>" 
	    		  +"</div>"
	    		  +"</div>";
    		 })
    		 foldermake(exdata); //가공된 데이터 보냄
			$(".dropzonediv").html(html);  
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
}

//이미지 미리보기 
function preview(uploadAlias){
	var xOffset = 10;
    var yOffset = 30;
    
    $(document).on("mouseover",".thumbnail",function(e){ //마우스 오버시
     
        $(".preview").remove();
        $("body").append("<span class ='preview'><img src='" + s3StorageURL + uploadAlias +"' onerror='this.src=\"resources/images/board/noimage.jpg\"' width='300px'/></span>"); //보여줄 이미지를 선언                       
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
	location.href = s3StorageURL + uploadAlias;
}

//파일삭제
function deleteFile(boardNum) {
	var boardnum = boardNum;
	swal({
		type: "warning",
		text: "정말로 삭제하시겠습니까?",
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'delete',
	    showCancelButton: true
	}).then((result) => {
		  if (result.value) { 
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
		  }
	});
}


//파일 검색 input 엔터 및 검색 버튼
function searcherFileSelect(){

	var uploadOriginInput = $("#uploadOriginInput").val();
	$.ajax({
		type:'get',
		url:'searcherFileSelect' ,
		data: {
				 uploadOrigin : uploadOriginInput,
				 projectNum : $('#hiddenProjectNum').val()
			},
		success: function(data) {
			  
			     var html="" 
			    	 $.each(data, function(index , file) {
			    		$(".dropzonediv").empty();
			   		 var extension = file.uploadOrigin.split('.');
			   		html +=
	    				  "<div class='dropzonechild' style='border:1px solid lightgray;word-wrap: break-word;float:left;width:250px;height:250px;margin-right:50px;margin-bottom:100px;border-radius:10px;'>"
	    				  +"<div style='word-wrap: break-word;margin-left:150px;margin-top:5px'>" 
		 				  +"<img style='word-wrap: break-word;width:25px;height:25px;margin-right:3px'src='resources/images/board/download.png' onclick=download('" + file.uploadAlias + "')" 
		 				  +"></img>"
		 				  +"<img class='thumbnail' style='display:inline;width:25px;height:25px;border: 1px solid #fff; margin: 0; padding: 0;borderword-wrap: break-word;'src='resources/images/board/see.png' onmouseover=preview('"+file.uploadAlias+"')></img>"
		 				 
		 	    		 if(file.userId == $("#hiddenUserId").val() ){
		  	 				  html+= "<img style='word-wrap: break-word;width:25px;height:25px;'src='resources/images/board/delete.png' onclick='deleteFile("+file.boardNum+")'></img>"
		  	 				 }
		 	    		  html+="</div>"
		 	    		  +"<div class ='dropzonecontent' style='word-wrap: break-word;float:left;width:200px;height:100px;background-color:white;text-align:center;color:black;border: 1px solid white;margin-left:20px;margin-top:30px;'>"
		 	    		  +"<img style='width:80px;hight:80px;margin-left:10px' src='resources/images/board/"
	  	 	    		  if(extension[extension.length-1].toUpperCase() == "CSS")html+="css.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "GIF")html+="gif.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "JPG")html+="jpg.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "JS")html+="js.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PDF")html+="pdf.svg"; 
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PNG")html+="png.svg";  
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "PPT")html+="ppt.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "TXT")html+="txt.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "XLS")html+="xls.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "XML")html+="xml.svg";
	  	 	    		  else if(extension[extension.length-1].toUpperCase() == "ZIP")html+="zip.svg";
	  	 	    		  else html+="moo.svg"; 
	  	 	    		  
	  	 	    	html += "'></img><p style='word-wrap: break-word;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:40px;color:black;font-size:20px;'>"+file.uploadOrigin+"</p>"
	  	    		  +"<img class='img-circle' style='width:30px;hight:30px;margin-right:10px;' src='"+profileStorageURL+file.userProfile+"'>" 
	  				  +"<label style='color:black;word-wrap: break-word;'>"+file.userName+"</label>"
	  				  +"</img>" 
	  				  +"<p style='word-wrap: break-word;color:black;'>"+file.boardDate+"</p>" 
	   	    		  +"</div>"
	   	    		  +"</div>";
					})
					$(".dropzonediv").html(html)
			},
			error: function() {
				swal({
					 type: 'error',
					 title: 'Oops...',
					 text: 'Something went wrong!',
					 footer: '<a href>Why do I have this issue?</a>'
					})
			}
	})
	
}