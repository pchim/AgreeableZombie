import React, { PropTypes, Component } from 'react';

var LeftPageText = (props) => {
  console.log ('bookData inside LeftPageText is - ', props.bookData);
  console.log ('bookTitle inside LeftPageText is - ', props.bookTitle);
  return (
  <div className="left-page-text"> 
    <p className="page-words">{props.bookData[props.pageCounter].content}</p>
  </div>  
  );s
}

export default LeftPageText;