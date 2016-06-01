import React, { PropTypes, Component } from 'react';

var NextButton = (props) => (
  <div className="next-button"> 
    <input type='button' className='button' value='>' onClick={props.clickHandler}/>


  </div>  
  );

export default NextButton;

