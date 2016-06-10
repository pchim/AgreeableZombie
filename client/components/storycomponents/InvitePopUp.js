import React from 'react';

const InvitePopUp = (props) => (
  <div className="popupbox orange lighten-5">
    <input
      id="invite-to"
      type="text"
      placeholder="Identity to send an invite to"
    />
    <input
      type="button"
      id="button-invite"
      className="hvr-back-pulse"
      onClick={props.handleInvite}
      value="Invite"
    />
  </div>
    );

export default InvitePopUp;
