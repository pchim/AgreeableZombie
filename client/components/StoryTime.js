import React from 'react';
import { browserHistory } from 'react-router';
import Title from './storycomponents/Title.js';
import BookBackground from './storycomponents/BookBackground.js';
import PrevButton from './storycomponents/PrevButton.js';
import NextButton from './storycomponents/NextButton.js';
import LeftPageText from './storycomponents/LeftPageText.js';
import RightPageText from './storycomponents/RightPageText.js';
import InvitePopUp from './storycomponents/InvitePopUp.js';
import SideBar from './storycomponents/SideBar.js';
import socket from '../../websocket.js';
import ConversationContainer from './ConversationContainer.jsx';
import $ from 'jquery';

class StoryTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCounter: 0,
      bookTitle: '',
      bookData: [],
      author: 'Eric Carle',

      invitePopUp: false,

      renderConvoContainer: false,
      conversationsClient: undefined,
      activeConversation: undefined,
      previewMedia: undefined,
      identity: undefined,
      message: undefined,
    };
    this.backToLibrary = this.backToLibrary.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleInviteToggle = this.handleInviteToggle.bind(this);


    var conversationsClient = this.state.conversationsClient;
    var webcam = this;

    // Ajax request to server to get token
    $.getJSON('/token', data => {
      var identity = data.identity;
      var accessManager = new Twilio.AccessManager(data.token);

      // Check the browser console to see identity
      console.log(identity);

      // Create a Conversations Client and connect to Twilio
      conversationsClient = new Twilio.Conversations.Client(accessManager);

      webcam.setState({
        identity,
        conversationsClient,
      });

      conversationsClient.listen().then(webcam.clientConnected.bind(webcam), error => {
        webcam.log(`Could not connect to Twilio: ${error.message}`);
        console.log(error, '<<< client could not connect');
      });
    });

    socket.emit('join', this.props.params.bookId);

    socket.on('action', data => {
      console.log(data);
      switch (data.action) {
        case 'TURN_PAGE':
          this.setState({ ...this.state, pageCounter: data.payload });
          break;
        default:
          console.log('action not recognized: ', data);
      }
    });
  }
  // END OF CONSTRUCTOR

  log(message) {
    this.setState({ message });
    console.log('WEBCAM MESSAGE: ', message);
  }

  clientConnected() {
    // document.getElementById('invite-controls').style.display = 'block';
    console.log("Connected to Twilio. Listening for incoming Invites as '" + this.state.conversationsClient.identity + "'");
    var webcam = this;
    // When conversationClient hears 'invite' event, accept the invite event and start conversation
    this.state.conversationsClient.on('invite', function (invite) {
      webcam.log(`Incoming invite from: ' ${invite.from}`);
      invite.accept().then(webcam.conversationStarted.bind(webcam));
    });
  }

  backToLibrary(e) {
    browserHistory.push('/library');
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

  handleInviteToggle() {
    this.setState({ invitePopUp: !this.state.invitePopUp });
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
      }).then(this.handleInviteToggle());
    }
  }

  handlePreview(e) {
    if (!this.state.previewMedia) {
      var preview = new Twilio.Conversations.LocalMedia();
      Twilio.Conversations.getUserMedia().then(
        function (mediaStream) {
            preview.addStream(mediaStream);
            preview.attach('#local-media');
        },
        function (error) {
            console.error('Unable to access local media', error);
        });

      this.setState({ previewMedia: preview });
    }
  }

  componentWillMount() {
    const app = this;
    $.getJSON('/api/books', function(data) {

      console.log('data from server is - ', data);

      const title = data[0].bookTitle;
      const bookData = data[0].bookData;

      console.log('bookTitle is - ', title);
      console.log('bookdata is - ', bookData);

      app.setState({
        bookTitle: title,
        bookData,
      });
    });
  }

  componentDidMount() {
    this.render();
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  onClickPrev() {
    const prev = this.state.pageCounter - 2;
    if (prev >= 0) {
      socket.emit('action', { action: 'TURN_PAGE', payload: prev });
      this.setState({ ...this.state, pageCounter: prev });
    }
  }

  onClickNext() {
    const next = this.state.pageCounter + 2;
    if (next  < this.state.bookData.length - 1) {
      socket.emit('action', { action: 'TURN_PAGE', payload: next });
      this.setState({ ...this.state, pageCounter: next });
    }
  }

  render() {
    if (this.state.bookData.length > 0) {
      return (
        <div>
          <div className="sidenavigation orange lighten-5">
            <SideBar
              handlePreview={this.handlePreview}
              handleInviteToggle={this.handleInviteToggle}
              backToLibrary={this.backToLibrary}
            />
          </div>
          <div className="booksection">
            <Title bookTitle={this.state.bookTitle} author={this.state.author} />
            <BookBackground />
            <PrevButton leftClickHandler={this.onClickPrev} />
            <NextButton rightClickHandler={this.onClickNext} />
            <LeftPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter} />
            <RightPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter} />
            {this.state.invitePopUp ?
              <InvitePopUp
                handleInviteToggle={this.handleInviteToggle}
                handleInvite={this.handleInvite}
              /> : null}
            <div>
              <p id="your-username">username: {this.state.identity}</p>
              <div id="local-media" className="local-webcam"></div>
              {this.state.renderConvoContainer === true ?
                <ConversationContainer
                  conversation={this.state.activeConversation}
                /> : null}
            </div>
          </div>
        </div>
      );
    }
    return (<p> Loading ... </p>);
  }
}

export default StoryTime;
