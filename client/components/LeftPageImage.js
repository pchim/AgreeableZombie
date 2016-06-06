
import React, { PropTypes, Component } from 'react';

var LeftPageImage = (props) => (
  <div className="left-page-image"> 
    <img className="page-image hvr-wobble-vertical" src={props.bookData[props.pageCounter].image} />
  </div>  
  );

export default LeftPageImage;