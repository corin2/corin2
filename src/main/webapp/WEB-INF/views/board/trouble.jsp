<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script>
//태그 값을 불러와 ',' 단위로 잘라서 tag버튼들을 생성하는 스크립트.
function fncTegSplit(str){

	var result='';
	var split = str.split(',');
	var i  = 0;

	for( i; i<split.length; i++ ){
		switch(i){
			case 0:
				result += "<a href='searchTag?searchTag="+split[i]+"'><span class='label label-primary'>#";
				break;
			case 1:
				result += "<a href='searchTag?searchTag="+split[i]+"'><span class='label label-success'>#";
				break;
			case 2:
				result += "<a href='searchTag?searchTag="+split[i]+"'><span class='label label-info'>#";
				break;
			case 3:
				result += "<a href='searchTag?searchTag="+split[i]+"'><span class='label label-warning'>#";
				break;
			case 4:
				result += "<a href='searchTag?searchTag="+split[i]+"'><span class='label label-danger'>#";
				break;
		}
 		result += split[i];
 		result += "</span></a>&nbsp&nbsp";
 		
	}
	
	document.write(result);	
}

</script>

<div id="troubleContent">
	<h2 id='boardTitle'>팀 트러블슈팅</h2>

	<ul class="nav nav-tabs ">
		<li><a id="memberts" href="trouble?projectNum=${sessionScope.sessionProjectNum}">팀 트러블슈팅</a></li>
		<li><a id="allts" href="troubleAll">전체 트러블슈팅</a></li>
	</ul>
</div>

<div id="search-area" style="margin: 0 30px 0 30px;">
	<form  action="search" method="post" class="navbar-form navbar-left" role="search">
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Search" name="searchWord">
		</div>
		<button type="submit" class="btn btn-primary">
			<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
			검색
		</button>
		<button type="button" class="btn btn-success btn-wide">
			<span class="glyphicon glyphicon-th" aria-hidden="true"></span> 액셀 저장
		</button>
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
		<br>
		<tbody>
			<th>NO</th>
			<th>작성자</th>
			<th>트러블슈팅</th>
			<th>작성일</th>
		</tbody>

		<c:forEach items="${data}" var="ts">
			<tr>
				<td>${ts.boardNum}</td>
				<td align=center><img
					src="${pageContext.request.contextPath}/resources/images/profile/${ts.userProfile}"
					 class="img-circle person" width="30" height="30" /><br>${ts.userName}</td>
				<td id="tags">
				<script>fncTegSplit('${ts.hashtag}');</script>
				<br><br><a href="troubleView?boardNum=${ts.boardNum}">${ts.problem}</a>
				</td>
				<td>${ts.boardDate}</td>
			</tr>
		</c:forEach>
	</table>
	
</form>
