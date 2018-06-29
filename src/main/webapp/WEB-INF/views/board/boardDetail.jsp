<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
<link rel="stylesheet" href="resources/css/board/announceboard.css">
<div class="announceboardupdate">
	<div class="announceboardundoupdate">
		<h2 id='boardUpdateTitle'>공지사항 상세보기</h2>
		<hr>
		<form action="" method="get">
			<table class="table table-update">
				<tr>
					<td>글번호</td>
					<td>${detail.boardNum}</td>
				</tr>
				<tr>
					<td>제목</td>
					<td>${detail.announceTitle}</td>
				</tr>
				<tr>
					<td>작성자</td>
					<td>${detail.userId}</td>
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
					<td>
					</td>
					<td><input type="button" value="목록가기" class="btn btn-default updateupdatebutton"
						onclick="location.href='boardList?countPerPage=${page.countPerPage}&blockCount=${page.blockCount}&nowPage=${page.nowPage}'"> <se:authorize
							access="hasRole('ROLE_ADMIN')">
							<input type="button" class="btn btn-default updatecancelbutton" value="삭제"
								onclick="location.href='boardDelete?boardnum=${detail.boardNum}&countPerPage=${page.countPerPage}&blockCount=${page.blockCount}&nowPage=${page.nowPage}'">
							<input type="button" class="btn btn-default updateupdatebutton" value="수정"
								onclick="location.href='boardUpdate?boardnum=${detail.boardNum}&countPerPage=${page.countPerPage}&blockCount=${page.blockCount}&nowPage=${page.nowPage}'">
						</se:authorize></td>
				</tr>
			</table>
		</form>
	</div>
</div>