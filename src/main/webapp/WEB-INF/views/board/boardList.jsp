<%@page import="site.corin2.paging.PagingBean"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags"%>
<link rel="stylesheet" href="resources/css/board/announceboard.css">
<style>
.pagingdiv{
float : inherit;
}
</style>
<div class="announceboard">
	<div class="announceboardundo">
		<h3>공지사항</h3>

		<table class="table table-hover tableannounce">
			<thead>
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>작성자</th>
					<th>작성일</th>
				</tr>
			</thead>

			<tbody>
				<c:forEach items="${list}" var="list" varStatus="status">
					<c:if test="${status.index >= (page.countPerPage*page.nowPage)-5}">
						<c:if test="${status.index < page.countPerPage*page.nowPage}">
							<tr>
								<td>${status.index+1}</td>
								<td><a href="boardDetail?boardnum=${list.boardNum}&countPerPage=${page.countPerPage}&blockCount=${page.blockCount}&nowPage=${page.nowPage}">${list.announceTitle}</a></td>
								<td>${list.userId}</td>
								<td>${list.boardDate}</td>
							</tr>
						</c:if>
					</c:if>
				</c:forEach>
			</tbody>
		</table>
		<jsp:include page="../paging/paging.jsp">
			<jsp:param name="actionPath" value="boardList" />
			<jsp:param name="totalCount" value="${page.totalCount}" />
			<jsp:param name="countPerPage" value="${page.countPerPage}" />
			<jsp:param name="blockCount" value="${page.blockCount}" />
			<jsp:param name="nowPage" value="${page.nowPage}" />
		</jsp:include>

		<se:authorize access="hasRole('ROLE_ADMIN')">
			<form action="boardInsert" method="get">
				<input type="hidden" name="countPerPage" value="${page.countPerPage}">
				<input type="hidden" name="blockCount" value="${page.blockCount}">
				<input type="hidden" name="nowPage" value="${page.nowPage}">
				<input type="submit" value="글쓰기" class="btn btn-default btn-write">
			</form>

		</se:authorize>
	</div>
</div>