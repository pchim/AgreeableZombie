import React, { PropTypes, Component } from 'react';

var NextButton = (props) => (
  <div className="next-button"> 
    <input type='button' className='button hvr-bounce-to-right' value='>' onClick={props.clickHandler}/>


  </div>  
  );

export default NextButton;

