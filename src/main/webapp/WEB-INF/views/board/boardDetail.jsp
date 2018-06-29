<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
	
	<div class="container" style="margin-top: 60px;">
		<form action="" method="get" >
			<table class="table table-bordered">
			<tr>
			 	<td>글번호</td>
			 		<td>${detail.boardNum}</td>
			 	<tr>
				<tr>
			 		<td>제목</td>
			 		<td>${detail.announceTitle}</td>
			 	<tr>	
			 	<tr>
			 		<td>작성자</td>
			 		<td>${detail.userId} </td>
			 		
			 	
			 	</tr>
			 	<tr>
			 		<td>작성일</td>
			 		<td>${detail.boardDate}</td>
			 	</tr>
			 	<tr>
			 		<td>내용</td>
			 		<td>${detail.announceContent}</td> 			 	
			 	</tr>		
				<tr>
					<td></td>
					<td>

						<input type="button" value="목록가기" onclick="location.href='boardList'">
							
				  		<se:authorize access= "hasRole('ROLE_ADMIN')">  
							<input type="button" value="수정" onclick="location.href='boardUpdate?boardnum=${detail.boardNum}'">
							<input type="button" value="삭제" onclick="location.href='boardDelete?boardnum=${detail.boardNum}'">
						</se:authorize>  
							
					</td>
				</tr>		
			</table>
		</form>	

	</div>