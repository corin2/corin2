<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%

//////////페이징 유틸jsp //////////
String actionPath = request.getParameter("actionPath");
String sNowPage = request.getParameter("nowPage");
String sTotalCount = request.getParameter("totalCount");
String sCountPerPage = request.getParameter("countPerPage");
String sblockCount = request.getParameter("blockCount");

int nowPage = (sNowPage == null || sNowPage.trim().equals("")) ? 1 : Integer.valueOf(sNowPage);
int totalCount = (sTotalCount == null || sTotalCount.trim().equals("")) ? 0 : Integer.valueOf(sTotalCount);
int countPerPage = (sCountPerPage == null || sCountPerPage.trim().equals("")) ? 1 : Integer.valueOf(sCountPerPage);
int countPerBlock = (sblockCount == null || sblockCount.trim().equals("")) ? 1 : Integer.valueOf(sblockCount);

int totalPage = (int)( (totalCount-1)/countPerPage ) + 1;
if(totalPage == 0) totalPage = 1 ;

int totalBlock   = (int)((totalPage-1)/(countPerBlock));
int nowBlock     = (int)((nowPage - 1) / countPerBlock);
int firstPage = 0;
int prevPage = 0;
int nextPage = 0;
int lastPage = 0;

if (nowBlock > 0) {
	firstPage = 1;
}
if( nowPage > 1 ) {
	prevPage = nowPage - 1;
}

int startPage = nowBlock * countPerBlock + 1;
int endPage = countPerBlock * (nowBlock + 1);

if ( endPage > totalPage ) endPage = totalPage;


if( nowPage < totalPage ) {
	nextPage = nowPage + 1;
}
if( nowBlock < totalBlock ) {
	lastPage = totalPage;
}
%>
<div class="pagingdiv">
	<ul class="pagination pagination-lg">
		<%if (firstPage > 0) { %>
		<li><a href="<%=actionPath%>?countPerPage=<%=countPerPage%>&blockCount=<%=countPerBlock%>&nowPage=<%=firstPage%>">처음</a></li>
		<%} %>
		<%if (prevPage > 0) { %>
		<li><a href="<%=actionPath%>?countPerPage=<%=countPerPage%>&blockCount=<%=countPerBlock%>&nowPage=<%=prevPage%>">이전</a></li>
		<%} %>
		<%for (int indexI = startPage; indexI <= endPage; indexI++) { %>
			<%if (indexI == nowPage) { %>
			<li><a style="background-color: black;	color: white;"><%=indexI %></a></li>
			<%} else { %>
			<li><a href="<%=actionPath%>?countPerPage=<%=countPerPage%>&blockCount=<%=countPerBlock%>&nowPage=<%=indexI%>"><%=indexI %></a></li> 
			<%} %>
		<%} %>
		<%if (nextPage > 0) { %>
		<li><a href="<%=actionPath%>?countPerPage=<%=countPerPage%>&blockCount=<%=countPerBlock%>&nowPage=<%=nextPage%>">다음</a></li>
		<%} %>
		<%if (lastPage > 0) { %>
		<li><a href="<%=actionPath%>?countPerPage=<%=countPerPage%>&blockCount=<%=countPerBlock%>&nowPage=<%=lastPage%>">마지막</a></li>
		<%} %>
	</ul>
</div>
