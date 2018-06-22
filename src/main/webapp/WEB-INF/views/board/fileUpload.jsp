<%@ page language="java" contentType="text/html; charset=UTF-8" 
pageEncoding="UTF-8"%>

 
<!-- fileUpload -->
<script src="resources/js/board/jquery.iframe-transport.js"></script>
<script src="resources/js/board/myuploadfunction.js"></script>  
<link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />


	
	<!-- 검색기능 -->
 	 <form action="searcherFileSelect" method="get"  onsubmit="return false">
 	 	<input id="uploadOriginInput" type="text" name ="uploadOrigin"  onkeypress="if( event.keyCode==13 ){searcherFileSelect();}" placeholder="파일명 or 작성자를 입력하세요" style="width:200px;" />
 	 	
 	 	<input type="submit"  value="검색" onclick="searcherFileSelect()"/>
	 </form>

	<br>
	<br>
	
	<!-- 파일함 기능  -->
	<div id ="wrap" >
		<form action="upload" method="post" enctype="multipart/form-data"> 
			<div class="filebox"> 
				<label for="fileupload">파일함</label> 
				<input id="fileupload" type="file" name="files[]"  multiple>
			</div>
		 		<input type="hidden" name="projectNum" id="hiddenProjectNum" value="${sessionScope.sessionProjectNum}" >
		 		<input type="hidden" name="userId"id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
		</form>
		<div id="dropzone" class="fade well" style='width:100%;height:100%;'>
			 <div id ="over">
				<img class="dropzoneimg" ></img>
				<div class="dropzonediv"></div>
			 </div>	
		</div>
	</div>
	
			
