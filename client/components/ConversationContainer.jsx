import React, { Component, PropTypes } from 'react';

class ConversationContainer extends Component {
  componentDidMount() {
    const conversation = this.props.conversation;
    conversation.localMedia.attach(this.refs.localMedia);

    conversation.on('participantConnected', participant => {
      participant.media.attach(this.refs.remoteMedia);
    });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  render() {
    return (
      <div id="webcam-displays">
        <div ref="remoteMedia" className="media-container remote-webcam"></div>
        <div ref="localMedia" className="media-container local-webcam"></div>
      </div>
    );
  }
}

ConversationContainer.propTypes = {
  conversation: PropTypes.object,
};

export default ConversationContainer;
