import React from 'react';

const PrevButton = (props) => (
  <div className="col s6">
    <input
      type="button"
      className="page-turn-button"
      value="<"
      onClick={props.leftClickHandler}
    />
  </div>
);

export default PrevButton;
