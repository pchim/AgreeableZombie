import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Instructions from './Instructions.js';

const SideBar = (props) => (
  <div className="center sidebar">
    <img
      className="side-icons"
      onClick={() => browserHistory.push('/library')}
      src="../../assets/icons/book.png"
      alt="a book icon"
    />
    <h6>Library</h6>
    <br />
    <img
      className="side-icons"
      onClick={props.handlePreview}
      src="../../assets/icons/video-chat.png"
      alt="a camera icon"
    />
    <h6>Webcam On</h6>
    <br />
    <Instructions />
  </div>
);

SideBar.propTypes = {
  handlePreview: PropTypes.func,
  handleInviteToggle: PropTypes.func,
};

export default SideBar;
