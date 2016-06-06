import React from 'react';
import ReactDOM from 'react-dom';

class ConversationContainer extends React.Component {

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
        <div ref='remoteMedia' className='media-container remote-webcam'></div>
        <div ref='localMedia' className='media-container local-webcam'></div>
    );
  }
}

export default ConversationContainer;