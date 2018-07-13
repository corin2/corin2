<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- core 태그 삽입 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!--announceboard css -->
<link rel="stylesheet" href="resources/css/board/announceboard.css">
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2"></script>
	<div class="announceboardupdate">
		<div class="announceboardundoupdate">
			<h2 id='boardUpdateTitle'>공지사항 수정하기</h2>
			<hr>
			<form id="boardUpdate" action="boardUpdate?boardnum=${detail.boardNum}" method="post">
				<input type="hidden" name="countPerPage" value="${page.countPerPage}">
				<input type="hidden" name="blockCount" value="${page.blockCount}">
				<input type="hidden" name="nowPage" value="${page.nowPage}">
				<table class="table table-update">
					<tbody>
						<tr>
							<td>글번호</td>
							<td><input type="text" name="boardNum" readonly="readonly"
								value="${detail.boardNum}"></td>
						</tr>
						<tr>
							<td>제목</td>
							<td><input class="announceTitle" type="text" name="announceTitle"
								value="${detail.announceTitle}"></td>
						</tr>
						<tr>
							<td>작성자</td>
							<td><input type="text" name="userId" readonly="readonly"
								value="${detail.userId}"></td>
		
		
						</tr>
						<tr>
							<td>작성일</td>
							<td><input type="text" name="boardDate"
								value="${detail.boardDate}" readonly="readonly"></td>
						</tr>
						<tr>
							<td>내용</td>				 		
							<!-- ckeditor 적용 -->
							<td><textarea class="ckeditor" name="announceContent">${detail.announceContent}</textarea></td>
					 		<!-- ckeditor 적용 -->
						</tr>
						<tr>
							<td></td>
							<td>
							<input type="button" class="btn btn-default updatecancelbutton" value="취소" OnClick="history.back()">
							<input class="btn btn-default updateupdatebutton" type="submit" value="수정"> 
							</td>
						</tr>
					</tbody>
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
	                case 'image': 
	                    dialogDefinition.removeContents('Link');
	                    break;
	            }
	        });
	       
	     document.querySelector('#boardUpdate').addEventListener('submit', function(e) {
	 		  var form = this;
	 		  e.preventDefault(); // <--- prevent form from submitting
	     swal({
	         title: "수정하시겠습니까?",
	         text: "제목  or 내용을 수정하세요",
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
