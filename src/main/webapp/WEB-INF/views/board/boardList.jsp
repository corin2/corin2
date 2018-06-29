<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="se" uri="http://www.springframework.org/security/tags" %>
	<style>
	.announceboard {
    background-color: #FFF;
    margin-top: 110px;
    margin-right: 200px;
    margin-left: 200px;
    border-radius: 20px;
	}
	.announceboardundo{
    font-size: 15px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin-right: 250px;
    margin-left: 250px;
	}
	.tableannounce{
	height: 50px;
	}
	.tableannounce > tbody > tr {
    height: 55px;
	}
	.tableannounce > thead > tr {
	border-top: 2px solid;
    height: 50px;
	}
	.tableannounce > thead > tr > th {
	padding-top : 0px !important;
	vertical-align: inherit;
	}
	.tableannounce > thead > tr :first-child {
	text-align: center;
	}
	.tableannounce > thead > tr :nth-child(2)  {
	text-align: center;
	}
	.tableannounce > thead > tr :nth-child(3)  {
	text-align: center;
	}
	.tableannounce > tbody > tr :nth-child(3)  {
	text-align: center;
	}
	.tableannounce > tbody > tr :first-child {
	text-align: center;
	}
	.tableannounce > thead > tr :last-child {
	text-align: center;
	}
	.tableannounce > tbody > tr :last-child {
	text-align: center;
	}
	.announceboardundo > h3{
    margin-bottom: 60px;
    }
    .btn-write {
    float: right;
    border-radius: 20px;
    border: solid 1px;
    height: 40px;
    width: 100px;
	}
    .pagination{
    float: left;
    }
	</style>
	<div class="announceboard">	
		<div class="announceboardundo">
		    <h3>공지사항</h3>
		  
				  <table class="table table-hover tableannounce">
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
						<input type="submit" value="글쓰기"  class="btn btn-default btn-write">
				  </form>
				
				  </se:authorize>  
		</div>
	</div>
