<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!--announceboard css -->
<link rel="stylesheet" href="resources/css/board/announceboard.css">
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
<!-- swal -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2"></script>
	<div class="announceboardupdate">
		<div class="announceboardundoupdate">
			<h2 id='boardUpdateTitle'>공지사항 작성하기</h2>
			<hr>
			<form id="boardInsert" action="boardInsert"  method="post" >
				<input type="hidden" name="countPerPage" value="${page.countPerPage}">
				<input type="hidden" name="blockCount" value="${page.blockCount}">
				<input type="hidden" name="nowPage" value="${page.nowPage}">
				<table  class="table table-update">
					<tr>
				 		<td>제목</td>
				 		<td><input class ="announceTitle"type="text" name ="announceTitle"></td>
				 	<tr>	
				 	
				 	<tr>
				 		<td>내용</td>
				 		<!-- ckeditor 적용 -->
				 		<td><textarea class="ckeditor" name ="announceContent"></textarea></td> 			 	
				 		<!-- ckeditor 적용 -->
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
	
	<!-- ckeditor 적용 -->
	<script type="text/javascript">			    
		CKEDITOR.replace( 'announceContent',{
				width:'100%',
				height:'400px'
			});
		CKEDITOR.on('dialogDefinition', function( ev ){
				var dialogName = ev.data.name;
				var dialogDefinition = ev.data.definition;
				
			 	switch (dialogName) {
			   		 case 'image':dialogDefinition.removeContents('Link');
					 break;
			 } 
			});
		
		document.querySelector('#boardInsert').addEventListener('submit', function(e) {
			
			  var form = this;
			  e.preventDefault(); // <--- prevent form from submitting
		    swal({
		        title: "작성하시겠습니까?",
		        text: "제목  or 내용을 작성하세요",
		        icon: "success",
		        showCancelButton: true,
		        confirmButtonClass: "btn-danger",
		        confirmButtonText: "확인",
		        cancelButtonText: "취소",
		        closeOnConfirm: false
		    
		      }).then(function(isConfirm) {

		          if($('.announceTitle').val() == "" || $(".announceTitle").val().length ==0){
		          	swal("제목을 입력하세요", "다시 입력하세요", "warning");
		    		    $('.announceTitle').focus();
		    			
		           }else if($('.announceTitle').val().length  > 100){
		              swal("제목 100자 이하로 입력하세요", "다시 입력하세요", "warning");
		     		    $('.announceTitle').focus();
		     		    $('.announceTitle').val("");
		           }else {
		          	 swal("Good job!", "작성완료", "success");
		          	 form.submit(); 
		        } 
		           
			});
		    
		});
	</script>
<!-- ckeditor 적용 -->