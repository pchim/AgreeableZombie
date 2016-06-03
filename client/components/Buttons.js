import React, { PropTypes, Component } from 'react';

var Buttons = (props) => (

  <div className="buttons">
    <input type='button prev-button' className='button' value='<-' onClick={props.clickHandler}/>
    <input type='button next-button' className='button' value='->' onClick={props.clickHandler}/>
  </div>
  );

export default Buttons;

