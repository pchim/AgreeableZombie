
import React, { PropTypes, Component } from 'react';

var Title = (props) => (
  <div className="title-and-author"> 
    <h3 className="title">{props.bookTitle}</h3>
    <p className="author">By {props.author}</p>
  </div>  
  );

export default Title;