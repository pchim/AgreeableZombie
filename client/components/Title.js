
import React, { PropTypes, Component } from 'react';

var Title = (props) => (
  <div className="title"> 
    <h2>{props.bookTitle}</h2>
    <p className="author">By {props.author}</p>
  </div>  
  );

export default Title;