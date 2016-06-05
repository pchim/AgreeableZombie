import React, { PropTypes, Component } from 'react';

var LeftPageText = (props) => {
  console.log ('bookData inside LeftPageText is - ', props.bookData);
  return (
  <div className="left-page-text"> 
    <p className="page-words">{props.bookData[props.pageCounter].content}</p>
  </div>  
  );s
}

export default LeftPageText;