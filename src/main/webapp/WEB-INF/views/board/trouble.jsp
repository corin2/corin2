<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- Google Icon -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<div id="content-md">
	<h2 id='boardTitle'>트러블슈팅 게시판</h2>

	<ul class="nav nav-tabs">
		<li><a id="member" onclick='teamlist()'>팀 트러블슈팅</a></li>
		<li><a id="group" onclick='alllist()'>전체 트러블슈팅</a></li>
	</ul>
</div>

<div id="search-area" style="margin: 0 30px 0 30px;">
	<br> <i class="material-icons">search</i><input type="text" /> <input
		type="button" value="검색" class="btn btn-primary" /> <input
		class="btn btn-primary" data-toggle="modal" data-target="#myModal1"
		type="button" id="mamodal1" value="추가" style="float: right;">

	<!-- 글쓰기 모달영역 start -->
	<div id="myModal1" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">새 트러블 슈팅</h4>
				</div>
				<form action="insert">
					<div class="form-group">
						<div class="form-row">
							<div class="col-md-12">
								<label for="exampleInputName">문제:</label> <input
									class="form-control" name="problem" type="text"
									placeholder="trouble">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="form-row">
							<div class="col-md-12">
								<label for="exampleInputEmail1">해결:</label> <input
									class="form-control" name="solution" type="text"
									placeholder="shooting">
							</div>
							&nbsp;<br />
						</div>
					</div>
					<input type="submit" value="추가하기" class="btn btn-primary btn-block">

				</form>
			</div>
		</div>
	</div>
	<!-- 글쓰기 모달영역 end -->
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
			<th>편집</th>
		</tbody>

		<c:forEach items="${data}" var="ts">
			<tr>
				<td>${ts.boardNum}</td>
				<td>${ts.userName}<br> <img
					src="${pageContext.request.contextPath}/resources/profile/${ts.userProfile}"
					class="img-circle person" width="30" height="30" /></td>
				<td>${ts.problem}<hr>${ts.solution}</td>
				<td>${ts.boardDate}</td>
				<td><input type="button" value="수정" class="btn btn-info"
					onclick="edit(this, ${ts.boardNum},'${ts.userName}','${ts.problem}', '${ts.solution}','${ts.boardDate}') " />
					<a href="delete?boardNum=${ts.boardNum}" class="btn btn-danger"
					type="button ">삭제</a></td>
			</tr>
		</c:forEach>
	</table>
</form>

<!-- 게시글수정스크립트 edit();-->
<script type="text/javascript">
	function edit(obj, boardNum, userName, problem, solution, boardDate) {
		console.log("안녕");
	    var htmlString = '<td><input type=label name="boardNum" value="'+boardNum+'" readonly></td>'
						 +'<td><input type=label name="userName" value="'+userName+'" readonly></td>'
						 +'<td><input type=text name="problem" class="form-control" value="'+problem+'" ><hr><input type=textarea name="solution" class="form-control" value="'+solution+'" ></td>'
						 +'<td><input type=label name="boardDate" value="'+boardDate+'" readonly></td>' 
						 +'<td><input type="submit" class="btn btn-success" value="완료"></td>';
	    	
	    				
	    $(obj).closest("tr").html(htmlString);
	};
</script>
