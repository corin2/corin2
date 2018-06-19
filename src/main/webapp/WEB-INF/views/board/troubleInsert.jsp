<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link rel="stylesheet" href="resources/css/board/tagsinput.css">
<script src="resources/js/board/tagsinput.js"></script>

<script type="text/javascript">			    
	//페이지 생성완료 후에 섬머노트를 loading, 태그란에 마우스포인터 위치
	$(document).ready(function() {
		  $('#summernote').summernote();
		  $('#summernote2').summernote();
			
		  //최초커서위치를 hashtag로 이동.
		  document.insfrm.hashtag.focus();
	});
	
</script>

<!-- include summernote css/js -->
<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet">
<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
<h2 id='boardTitle'>트러블슈팅 등록</h2>
	<div class="container" style="margin-top: 20px;">
		<form action="insert"  method="post" name="insfrm" >
				<b>태그등록 :</b> 
				<input type="text" name="hashtag" data-role="tagsinput" placeholder="Add tags" />
				<!-- <input type='text' class='form-control' data-role='tagsinput' 
				onkeypress="if(event.keyCode==13 || event.keyCode==32) {divAddTag(this);}" >-->
	 			<!-- <label onclick="hashTagText()">생성</label> -->
	 		<br />
			<h3>발생한 문제</h3>
			<textarea id="summernote" name="problem"></textarea>
			<h3>해결/조치 방법</h3>
			<textarea id="summernote2" name="solution"></textarea>
			<div><input type="submit" value="작성" style="margin-right: 15px">
			<input type="button" value="취소" OnClick="history.back()"></div>
			
		</form>	

	</div>
	<form method="post">
  		
	</form>
	
