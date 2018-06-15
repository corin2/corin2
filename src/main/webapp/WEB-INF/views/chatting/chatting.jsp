<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
<style>
	.chattingPane {
		width: 500px;
	}
    #mainDialogs {
        height: 600px;
    }
</style>

<div class="container-fluid">
    <div>
    	<br>
    	<p>[현재 유저]</p>
    	<h3 id="currentUser"></h3>
    </div>
    <div class="row">
        <div class="col-sm-6 chattingPane" id="userList" style="background-color:lavender;">
            <h1>Users</h1>
        </div>
        <div class="col-sm-6 chattingPane" id="mainDialogs" style="background-color:lavenderblush;">
            <h1>대화창</h1>
        </div>
        <div class="message">
            <span id="selectedUser"></span>
            <input type="text" id="messageText">
            <input type="button" id="sendMessageBtn" value="Send">
            <input type="button" id="input" value="Input">
        </div>
    </div>

</div>

<script src="resources/js/chatting/chatting.js"></script>
