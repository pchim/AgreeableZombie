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

  render() {
    return (
      <div>
        Hello Again
        <button id="button-preview">Button Preview</button>
        <div id="local-media">Container for Local Media</div>
        <div ref='remoteMedia' className='media-container'>remoteMedia</div>
        <div ref='localMedia' className='media-container'>localMedia</div>
      </div>
    );
  }
}

export default WebCam;