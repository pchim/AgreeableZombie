import React from 'react';

const SideBar = (props) => (
  <div className="center">
    <img className="icons" src="../../assets/icons/pencil-edit-button.png" alt="draw" />
    <br />
    <img className="icons" src="../../assets/icons/double-sided-eraser.png" alt="erase" />
    <br />
    <img
      className="icons"
      onClick={props.handlePreview}
      src="../../assets/icons/video-chat.png"
      alt="preview"
    />
    <br />
    <img
      className="icons"
      onClick={props.handleInviteToggle}
      src="../../assets/icons/add-contact.png"
      alt="invite"
    />
  </div>
);

export default SideBar;
