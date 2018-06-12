<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Firebase chat</title>
    <link rel="stylesheet" type="text/css" href="resources/css/chatting/bootstrap-modal.css">
    <link rel="stylesheet" type="text/css" href="resources/css/chatting/chatting.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- <script src="https://cdn.firebase.com/js/client/2.4.1/firebase.js"></script> -->
    <script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
</head>
<body>
    <div class="channels-pane">
        <h2>Channels</h2>
        <ul id="channel-list">
            <li id="channel-item-template" class="hidden">
                <span class="hidden" data="key"></span>
                <span data="title"></span>
            </li>
        </ul>

        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#create-channel">Create</button>
    </div>


    <div class="user-handle">
        <input id="user-handle" placeholder="Your handle">
    </div>


    <div class="channel">

        <div id="channel-info" class="channel-info">
            <h2 data="title"></h2>
            <div data="description"></div>
        </div>

        <div id="channel-messages" class="channel-messages">
            <div id="message-template" class="message hidden">
                <span data="userHandle" class="author"></span>:
                <span data="text"></span>
            </div>
        </div>

        <div class="new-message">
            <input id="message-text">
            <button id="send-message" type="button">Send</button>
        </div>
    </div>

    <div class="modal fade" id="create-channel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Create channel</h4>
                </div>
                <div class="modal-body">
                    <form id="channel-form" class="form-horizontal">
                        <div class="form-group">
                            <label for="channel-title">Channel title</label>
                            <input type="text" class="form-control" id="channel-title" placeholder="title" name="title">
                        </div>
                        <div class="form-group">
                            <label for="channel-title">Channel description</label>
                            <input type="text" class="form-control" id="channel-description" placeholder="description" name="description">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button id="create-channel-btn" type="button" class="btn btn-primary">Create</button>
                </div>
            </div>
        </div>
    </div>
    <script src="resources/js/chatting/chatting.js"></script>
</body>
</html>