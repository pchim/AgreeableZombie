import React from 'react';

const NextButton = (props) => (
  <div className="next-button">
    <input
      type="button"
      className="page-turn-button"
      value=">"
      onClick={props.rightClickHandler}
    />
  </div>
);

export default NextButton;

