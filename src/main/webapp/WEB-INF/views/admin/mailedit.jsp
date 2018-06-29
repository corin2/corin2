<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
    <script src="resources/js/admin/mailedit.js"></script>
    <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
	<link rel="stylesheet" href="resources/css/admin/admin.css">
	<div class="adminmanagement">
			<div class="adminmanagementundo">
			<h1>MailTemplateManagement</h1>
			<hr>
			<form action=""
				method="post">
				<textarea id="summernote" class="summernote"></textarea>
				  <script>
				    $(document).ready(function() {
				        $('#summernote').summernote();
				    });
				  </script>
				<p>
				<div align="center">
					<input type="button" id="signup" value="sign up template" class="btn btn-warning">
					<input type="button" id="signup2" value="sign up template2" class="btn btn-warning">
					<input type="button" id="save" value="save form" class="btn btn-warning">
					<input type="button" id="usetemplate" value="use this template" class="btn btn-warning">
				</div>
				
			</form>
		</div>
	</div>
