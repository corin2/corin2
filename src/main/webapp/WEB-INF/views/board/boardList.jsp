<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
  <!-- ckedior -->
  <script src="https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js"></script>
  <script src="resources/js/board/vendor/jquery.ui.widget.js"></script>
  <script src="resources/js/board/jquery.iframe-transport.js"></script>
  <script src="resources/js/board/jquery.fileupload.js"></script>
  <script src="resources/js/board/myuploadfunction.js"></script>  
  <link href="resources/css/board/dropzone.css" type="text/css" rel="stylesheet" />

	<div id="notificationBlock" class="form-group">
	    <label class="control-label">알림 메시지</label>
	    <div class="input-group">
	        <span class="input-group-addon">메시지</span>
	   			<input id="notificationMessage" type="text" class="form-control" />
	        <span class="input-group-btn">
	            <button id="notificationButton" class="btn btn-info" type="button" >알림</button>
	        </span>
	    </div>
	</div>
	
	
	<div class="container">	
		
		    <h3>공지사항</h3>
		  
				  <table class="table table-bordered">
				    <thead>
				      <tr>
				        <th>번호</th>
				        <th>제목</th>
				        <th>작성자</th>
				        <th>작성일</th>
				      </tr>
				    </thead>
		
				    <tbody>
				    <c:forEach items="${list}" var="list">
				      <tr>
				        <td>${list.boardNum}</td>
				        <td><a href="boardDetail?boardnum=${list.boardNum}">${list.announceTitle}</a></td>
				        <td>${list.userId}</td>
				        <td>${list.boardDate}</td>
				      </tr>
					</c:forEach>
				    </tbody>
				  </table>
				  <div>
				    <ul class="pagination pagination-lg">
					    <li><a href="#">1</a></li>
					    <li><a href="#">2</a></li>
					    <li><a href="#">3</a></li>
					    <li><a href="#">4</a></li>
					    <li><a href="#">5</a></li>
					</ul>
				  </div>
		    	<form action="boardInsert" method="get">
				 <%-- 	<se:authorize access= hasRole('ROLE_ADMIN')"> --%>
						<input type="submit" value="글쓰기"  class="btn btn-default">
				<%-- 	</se:authorize>  --%>
				  		
				</form>
		    </div>
