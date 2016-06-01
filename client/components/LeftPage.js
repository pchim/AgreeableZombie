import React, { PropTypes, Component } from 'react';
 

var LeftPage = (props) => (
  <div className="left-page"> 
    <h2>Left Page</h2>
    <p className="page-words">{props.bookData[props.pageCounter].content}</p>
    <img className="page-image" src={props.bookData[props.pageCounter].image} />
  </div>  
  );

export default LeftPage;