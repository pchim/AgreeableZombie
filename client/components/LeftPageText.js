import React, { PropTypes, Component } from 'react';

var LeftPageText = (props) => (
  <div className="left-page-text"> 
    <p className="page-words">{props.bookData[props.pageCounter].content}</p>
  </div>  
  );

export default LeftPageText;