<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<style>
	.table>tbody>tr>td {
	border-top : 0px;
	}
	
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
	
	.announceboard input {
	border : 0px;
	border-bottom : solid 1px;
	}
	
	.table-update > tbody > tr > td {
	font-size: 14px;
	padding-bottom: 30px !important;
	}
	.table-update > tbody > tr > td > input {
	color: #000 !important;
	}
	.table-update > tbody > tr :first-child {
	color: #c6c4c4;
	}
	</style>
<!-- ckedior -->
<script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
<div class="announceboard">
	<div class="announceboardundo">
		<form action="boardUpdate?boardnum=${detail.boardNum}" method="post">
			<table class="table table-update">
				<tbody>
					<tr>
						<td>글번호</td>
						<td><input type="text" name="boardNum" readonly="readonly"
							value="${detail.boardNum}"></td>
					<tr>
					<tr>
						<td>제목</td>
						<td><input type="text" name="announceTitle"
							value="${detail.announceTitle}"></td>
					<tr>
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
						<td><textarea class="ckeditor" name="announceContent">${detail.announceContent}</textarea>
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
								</script></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="submit" value="수정"> <input
							type="button" value="취소" OnClick="history.back()"></td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</div>


