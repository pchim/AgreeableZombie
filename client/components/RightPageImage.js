import React, { PropTypes, Component } from 'react';

var RightPageImage = (props) => (
  <div className="right-page-image"> 
    <img className="page-image" src={props.bookData[props.pageCounter+1].image} />
  </div>  
  );

export default RightPageImage;