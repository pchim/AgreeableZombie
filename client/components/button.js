import React, { PropTypes, Component } from 'react';

var Button = (props) => (
  <div className="button"> 
    <button onClick={props.clickHandler}> Button </button>
  </div>  
  );

export default Button;

