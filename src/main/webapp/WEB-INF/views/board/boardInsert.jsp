<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>

	<div class="container" style="margin-top: 60px;">
		<form action="boardInsert"  method="post" >
			<table  class="table table-bordered">
				<tr>
			 		<td>제목</td>
			 		<td><input type="text" name ="announceTitle"></td>
			 	<tr>	
			 	
			 	<tr>
			 		<td>내용</td>
			 		<td><textarea class="ckeditor" name ="announceContent"></textarea></td> 			 	
			 	</tr>		
				
				<tr>
					<td></td>
					<td >
						<input type="submit" value="작성" style="margin-right: 15px">
						<input type="button" value="취소" OnClick="history.back()">
					</td>
				</tr>		
			</table>
		</form>	

	</div>
	
	<script type="text/javascript">			    
		CKEDITOR.replace( 'announceContent',{
				width:'100%',
				height:'400px'
			});
		CKEDITOR.on('dialogDefinition', function( ev ){
				var dialogName = ev.data.name;
				var dialogDefinition = ev.data.definition;
				
			/* 	switch (dialogName) {
			   		 case 'image':dialogDefinition.removeContents('Link');
					 break;
			 } */
			});
	</script>
