import React from 'react';

class WebCam extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const conversation = this.props.conversation;
    conversation.localMedia.attach(this.refs['localMedia']);

    conversation.on('participantConnected', participant => {
      participant.media.attach(this.refs.remoteMedia);
    });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  conversationStarted(conversation) {
    console.log('In an active Conversation');
    var webcam = this;
    this.setState({activeConversation:conversation});
    // Draw local video, if not already previewing
    if (!this.state.previewMedia) {
      console.log('trying to setState conversation of webcam');
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
    });

    // // When the conversation ends, stop capturing local video
    // conversation.on('disconnected', function (conversation) {
    //     log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
    //     log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
    //     ReactDOM.unmountComponentAtNode(document.getElementById('local-conversation'));
    //     activeConversation = null;
    // });
  }



  handleInvite(e) {
    var inviteTo = 'TEST';
    // document.getElementById('invite-to').value;

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
        <h1>WEBCAM</h1>
        <button id="button-preview" onClick={this.handlePreview.bind(this)}>Button Preview</button>
        <input id="invite-to" type="text" placeholder="Identity to send an invite to" />
        <button id="button-invite" onClick={this.handleInvite.bind(this)}>Button Invite</button>
        <div id="local-media">Container for Local Media</div>
        {this.state.renderConvoContainer === true ? <ConversationContainer conversation={this.state.activeConversation} /> : null }
        <p id="log-content">{this.state.message}</p>
      </div>
    );
  }
}

export default WebCam;