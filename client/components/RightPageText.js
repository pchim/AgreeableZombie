
import React, { PropTypes, Component } from 'react';

var RightPageText = (props) => (
  <div className="right-page-text"> 
    <p className="page-words">{props.bookData[props.pageCounter+1].content}</p>
  </div>  
  );

export default RightPageText;