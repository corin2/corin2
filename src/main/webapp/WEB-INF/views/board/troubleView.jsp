<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- include summernote(텍스트에디터) css/js -->
<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>

<!-- include hashtags(해쉬태그) css/js -->
<link rel="stylesheet" href="resources/css/board/tagsinput.css">
<script src="resources/js/board/tagsinput.js"></script>
<script src="resources/js/board/troubleshooting.js"></script>
<link rel="stylesheet" href="resources/css/board/troubleshooting.css">

<div class="troublebackdiv">
	<h2 id='boardTitle'>트러블슈팅</h2>
	<hr>
		<div class="container-ts" style="margin-top: 20px;">
		<form action="update?boardNum=${data.boardNum}"
			method="post" name="insfrm">
			<table class="table  table-striped table-bordered table-hover">
				<tr>
					<th><img
						src="https://s3.ap-northeast-2.amazonaws.com/corin2.site/resources/images/profile/${data.userProfile}"
						class="img-circle person" width="30" height="30" />
						${data.userName}님이 ${data.boardDate}에 저장한 트러블슈팅 입니다.</th>
				</tr>
				<tr>
					<td><b>#관련 태그# :</b>&nbsp;<script>
						fncTegSplitAll('${data.hashtag}');
					</script>
					</td>
				</tr>
				<tr>
					<td>
						<h3>
							<span class="glyphicon glyphicon-question-sign"></span>발생한 문제
						</h3>
					</td>
				</tr>
				<tr>
					<td>${data.problem}</td>
					</td>
				</tr>
				<tr>
					<td>
						<h3>
							<span class="glyphicon glyphicon-ok-circle"></span>해결/조치 방법
						</h3>
					</td>
				</tr>
				<tr>
					<td>${data.solution}</td>
				</tr>
			</table>
			<div>
				<!-- 본인이 쓴 게시물만 수정, 삭제가 가능하도록 처리 -->
    			<c:if test="${pageContext.request.userPrincipal.name == data.userId}">								
					<a href="troubleEdit?boardNum=${data.boardNum}" class="btn btn-primary" type="button ">수정</a>
					<a href="delete?boardNum=${data.boardNum}&pNum=${data.projectNum}" class="btn btn-danger" type="button ">삭제</a>
				</c:if>
				<input type="button" class="btn btn-primary" value="목록으로" OnClick="history.back()">
			</div>
			<input type="hidden" name="projectNum" value="${sessionScope.sessionProjectNum}" /> 
			<input type="hidden" name="userId" value="${pageContext.request.userPrincipal.name}" />
		</form>
	
		</div>
</div>
