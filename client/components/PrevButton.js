import React, { PropTypes, Component } from 'react';

var PrevButton = (props) => (
  <div className="prev-button"> 
    <input type='button' className='button' value='<' onClick={props.clickHandler}/>
  </div>  
  );

export default PrevButton;