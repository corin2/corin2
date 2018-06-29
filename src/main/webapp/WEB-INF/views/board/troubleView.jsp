<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- include summernote(텍스트에디터) css/js -->
<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>

<!-- include hashtags(해쉬태그) css/js -->
<link rel="stylesheet" href="resources/css/board/tagsinput.css">
<script src="resources/js/board/tagsinput.js"></script>

<script type="text/javascript">			    
	//페이지 생성완료 후에 섬머노트를 loading, 태그란에 마우스포인터 위치
	$(document).ready(function() {
		  $('#summernote').summernote({
			  onblur : function(e) {
		            $('#summercontent').html($('#summernote').code());
		        },
		    height : 200, // set editor height
		    width : 900, // set editor width
		    
		    airMode:true
		  });
		  $('#summernote2').summernote({
			  onblur : function(e) {
		            $('#summercontent').html($('#summernote').code());
		        },
		    height : 200, // set editor height
		    width : 900, // set editor width
		    
		    airMode:true
		  });
	});
	function editts(){
			//todo: 수정시 처리
			
		}
</script>


<h2 id='boardTitle'>트러블슈팅 등록</h2>
	<div class="container-ts" style="margin-top: 20px;">
	<form action="update?boardNum=${data.boardNum}"
		method="post" name="insfrm">
		<b>태그등록 :</b> <input type="text" name="hashtag" data-role="tagsinput"
			placeholder="Add tags" value=${data.hashtag}></input> <br />
		<h3>발생한 문제</h3>
		<textarea id="summernote" name="problem">${data.problem}</textarea>
		<h3>해결/조치 방법</h3>
		<textarea id="summernote2" name="solution">${data.solution}</textarea>
		<div>
			<button id="edit" class="btn btn-primary" onclick="editts()" type="button">수정</button>
			<input type="submit" class="btn btn-primary" value="작성" style="margin-right: 15px">
			<a href="delete?boardNum=${data.boardNum}" class="btn btn-danger" type="button ">삭제</a>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<input type="button" class="btn btn-warning" value="취소" OnClick="history.back()">
		</div>
		<input type="hidden" name="projectNum"
			value="${sessionScope.sessionProjectNum}" /> <input type="hidden"
			name="userId" value="${pageContext.request.userPrincipal.name}" />
	</form>

</div>
