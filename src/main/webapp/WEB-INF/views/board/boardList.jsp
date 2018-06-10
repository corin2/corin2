<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   

    <title></title>
    
</head>
<body>

    

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
		  <h2>공지사항</h2>

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

	
		 	<form action="boardInsert" method="get">
		  		<input type="submit" value="글쓰기">
			</form>
		</div>
    
    </body>
        <script type="text/javascript">
	    (function(){
	
	    	  var requestPermissionButton = $("#requestPermissionButton");
	    	    var notificationButton = $("#notificationButton");
	    	    var notificationMessage = $("#notificationMessage");
	
				 var iconDataURI ="resources/images/user.png"
	    	    //데스크탑 알림 버튼을 누르면,
	    	    notificationButton.on("click", function () {
	    	        var message = notificationMessage.val();
	    	        
	    	        //메시지를 입력한 경우에만,
	    	        if (message !== null && message.length > 0) {
	    	            
	    	            var options = {
	    	                body: message,
	    	                icon: iconDataURI
	    	            }
	    	           
	    	            //데스크탑 알림 요청
	    	            var notification = new Notification("ddddd", options);
	    	            
	    	            
	    	            //알림 후 5초 뒤,
	    	            setTimeout(function () {
	    	                //얼람 메시지 닫기
	    	                notification.close();
	    	            }, 5000);
	    	        }
	    	    });	   	
	    	})();
  
    </script>
    
</html>