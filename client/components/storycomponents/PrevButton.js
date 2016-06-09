import React from 'react';

const PrevButton = (props) => (
  <div className="prev-button">
    <input
      type="button"
      className="page-turn-button"
      value="<"
      onClick={props.leftClickHandler}
    />
  </div>
);

export default PrevButton;
