import React from 'react';

const NextButton = (props) => (
  <div className="col s6 right-align">
    <input
      type="button"
      className="page-turn-button"
      value=">"
      onClick={props.rightClickHandler}
    />
  </div>
);

export default NextButton;

