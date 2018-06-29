<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="resources/css/board/announceboard.css">
    <style>
	.announceboard {
    background-color: #FFF;
    margin-top: 110px;
    margin-right: 200px;
    margin-left: 200px;
    border-radius: 20px;
	}
	.announceboardundo{
	font-weight : bold;
    font-size: 20px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin-right: 250px;
    margin-left: 250px;
	}
	
	</style>
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
	<div class="announceboard">
		<div class="announceboardundo">
			<form action="boardInsert"  method="post" >
				<input type="hidden" name="countPerPage" value="${page.countPerPage}">
				<input type="hidden" name="blockCount" value="${page.blockCount}">
				<input type="hidden" name="nowPage" value="${page.nowPage}">
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
