<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- Firebase js -->
<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>

<!-- font-awesome css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- chatting css -->
<link rel="stylesheet" type="text/css" href="resources/css/chatting/chatting.css">

<style>
/* 	.chattingPane {
		width: 500px;
	}
    #mainDialogs {
        height: 600px;
    }
    p {
    	color: black;
    } */
</style>

<!-- content -->
<div class="container app">
  <div class="row app-one">
    <div class="col-sm-4 side">
      <div class="side-one">
        <div class="row heading">
          <div class="col-sm-3 col-xs-3 heading-avatar">
            <div class="heading-avatar-icon">
              <img src="https://pbs.twimg.com/profile_images/887622532647469056/IG7Zk1wS_400x400.jpg">
            </div>
          </div>
          <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
            <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
          </div>
          <div class="col-sm-2 col-xs-2 heading-compose  pull-right">
            <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
          </div>
        </div>
        
        <!-- 검색창 -->
        <div class="row searchBox">
          <div class="col-sm-12 searchBox-inner">
            <div class="form-group has-feedback">
              <input id="searchText" type="text" class="form-control" name="searchText" placeholder="Search">
              <span class="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
          </div>
        </div>
		
		<!-- 유저리스트 -->
        <div class="row sideBar">
          <!-- 유저 -->
          <!-- <div class="row sideBar-body">
            <div class="col-sm-3 col-xs-3 sideBar-avatar">
              <div class="avatar-icon">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png">
              </div>
            </div>
            <div class="col-sm-9 col-xs-9 sideBar-main">
              <div class="row">
                <div class="col-sm-8 col-xs-8 sideBar-name">
                  <span class="name-meta">John Doe
                </span>
                </div>
                <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                  <span class="time-meta pull-right">18:18
                </span>
                </div>
              </div>
            </div>
          </div> -->
		  
<!-- 경계 -->
        </div>
      </div>
    </div>
      
	<!-- 대화창 시작 -->
    <div class="col-sm-8 conversation">
      <div class="row heading">
        <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
          <div class="heading-avatar-icon">
            <img src="https://pbs.twimg.com/profile_images/887622532647469056/IG7Zk1wS_400x400.jpg">
          </div>
        </div>
        <div class="col-sm-8 col-xs-7 heading-name">
          <a class="heading-name-meta">John Doe
          </a>
          <span class="heading-online">Online</span>
        </div>
        <div class="col-sm-1 col-xs-1  heading-dot pull-right">
          <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
        </div>
      </div>
	  
	  <!-- 메인 대화창 -->
      <div class="row message" id="conversation">
<!--         <div class="row message-previous">
          <div class="col-sm-12 previous">
            <a onclick="previous(this)" id="ankitjain28" name="20">
                        코린이 채팅
            </a>
          </div>
        </div> -->
        <div id="mainDialogs"></div>
		
		<!-- 타인 메시지 -->
        <!-- <div class="row message-body">
          <div class="col-sm-12 message-main-receiver">
            <div class="receiver">
              <div class="message-text">
               Hi, what are you doing?!
              </div>
              <span class="message-time pull-right">
                Sun
              </span>
            </div>
          </div>
        </div> -->
		
		<!-- 자신 메시지 -->
        <!-- <div class="row message-body">
          <div class="col-sm-12 message-main-sender">
            <div class="sender">
              <div class="message-text">
                I am doing nothing man!
              </div>
              <span class="message-time pull-right">
                Sun
              </span>
            </div>
          </div>
        </div>
      </div> -->

      </div>
      <div class="row reply">
        <div class="col-sm-1 col-xs-1 reply-emojis">
          <i class="fa fa-smile-o fa-2x"></i>
        </div>
        <div class="col-sm-9 col-xs-9 reply-main">
          <textarea class="form-control" rows="1" id="messageText"></textarea>
        </div>
        <div class="col-sm-1 col-xs-1 reply-recording">
          <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
        </div>
        <div class="col-sm-1 col-xs-1 reply-send" id="sendMessageBtn">
          <i class="fa fa-send fa-2x" aria-hidden="true"></i>
        </div>
    </div>
  </div>
</div>

<script src="resources/js/chatting/chatting.js"></script>






<!-- <div class="container-fluid">
    <div class="chattingUser">
    	<p>[현재 유저]</p>
    	<img src="resources/profile/nogon.JPG" class="img-circle person" width="30" height="30">
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
</div> -->


