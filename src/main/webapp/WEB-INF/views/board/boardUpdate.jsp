<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- core 태그 삽입 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!--announceboard css -->
<link rel="stylesheet" href="resources/css/board/announceboard.css">
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
	<div class="announceboardupdate">
		<div class="announceboardundoupdate">
			<h2 id='boardUpdateTitle'>공지사항 수정하기</h2>
			<hr>
			<form action="boardUpdate?boardnum=${detail.boardNum}" method="post">
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
							<td><input type="text" name="announceTitle"
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
	</script>
	<!-- ckeditor 적용 -->
