(function() {
'use strict';

// FirebaseDB 주소
//var db = new Firebase('https://testcorin2.firebaseio.com/');

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDmfyvIHlY8QYVXO6shi6r85k3ocZWJAw4",
	authDomain: "testcorin2.firebaseapp.com",
	databaseURL: "https://testcorin2.firebaseio.com",
	projectId: "testcorin2",
	storageBucket: "testcorin2.appspot.com",
	messagingSenderId: "477164914852"
};

firebase.initializeApp(config);

var db = firebase.database().ref();
console.log("디비: " + db);

var messages; // 현재 채널의 메시지
var currentChannel; // 현재 채널

// This app uses jQuery, "$" is the name of the function that allows to
// find elements by any CSS selector - ID, class, attribute, etc.
// $('#create-channel-btn') - el with ID "create-channel-btn", this button is inside dialog box
// method "on" creates subscription to "click" event
$('#create-channel-btn').on('click', function() {
    // db.child('channels') - channels "folder" in the database
    db.child('channels').push({
        title: $('#channel-title').val(), // value of the field with ID "channel-title"
        description: $('#channel-description').val() // -"- ID "channel-description"
    }, function() {
        // once the channel is added to the database,
        // show the confirmation message ...
        window.alert('Channel created!');

        // and hide dialog box
        $('#create-channel').modal('hide');
    });
});

// subscribe to notifications when the new channel is added.
// channel can be added by the current or by some other user.
db.child('channels').on('child_added', function (snapshot) {
    // channel data
    var channel = snapshot.val();

    // data key in the the databse
    channel.key = snapshot.key;

    // adds new channel to el with ID "channel-list" using
    // el with ID "channel-item-template" as template
    var ch = addItem($('#channel-list'), $('#channel-item-template'));

    // show data from db in the new channel element
    showData(ch, channel);

    // if there is no current channel, select this channel as current
    // using function "selectChannel"
    if (!currentChannel) selectChannel();

    // create subscription to click event - when the channel is clicked in the list, it will be selected
    ch.on('click', selectChannel);


    // this function selects the channel
    function selectChannel() {
        // variable "messages" is assigned if there was some channel previously selected
        if (messages) {
            // unsubscribe from messages notifications
            messages.off('child_added', showMessage);

            // remove all messages apart from template message from the channel
            // It only affects what is shown on the browser, not the database
            $('#channel-messages .message').not('#message-template').remove();
        }

        // store reference to the current channel data - it is used when messages are added
        currentChannel = channel;

        // reference to the folder in DB with messages of the current channel
        // the URL of messages uses channel key, so messages of each channel are stored in different folders
        messages = db.child('messages/' + channel.key);

        // show data of the selected channel above the messages in el with ID "channel-info"
        showData($('#channel-info'), channel);

        // subscribe to added messages
        // showMessages is also called for messages that are already in DB
        messages.on('child_added', showMessage);

        // highlight selected channel:
        // "selected" class is removed from all channels (it is not known what was the previously selected channel here)
        $('#channel-list li').removeClass('selected');

        // then "selected" class is added to the channel el that is just selected
        ch.addClass('selected');
    }
});


// subscribe to "click" event on the button to send nessages
$('#send-message').on('click', sendMessage);

// subscribe to keypress event on the imput field where the message is edited
$('#message-text').on('keypress', function(e) {
    // if Enter key is pressed, send message
    if (e.keyCode == 13) sendMessage();
})

// this function "sends" the message by adding it to the database
function sendMessage() {
    // message entry field
    var text = $('#message-text');

    // add message to DB. Current user and other connected users receive notification
    // (showMessage will be called in browsers of all connected users)
    messages.push({
        userHandle: getHandle(), // username
        text: text.val(),        // message text
        timestamp: Date.now()    // current timestamp
    });

    // clear message entry field
    text.val('');
}


// The key in browser local storage to store username
var HANDLE_KEY = '/slack_clone/userHandle';

// el to edit username
var userHandle = $('#user-handle');

// show username from local storage in the field to edit username
userHandle.val(getHandle());

// subscribe to changes in the field
userHandle.on('input', function() {
    // update local storage whenever the field changes
    setHandle(userHandle.val());
});

// this function retrieves username from localstorage
function getHandle() {
    return window.localStorage.getItem(HANDLE_KEY);
}

// this function saves username to localstorage
function setHandle(text) {
    window.localStorage.setItem(HANDLE_KEY, text);
}

// this function shows new message when it is added to the database
// (whether by the current or by some other user)
function showMessage(snapshot) {
    // message data
    var message = snapshot.val();

    // adds new message to el with ID "channel-messages-list" using
    // el with ID "message-template" as template
    var msg = addItem($('#channel-messages'), $('#message-template'));

    // show data of the new message in the new message element
    showData(msg, message);
}


// this function is used to show data of new channels and messages in their elements
function showData($el, data) {
    // for each property in the data
    for (var prop in data) {
        // set the HTML of the element with "data" attribute (see HTML) equal to the property name
        // to the property value
        $('[data=' + prop + ']', $el).html(data[prop]);
    }
}

// this function create a copy of $template element and appends it to $list element
// making it visible and removing ID
// it is used to add both the new channels to the list and the new messages
function addItem($list, $template) {
    // makes copy of template element
    var item = $template.clone();

    // removes CSS class "hidden"
    item.removeClass('hidden');

    // removes ID attribute
    item.removeAttr('id');

    // adds el to the list
    $list.append(item);

    // and returns the reference to the new element - it used to show data
    return item;
}

})();
