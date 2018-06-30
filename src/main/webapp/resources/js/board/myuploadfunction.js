$(function () {
	fileselect();
	firstFileSelect();
	drag();
	
	var datajsonarr;
	$('.jstree').jstree({
		"core" : {
			"check_callback" : true,
	    	'data' : datajsonarr,
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
			    		
			    			html +=
			    				"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:60px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
				 				  +"<div style='word-wrap: break-word;margin-left:200px;margin-top:5px'>" 
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
		//확장자 검색 
		if(data.instance.get_node(data.selected).text == data.instance.get_node(data.selected).id){ 
		
			console.log((data.instance.get_node(data.selected).text )+"확장자입장"+(data.instance.get_node(data.selected).id));
			$.ajax({
		    	type: "get",
		    	url: "exClick",
		    	datatype:"JSON",
		    	data : {projectNum : $('#hiddenProjectNum').val(), extension : data.instance.get_node(data.selected).text },//프로젝트 넘버랑 , 확장자명을 넘긴다.
		    	success: function(data) {
		    		$(".dropzonediv").empty();
		    		var html="";
		    		
		    		 $.each(data.extension, function(index , file) {
		    			html +=
		    				"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:60px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
			 				  +"<div style='word-wrap: break-word;margin-left:200px;margin-top:5px'>" 
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
		  })
		}
/*      
		//일자별 검색
		if(data.instance.get_node(data.selected).id == 0 ||data.instance.get_node(data.selected).id==1 ) {
			console.log(data.instance.get_node(data.selected).id+"일자별입장");
			$.ajax({
				type: "get",
				url: "dateClick",
				datatype:"JSON",
				data : {projectNum : $('#hiddenProjectNum').val(), date :  data.instance.get_node(data.selected).text ,extension : data.instance.get_node(data.selected).parent  },//프로젝트 넘버랑 , 확장자명을 넘긴다.
				success: function(data) {
					$(".dropzonediv").empty();
					var html="";
					
					
					$.each(data.date, function(index , file) {
						
						html +=
							"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:60px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
							+"<div style='word-wrap: break-word;margin-left:200px;margin-top:5px'>" 
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
			})
		}	
		*/ 
	})
});	
	 

//폴더 생성
function foldermake(exdata) {
	
	/*	//확장자 하위 폴더
	for(var i =0; i < exdata.length ;  i++){
			datas.push({'id': exdata[i],'parent': "-1", 'text': exdata["JPG"] })	
		
		//날짜 하위 폴더
		for(var j=0 ; j < exdata[i].length; j++){
			datas.push({'id':exdata[j],"parent":exdata[i],'text': exdata[]  })
			
		}	
		//날짜 하위 폴더
		for(var j=0 ; j < exdata.length; j++){
			datas.push({'id':j,"parent":key,'text': exdata[key]  })
			
		}
		
	}*/
	
	
		//jsonarray 로 해서 data쪽으로 보내줌
		var datas = [];
		
		//폴더 : 전체조회
		datas.push({"id":"-1" , "parent":"#" ,"text":"All Files"});	
		

		//폴더 : 확장자 조회
		for( var key in exdata ) {
			datas.push({'id': key,'parent': "-1", 'text': key })	
		}
		//jsonArray 만들어서 data쪽으로 보냄
		var datajsonarr = JSON.stringify(datas);
		console.log(datajsonarr+" 으아");
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
				console.log(exdataKey);
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
    			
    			html +=
    				"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:60px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
	 				  +"<div style='word-wrap: break-word;margin-left:200px;margin-top:5px'>" 
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
    	 
    		 foldermake(exdata); //가공된 데이터 보냄
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
        $("body").append("<span class ='preview'><img src='" + s3StorageURL + uploadAlias +"' width='350px' alt='사진없음'/></span>"); //보여줄 이미지를 선언                       
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
			   
			    		 html +=
			 				"<div class='dropzonechild' style='border:1px solid #566270;word-wrap: break-word;float:left;background-color:lightgray;width:300px;height:200px;margin-left:60px;margin-right:20px;margin-bottom:100px;border-radius:20px;'>"
			 				  +"<div style='word-wrap: break-word;margin-left:200px;margin-top:5px'>" 
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
					$(".dropzonediv").html(html)
			}
	})
	
}


 