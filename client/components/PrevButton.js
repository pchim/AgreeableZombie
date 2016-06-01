import React, { PropTypes, Component } from 'react';

var PrevButton = (props) => (
  <div id="prev-button"> 
    <input type='button' className='button' value='Previous Page' onClick={props.clickHandler}/>
  </div>  
  );

export default PrevButton;
