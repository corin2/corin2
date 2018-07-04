<%@ page language="java" contentType="text/html; charset=UTF-8" 
pageEncoding="UTF-8"%>

 
<!-- fileUpload -->
<script src="resources/js/board/jquery.iframe-transport.js"></script>
<script src="resources/js/board/myuploadfunction.js"></script>  
<link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
<div class="fileuploadbackdiv" style="overflow: scroll;">
	<h2 id="fileTitle">파일함</h2>
	<hr>
	<!-- input 검색기능 -->
	<div class ="folder" style="width:18%;overflow:hidden;float:left;margin-top:55px;margin-left:80px;">
		<form action="searcherFileSelect" method="get"  onsubmit="return false" style="height: 60px;">
			<div class="col-sm-10">
		 	 	<input id="uploadOriginInput" type="text" name ="uploadOrigin" class="search"style="height: 35px; width:250px; margin-right:5px; " onkeypress="if( event.keyCode==13 ){searcherFileSelect();}" placeholder="파일명  or 작성자를 입력하세요"  />
			</div>
			<div class="col-sm-2">
		 	 	<span class="glyphicon glyphicon-search" id="fileicon" onclick="searcherFileSelect()"></span>
			</div>
	   </form> 
	
	<!-- jstree 검색 -->
		<div class ="jstree" style="overflow:scroll;overflow:hidden;height:600px;"> 
			
		</div>
	</div>
	
	<!-- 파일함 기능  -->
	<div id ="wrap" style="float:right;margin-top:30px; overflow:hidden;" >
		<form action="upload" method="post" enctype="multipart/form-data"> 
			<div class="filebox"> 
				<label for="fileupload">Add Files..</label> 
				<input id="fileupload" type="file" name="files[]"  multiple>
			</div>
		 		<input type="hidden" name="projectNum" id="hiddenProjectNum" value="${sessionScope.sessionProjectNum}" >
		 		<input type="hidden" name="userId" value="${pageContext.request.userPrincipal.name}" >
		</form>
		
	<!-- dropzone 파일이 drop공간  -->
		<div id="dropzone" >
			 <div id ="over">
				<img class="dropzoneimg" src="resources/images/board/noimage.png"></img>
				<div class="dropzonediv"></div>
			 </div>	
		</div>
	</div>
</div>
	
	
	
