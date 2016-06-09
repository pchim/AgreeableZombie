import React from 'react';

const PrevButton = (props) => (
  <div className="prev-button">
    <input
      type="button"
      className="button hvr-bounce-to-left"
      value="<"
      onClick={props.leftClickHandler}
    />
  </div>
);

export default PrevButton;
