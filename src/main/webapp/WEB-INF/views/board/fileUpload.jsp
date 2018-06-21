<%@ page language="java" contentType="text/html; charset=UTF-8" 
pageEncoding="UTF-8"%>

 
<!-- fileUpload -->
<script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
<script src="resources/js/board/jquery.iframe-transport.js"></script>
<script src="resources/js/board/jquery.fileupload.js"></script>
<script src="resources/js/board/myuploadfunction.js"></script>  
<link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />


	
	
 	 <form>
 	 	<input type="text" placeholder="검색" />
 	 	<input type="submit" value="검색"></input>
	 </form>

	<br>
	<br>
	<div class ="wrap" >
		 	 <form action="upload" method="post" enctype="multipart/form-data"> 
					<div class="filebox"> 
						<label for="fileupload">파일함</label> 
					    <input id="fileupload" type="file" name="files[]"  multiple>
					</div>
		 			<input type="hidden" name="projectNum" id="hiddenProjectNum" value="${sessionScope.sessionProjectNum}" >
		 			<input type="hidden" name="userId"id="hiddenUserId" value="${pageContext.request.userPrincipal.name}" >
		 	 </form>
		<div id="dropzone" class="fade well" style='width:100%;height:100%;'>
			 <div class ="over">
				<img class="dropzoneimg" ></img>
				
				<div class="dropzonediv">	 
				</div>
			 </div>	
		</div>
	</div>
	
			
