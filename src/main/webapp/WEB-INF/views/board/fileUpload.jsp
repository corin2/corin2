<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- fileUpload -->
<script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
<script src="resources/js/board/jquery.iframe-transport.js"></script>
<script src="resources/js/board/jquery.fileupload.js"></script>
<script src="resources/js/board/myuploadfunction.js"></script>  
<link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />

<div class="container">

	<input id="fileupload" type="file" name="files[]" data-url="upload"  multiple>

	<div id="dropzone" class="fade well" style="width: 300px;height: 300px">Drop files here</div>

	
	
	<div id="dropzonediv">
		
	</div>

	
	
</div>