
import React, { PropTypes, Component } from 'react';

var RightPage = (props) => (
  <div className="right-page"> 
    <h2> Right Page </h2>
    <p className="page-words">{props.bookData[props.pageCounter+1].content}</p>
    <img className="page-image" src={props.bookData[props.pageCounter+1].image} />
  </div>  
  );

export default RightPage;