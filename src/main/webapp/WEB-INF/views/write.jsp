<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>write</title>
   <script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   
</head>
<body>

	<div class="container">
	<table>
		<tr>
	 		<td>제목</td>
	 		<td><input type="text" ></td>
	 	<tr>
	 		
	 	<tr>
	 		<td>내용</td>
	 		<td >
		 		<textarea name="editor1" class="ckeditor" wrap="virtual"></textarea>
		 		<script type="text/javascript">
					CKEDITOR.replace( 'editor1' ,{
					      width:'100%',
				          height:'400px',
				          filebrowserImageUploadUrl: '/imageUpload' 
					});
				</script>
	 		</td>
	 	</tr>		
			
	
		<tr>	
			<td>
				<center>
					<input type="button" value="수정">
					<input type="button" value="작성">
					<input type="button" value="취소">
				</center>
			</td>
		<tr>	
	</table>
	
	
</div>	
	
	
	
	
	
	
	
</body>
</html>