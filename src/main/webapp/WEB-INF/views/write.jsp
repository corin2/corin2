<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>write</title>
   <script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>

</head>
<body>

		<form action="">
	 		<label>제목</label><br>
	 		<input type="text" >
	 		
			<textarea name="editor1"></textarea>
			<script type="text/javascript">
				CKEDITOR.replace( 'editor1' ,{
					 filebrowserImageUploadUrl : '/dev-guide/ckeditorImageUpload.do'
				});
			</script>
			
			<input type="button" value="수정">
			<input type="button" value="작성">
			<input type="button" value="취소">
		</form>
</body>
</html>