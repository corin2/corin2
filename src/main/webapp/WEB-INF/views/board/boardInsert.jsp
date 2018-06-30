<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="resources/css/board/announceboard.css">
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
	<div class="announceboardupdate">
		<div class="announceboardundoupdate">
			<h2 id='boardUpdateTitle'>공지사항 작성하기</h2>
			<hr>
			<form action="boardInsert"  method="post" >
				<input type="hidden" name="countPerPage" value="${page.countPerPage}">
				<input type="hidden" name="blockCount" value="${page.blockCount}">
				<input type="hidden" name="nowPage" value="${page.nowPage}">
				<table  class="table table-update">
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
							<input class="btn btn-default updatecancelbutton" type="button" value="취소" OnClick="history.back()">
							<input class="btn btn-default updateupdatebutton" type="submit" value="작성" style="margin-right: 15px">
						</td>
					</tr>		
				</table>
			</form>	
		</div>
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
