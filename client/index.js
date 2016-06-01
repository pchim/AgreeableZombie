import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

var render = function() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
};

render();

// Global variables for Twilio
var conversationsClient;
var activeConversation;
var previewMedia;
var identity;

// Check if browser has WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
    alert('WebRTC is not available in your browser.');
}

//Ajax request to server to get token
$.getJSON('/token', function(data) {
    identity = data.identity;
    var accessManager = new Twilio.AccessManager(data.token);

    // Check the browser console to see identity
    console.log(identity);

    // Create a Conversations Client and connect to Twilio
    conversationsClient = new Twilio.Conversations.Client(accessManager);
    conversationsClient.listen().then(clientConnected, function (error) {
        log('Could not connect to Twilio: ' + error.message);
    }); 
});

// Successfully connected!
function clientConnected() {
  // document.getElementById('invite-controls').style.display = 'block';
  log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");

  // When conversationClient hears 'invite' event, accept the invite event and start conversation
  conversationsClient.on('invite', function (invite) {
      log('Incoming invite from: ' + invite.from);
      invite.accept().then(conversationStarted);
  });

  // Bind button to create conversation
  document.getElementById('button-invite').onclick = function () {
    var inviteTo = document.getElementById('invite-to').value;
    if (activeConversation) {
      // Add a participant
      activeConversation.invite(inviteTo);
    } else {
      // Create a conversation
      var options = {};
      if (previewMedia) {
          options.localMedia = previewMedia;
      }
      
      conversationsClient.inviteToConversation(inviteTo, options)
      .then(conversationStarted, function (error) {
        log('Unable to create conversation');
        console.error('Unable to create conversation', error);
      });
    }
  };
}

// Conversation is live
function conversationStarted(conversation) {
    log('In an active Conversation');
    activeConversation = conversation;
    // Draw local video, if not already previewing
    if (!previewMedia) {
        ReactDOM.render(<ConversationContainer conversation={conversation} />, document.getElementById('local-conversation'));
    }

    // When a participant joins, draw their video on screen
    conversation.on('participantConnected', function (participant) {
        log("Participant '" + participant.identity + "' connected");
    });

    // When a participant disconnects, note in log
    conversation.on('participantDisconnected', function (participant) {
        log("Participant '" + participant.identity + "' disconnected");
    });

    // When the conversation ends, stop capturing local video
    conversation.on('disconnected', function (conversation) {
        log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
        ReactDOM.unmountComponentAtNode(document.getElementById('local-conversation'));
        activeConversation = null;
    });
}

//  Local video preview
document.getElementById('button-preview').onclick = function () {
    if (!previewMedia) {
        previewMedia = new Twilio.Conversations.LocalMedia();
        Twilio.Conversations.getUserMedia().then(
        function (mediaStream) {
            previewMedia.addStream(mediaStream);
            previewMedia.attach('#local-media');
        },
        function (error) {
            console.error('Unable to access local media', error);
            log('Unable to access Camera and Microphone');
        });
    };
};

function log(message) {
    document.getElementById('log-content').innerHTML = message;
}







