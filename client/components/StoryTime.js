/* global Twilio */
import React, { Component, PropTypes } from 'react';
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

// TODO: Clean Dead Code / Lint Fix
class StoryTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCounter: 0,
      bookTitle: '',
      bookData: [],

      invitePopUp: false,

      renderConvoContainer: false,
      conversationsClient: undefined,
      activeConversation: undefined,
      previewMedia: undefined,
      identity: undefined,
      message: undefined,
    };
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleInviteToggle = this.handleInviteToggle.bind(this);

    socket.emit('join', this.props.params.userId);

    socket.on('action', data => {
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

  componentWillMount() {
    const app = this;
    let conversationsClient = this.state.conversationsClient;

    $.post('/api/getBook', { bookId: this.props.params.bookId }, data => {
      let title = data.bookTitle;
      const bookData = data.bookData;

      title = $('<textarea />').html(title).text();

      const convertPages = (i) => {
        if (i === bookData.length) {
          app.setState({
            bookTitle: title,
            bookData,
          });
        }

        if (!bookData[i].image) {
          bookData[i].content = $('<textarea />').html(bookData[i].content).text();
        }
        convertPages(i + 1);
      };

      convertPages(0);
    }, 'json');

    // Ajax request to server to get token
    $.getJSON('/token', data => {
      // const identity = (this.context.user && this.context.user._id) || data.identity;
      const identity = data.identity;
      const accessManager = new Twilio.AccessManager(data.token);

      // Create a Conversations Client and connect to Twilio
      conversationsClient = new Twilio.Conversations.Client(accessManager);

      app.setState({
        identity,
        conversationsClient,
      });

      conversationsClient.listen().then(app.clientConnected.bind(app), error => {
        app.log(`Could not connect to Twilio: ${error.message}`);
      });

      // start conversation with room owner
      const roomOwner = this.props.params.userId;
      if (roomOwner !== identity) {
        if (this.state.activeConversation) {
          console.log(`${identity} is inviting ${roomOwner}`);
          this.state.activeConversation.invite(roomOwner);
        } else {
          console.log(`${identity} is inviting ${roomOwner} / not active`);
          const options = {};
          if (this.state.previewMedia) {
            options.localMedia = this.state.previewMedia;
          }
          this.state.conversationsClient.inviteToConversation(roomOwner, options)
            .then(app.conversationStarted.bind(app), error => {
              console.error('Unable to create conversation', error);
            })
            .then(this.handleInviteToggle);
        }
      }
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

  handleInviteToggle() {
    this.setState({ invitePopUp: !this.state.invitePopUp });
  }

  handleInvite() {
    const inviteTo = document.getElementById('invite-to').value;

    $.post('/api/email', { email: inviteTo, href: location.href })
      .done(() => {
        this.handleInviteToggle();
      });
  }

  handlePreview() {
    if (!this.state.previewMedia) {
      const preview = new Twilio.Conversations.LocalMedia();
      Twilio.Conversations.getUserMedia()
        .then(mediaStream => {
          preview.addStream(mediaStream);
          preview.attach('#local-media');
        },
        error => {
          console.error('Unable to access local media', error);
        });

      this.setState({ previewMedia: preview });
    }
  }

  conversationStarted(conversation) {
    const webcam = this;

    this.setState({ activeConversation: conversation });
    // Draw local video, if not already previewing
    if (!this.state.previewMedia) {
      this.setState({ renderConvoContainer: true });
    }

    // When a participant joins, draw their video on screen
    webcam.state.activeConversation.on('participantConnected', participant => {
      webcam.log(`Participant '${participant.identity}' connected`);
      webcam.setState({ renderConvoContainer: true });
    });

    // When a participant disconnects, note in log
    webcam.state.activeConversation.on('participantDisconnected',  participant => {
      webcam.log(`Participant '${participant.identity}' disconnected`);
      webcam.setState({ renderConvoContainer: false });
    });

    // When the conversation ends, stop capturing local video
    webcam.state.activeConversation.on('disconnected', () => {
      webcam.log(`Connected to Twilio. Listening for incoming Invites as '${webcam.state.conversationsClient.identity}'`);
      webcam.setState({ renderConvoContainer: false, activeConversation: null, previewMedia: null });
    });
  }

  backToLibrary() {
    browserHistory.push('/library');
  }

  clientConnected() {
    console.log(`
      Connected to Twilio.
      Listening for incoming invites with id '${this.state.conversationsClient.identity}'
    `);
    const webcam = this;

    // When conversationClient hears 'invite' event, accept the invite event and start conversation
    this.state.conversationsClient.on('invite', invite => {
      webcam.log(`incoming invite from: ' ${invite.from}`);
      invite.accept().then(webcam.conversationStarted.bind(webcam));
    });
  }

  log(message) {
    this.setState({ message });
    console.log('WEBCAM MESSAGE: ', message);
  }

  render() {
    if (this.state.bookData.length > 0) {
      return (
        <div>
          <div className="sidenavigation orange lighten-5">
            <SideBar
              handlePreview={this.handlePreview}
              handleInviteToggle={this.handleInviteToggle}
            />
            <div>
              <div id="local-media" className="local-webcam"></div>
              {this.state.renderConvoContainer === true ?
                <ConversationContainer
                  conversation={this.state.activeConversation}
                /> : null}
            </div>
          </div>
          <div className="container">
            <div className="row">
              <Title  bookTitle={this.state.bookTitle} author={this.state.author} />
            </div>
            <div className="row">
              <PrevButton leftClickHandler={this.onClickPrev} />
              <NextButton rightClickHandler={this.onClickNext} />
            </div>
            <div className="row">

              { // <BookBackground />
              }

              <LeftPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter} />
              <RightPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter} />
              {this.state.invitePopUp ?
                <InvitePopUp
                  handleInviteToggle={this.handleInviteToggle}
                  handleInvite={this.handleInvite}
                /> : null}

            </div>
          </div>
        </div>
      );
    }
    return (<p> Loading ... </p>);
  }
}

StoryTime.propTypes = {
  params: PropTypes.object,
  conversation: PropTypes.object,
};

StoryTime.contextTypes = {
  user: PropTypes.object,
};

export default StoryTime;
