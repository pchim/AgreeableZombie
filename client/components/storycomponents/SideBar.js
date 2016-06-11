import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

const SideBar = (props) => (
  <div className="center">
    <img
      className="side-icons"
      onClick={() => browserHistory.push('/library')}
      src="../../assets/icons/book.png"
      alt="a book icon"
    />
    <br />
    <img
      className="side-icons"
      onClick={props.handlePreview}
      src="../../assets/icons/video-chat.png"
      alt="a camera icon"
    />
    <br />
    <img
      className="side-icons"
      onClick={props.handleInviteToggle}
      src="../../assets/icons/add-contact.png"
      alt="icon of person"
    />
  </div>
  
);

SideBar.propTypes = {
  handlePreview: PropTypes.func,
  handleInviteToggle: PropTypes.func,
};

export default SideBar;
