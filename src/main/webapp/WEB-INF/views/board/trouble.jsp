<%@page import="site.corin2.paging.PagingBean"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="stylesheet" href="resources/css/board/troubleshooting.css">
<script src="resources/js/board/troubleshooting.js"></script>

<div class="troublebackdiv">
	<!--jasper test --> 
	<div id="troubleContent">
		<h2 id='boardTitle'>팀 트러블슈팅</h2>
		<hr>
		<ul class="nav nav-tabs ">
			<li><a id="memberts" href="trouble?projectNum=${sessionScope.sessionProjectNum}">팀 트러블슈팅</a></li>
			<li><a id="allts" href="troubleAll?countPerPage=5&blockCount=5&nowPage=1">전체 트러블슈팅</a></li>
		</ul>
	</div>
	
	<div id="search-area" style="margin: 0 30px 0 30px;">
		<form  action="searchAct" method="post" class="navbar-form navbar-left" role="search">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Search" name="search" />
				<input type="hidden" name="type" value="title" />
				<input type="hidden" name="projectNum" value="${sessionScope.sessionProjectNum}" />
			</div>
			<button type="submit" class="btn btn-primary">
				<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
				검색
			</button>
			<a href="generateReport?file=troubleShooting&projectNum=${sessionScope.sessionProjectNum}&userId=${pageContext.request.userPrincipal.name}"><button type="button"
				class="btn btn-primary btn-wide">
				<span class="glyphicon glyphicon-print" aria-hidden="true"></span> PDF 저장
			</button></a>
			<a href="troubleins"><button type="button"
				class="btn btn-primary btn-wide">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
				새 글 쓰기
			</button></a>
	
		</form>
	</div>
	
	<br>
	
	<form action="update" method="post">
		<table class="table  table-striped table-bordered table-hover">
			<thead>
				<tr>
					<th>NO</th>
					<th>작성자</th>
					<th>트러블슈팅</th>
					<th>작성일</th>
				</tr>
			</thead>
			
			<!-- 페이징 처리 -->
			<tbody>
				<c:forEach items="${data}" var="list1" varStatus="status">
					<c:if test="${status.index >= (page.countPerPage*page.nowPage)-page.countPerPage}">
						<c:if test="${status.index < page.countPerPage*page.nowPage}">
							<tr>
								<td>${list1.boardNum}</td>
								<td><img
									src="https://s3.ap-northeast-2.amazonaws.com/corin2.site/resources/images/profile/${list1.userProfile}"
									 class="img-circle person" width="30" height="30" /><br>${list1.userName}</td>
								<td id="tags" align=left>
								<script>fncTegSplit('${list1.hashtag}',${sessionScope.sessionProjectNum});</script>
								<br><br><a href="troubleView?boardNum=${list1.boardNum}">${list1.problem}</a>
								</td>
								<td>${list1.boardDate}</td>
							</tr>
						</c:if>
					</c:if>
				</c:forEach>
			</tbody>
			<!-- 페이징 처리 -->
			
		</table>
		<div align="center">
		<table>
		<jsp:include page="../paging/paging.jsp">
			<jsp:param name="actionPath" value="trouble" />
			<jsp:param name="totalCount" value="${page.totalCount}" />
			<jsp:param name="countPerPage" value="${page.countPerPage}" />
			<jsp:param name="blockCount" value="${page.blockCount}" />
			<jsp:param name="nowPage" value="${page.nowPage}" />
		</jsp:include>
		</table>
		</div>
	</form>
</div>