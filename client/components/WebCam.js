import React from 'react';
import ReactDOM from 'react-dom';
import ConversationContainer from './ConversationContainer.jsx';

class WebCam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderConvoContainer: false,
      conversationsClient: undefined,
      activeConversation: undefined,
      previewMedia: undefined,
      identity: undefined,
      message: undefined
    };

    var conversationsClient = this.state.conversationsClient;
    var activeConversation = this.state.activeConversation;
    var previewMedia = this.state.previewMedia;
    var identity = this.state.identity;

    var webc
    am = this;

    //Ajax request to server to get token
    $.getJSON('/token', function(data) {
      var identity = data.identity;
      var accessManager = new Twilio.AccessManager(data.token);

      // Check the browser console to see identity
      console.log(identity);

      // Create a Conversations Client and connect to Twilio
      conversationsClient = new Twilio.Conversations.Client(accessManager);

      webcam.setState({
        identity: identity,
        conversationsClient: conversationsClient
      });
      
      conversationsClient.listen().then(webcam.clientConnected.bind(webcam), function (error) {
          webcam.log('Could not connect to Twilio: ' + error.message);
          console.log(error, '<<< client could not connect');
      });
    });
  }

  log(message) {
    this.setState({message: message});
    console.log("WEBCAM MESSAGE: ", message);
  }

  clientConnected() {
    // document.getElementById('invite-controls').style.display = 'block';
    console.log("Connected to Twilio. Listening for incoming Invites as '" + this.state.conversationsClient.identity + "'");
    var webcam = this;
    // When conversationClient hears 'invite' event, accept the invite event and start conversation
    this.state.conversationsClient.on('invite', function (invite) {
        webcam.log('Incoming invite from: ' + invite.from);
        invite.accept().then(webcam.conversationStarted.bind(webcam));
    });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  conversationStarted(conversation) {
    var webcam = this;

    this.setState({activeConversation:conversation});
    // Draw local video, if not already previewing
    if (!this.state.previewMedia) {
      this.setState({renderConvoContainer: true});
    }

    // When a participant joins, draw their video on screen
    webcam.state.activeConversation.on('participantConnected', function (participant) {
        webcam.log("Participant '" + participant.identity + "' connected");
        webcam.setState({renderConvoContainer: true});
    });

    // When a participant disconnects, note in log
    webcam.state.activeConversation.on('participantDisconnected', function (participant) {
        webcam.log("Participant '" + participant.identity + "' disconnected");
        webcam.setState({renderConvoContainer: false});
    });

    // When the conversation ends, stop capturing local video
    webcam.state.activeConversation.on('disconnected', function (conversation) {
        webcam.log("Connected to Twilio. Listening for incoming Invites as '" + webcam.state.conversationsClient.identity + "'");
        webcam.setState({renderConvoContainer: false, activeConversation: null, previewMedia: null});
    });
  }



  handleInvite(e) {
    var inviteTo = document.getElementById('invite-to').value;

    if(this.state.activeConversation){
      this.state.activeConversation.invite(inviteTo);
    } else {
      var options = {};
      if(this.state.previewMedia){
        options.localMedia = this.state.previewMedia;
      }
      var webcam = this;
      this.state.conversationsClient.inviteToConversation(inviteTo, options)
      .then(webcam.conversationStarted.bind(webcam), function(error) {
        console.error('Unable to create conversation', error);
      });
    }
  }

  handlePreview(e) {
    if(!this.state.previewMedia){
      var preview = new Twilio.Conversations.LocalMedia();
      Twilio.Conversations.getUserMedia().then(
        function (mediaStream) {
            preview.addStream(mediaStream);
            preview.attach('#local-media');
        },
        function (error) {
            console.error('Unable to access local media', error); 
        });

      this.setState({previewMedia: preview});
    }
  }

  render() {
    return (
      <div>
        <input type="button" id="button-preview" value="WebCam Preview" onClick={this.handlePreview.bind(this)} /><br/>

        <div id="invite-section">
          <input id="invite-to" type="text" placeholder="Invite friend by username" />
          <input type="button" id="button-invite" onClick={this.handleInvite.bind(this)} value="Invite" />
        </div>

        <div id="local-media" className="local-webcam">Container for Local Media</div>
        {this.state.renderConvoContainer === true ? <ConversationContainer conversation={this.state.activeConversation} /> : null }
        <p id="log-content">{this.state.message}</p>
      </div>
    );
  }
}

export default WebCam;