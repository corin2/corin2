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
<script type="text/javascript">			    
	//페이지 생성완료 후에 섬머노트를 loading, 태그란에 마우스포인터 위치
	$(document).ready(function() {
		  $('#summernote').summernote({
			  onblur : function(e) {
		            $('#summercontent').html($('#summernote').code());
		        },
		    height : 120, // set editor height
		    
		  });
		  $('#summernote2').summernote({
			  onblur : function(e) {
		            $('#summercontent').html($('#summernote').code());
		        },
		    height : 130, // set editor height
		    
		  });
	});
	function editts(){
			//todo: 수정시 처리
			
		}
</script>

<div class="troublebackdiv">
	<h2 id='boardTitle'>트러블슈팅</h2>
	<hr>
		<div class="container-ts" style="margin-top: 20px;">
		<form action="update?boardNum=${data.boardNum}"
			method="post" name="insfrm">
			<table class="table  table-striped table-bordered table-hover">
				<tr>
					<th><img
						src="resources/images/profile/${data.userProfile}"
						class="img-circle person" width="30" height="30" />
						${data.userName}님이 ${data.boardDate}에 저장한 트러블슈팅 입니다.</th>
				</tr>
				<tr>
					<td><b>태그 입력후 엔터키 :</b>
					<input type="text" name="hashtag" id="hashtagEdit" data-role="tagsinput" placeholder="Add tags" />
					<script>
						var e = $.Event( "keypress", { which: 13 } );
						$('#hashtagEdit').val('${data.hashtag}');
						$('#hashtagEdit').trigger(e);
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
					<td><textarea id="summernote" name="problem">${data.problem}</textarea>
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
					<td><textarea id="summernote2" name="solution">${data.solution}</textarea>
					</td>
				</tr>
			</table>
			<div>
				<input type="submit" class="btn btn-primary" value="저장하기" style="margin-right: 15px">
				<input type="button" class="btn btn-primary" value="취소하기" OnClick="history.back()">
			</div>
			<input type="hidden" name="projectNum"
				value="${sessionScope.sessionProjectNum}" /> <input type="hidden"
				name="userId" value="${pageContext.request.userPrincipal.name}" />
		</form>
	
		</div>
</div>
