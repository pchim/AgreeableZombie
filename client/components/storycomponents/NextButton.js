import React from 'react';

const NextButton = (props) => (
  <div className="next-button">
    <input
      type="button"
      className="button hvr-bounce-to-right"
      value=">"
      onClick={props.rightClickHandler}
    />
  </div>
);

export default NextButton;

