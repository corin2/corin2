<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
	
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
				  
				  <se:authorize access= "hasRole('ROLE_ADMIN')">  
		    	  <form action="boardInsert" method="get">
						<input type="submit" value="글쓰기"  class="btn btn-default">
				  </form>
				
				  </se:authorize>  
		    </div>
