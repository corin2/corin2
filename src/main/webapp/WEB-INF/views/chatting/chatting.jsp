<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- font-awesome css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- chatting css -->
<link rel="stylesheet" type="text/css" href="resources/css/chatting/chatting.css">
<!-- Emoji Picker css -->
<!-- <link rel="stylesheet" type="text/css" href="resources/js/chatting/lib/css/emoji.css"> -->
<!-- emojiarea css -->
<!-- <link rel="stylesheet" type="text/css" href="resources/js/chatting/emojiarea/jquery.emojiarea.css"> -->
<!-- emojione css -->
<link rel="stylesheet" type="text/css" href="resources/js/chatting/emojione/dist/emojionearea.css">

<!-- Firebase js -->
<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
<!-- emojione js -->
<script src="resources/js/chatting/emojione/dist/emojione.js"></script>
<script src="resources/js/chatting/emojione/dist/emojionearea.js"></script>

<!-- content -->
<div class="app">
  <div class="row app-one">
    <div class="col-sm-2 side">
      <div class="side-one">
        <div class="row heading">
          <div class="col-sm-3 col-xs-3 heading-avatar">
            <div class="heading-avatar-icon">
            </div>
          </div>
        </div>
		
		<!-- 유저리스트 -->
        <div class="row sideBar">
          <!-- 유저 -->
          <div class="row sideBar-body" id="allUsers" style="background-color: #FFF;">
            <div class="col-sm-3 col-xs-3 sideBar-avatar">
              <div class="avatar-icon">
                <img src="resources/images/chatting/all.png">
              </div>
            </div>
          </div>
		  
		<!-- 경계 -->
        </div>
      </div>
    </div>
      
	<!-- 대화창 시작 -->
    <div class="col-sm-10 conversation">
      <div class="row heading">
        <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
          <div class="heading-avatar-myicon">
            <img id="currentChatUserProfile" src="resources/images/profile/none.png">
          </div>
        </div>
        <div class="col-sm-8 col-xs-7 heading-name">
          <a class="heading-name-meta" id="currentUserName" style="padding-left: 20px;color:#FFF;">
          </a>
          <span class="heading-online">Online</span>
        </div>
        <div class="col-sm-1 col-xs-1  heading-dot pull-right">
          <i class="fa fa-remove pull-right" id="removeChat" aria-hidden="true"></i>
        </div>
      </div>
	  
	  <!-- 메인 대화창 -->
		<!-- 대화 내용 추가 -->
	  <div class="scrollbar chatscroll chatWindow" id="style-1">
		  <div class="force-overflow">
		   	  <div class="row message" id="conversation">
		   	  </div>
		  </div>
	  </div>
	  <div class="row reply">
        <div class="col-sm-1 col-xs-1 reply-emojis">
          <!-- <i class="fa fa-smile-o"></i> -->
        </div>
        <div class="col-sm-9 col-xs-9 reply-main">
          <input type="text" class="form-control" id="messageText" />
        </div>
        <div class="col-sm-1 col-xs-1 reply-send" id="sendMessageBtn">
          <i class="fa fa-send" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js"></script>
<script src="resources/js/chatting/chatting.js"></script>
<script>
	$(function() {
		// 채팅창 숨김
		$('#removeChat').click(function() {
			$('.sidebar-chat').animate({width: 'toggle'});
		});
	});
</script>

