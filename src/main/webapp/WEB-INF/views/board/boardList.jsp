<%@page import="site.corin2.paging.PagingBean"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!-- core 태그 삽입 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 시큐리티 태그 삽입 -->
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags"%>
<!--announceboard css -->
<link rel="stylesheet" href="resources/css/board/announceboard.css">

<div class="announceboard">
	<div class="announceboardundo">
		<h1>Notice</h1>
		<hr>
		<table class="table table-hover tableannounce">
			<thead>
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>작성자</th>
					<th>작성일</th>
				</tr>
			</thead>

			<!-- 페이징 처리 -->
			<tbody>
				<c:forEach items="${list}" var="list1" varStatus="status">
					<c:if test="${status.index >= (page.countPerPage*page.nowPage)-page.countPerPage}">
						<c:if test="${status.index < page.countPerPage*page.nowPage}">
							<tr>
								<td>${total -(status.index+1)+1}</td>
								<td><a href="boardDetail?boardnum=${list1.boardNum}&countPerPage=${page.countPerPage}&blockCount=${page.blockCount}&nowPage=${page.nowPage}">${list1.announceTitle}</a></td>
								<td>${list1.userId}</td>
								<td>${list1.boardDate}</td>
							</tr>
						</c:if>
					</c:if>
				</c:forEach>
			</tbody>
			<!-- 페이징 처리 -->
			
		</table>
		<jsp:include page="../paging/paging.jsp">
			<jsp:param name="actionPath" value="boardList" />
			<jsp:param name="totalCount" value="${page.totalCount}" />
			<jsp:param name="countPerPage" value="${page.countPerPage}" />
			<jsp:param name="blockCount" value="${page.blockCount}" />
			<jsp:param name="nowPage" value="${page.nowPage}" />
		</jsp:include>

		<!-- admin 계정 글쓰기 버튼 시큐리티 적용 -->
		<se:authorize access="hasRole('ROLE_ADMIN')">
			<form action="boardInsert" method="get">
				<input type="hidden" name="countPerPage" value="${page.countPerPage}">
				<input type="hidden" name="blockCount" value="${page.blockCount}">
				<input type="hidden" name="nowPage" value="${page.nowPage}">
				<input type="submit" value="글쓰기" class="btn btn-default btn-write">
			</form>

		</se:authorize>
		<!-- admin 계정 글쓰기 버튼 시큐리티 적용 -->
	</div>
</div>