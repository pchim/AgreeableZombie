import React from 'react';

class WebCam extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello Again
        <button id="button-preview">Button Preview</button>\
        <div id="local-media">Container for Local Media</div>
      </div>
    );
  }
}

export default WebCam;