<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- fileUpload -->
<script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
<script src="resources/js/board/jquery.iframe-transport.js"></script>
<script src="resources/js/board/jquery.fileupload.js"></script>
<script src="resources/js/board/myuploadfunction.js"></script>  
<link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />


	 <div class="container">
	
	 </div>
	projectNum

	<!-- <input id="fileupload" type="file" name="files[]" data-url="dragSelect"  multiple>
	 -->
		<input id="fileupload" type="file" name="files[]" data-url="fileInsert"  multiple>
		<input type="hidden" id="hiddenProjectNum" value="${sessionScope.sessionProjectNum}" >






	<div id="dropzone" class="fade well" style="width: 200px;height: 200px;">Drop files here</div>
	<div class="dropzonediv"></div>
	
			
