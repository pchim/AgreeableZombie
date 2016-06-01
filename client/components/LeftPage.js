import React, { PropTypes, Component } from 'react';
 

var LeftPage = (props) => (
  <div className="leftPage"> 
    <h2>Left Page</h2>
    <img className="bookPage" src={props.bookData[props.pageCounter].image} />
    <img className="bookPage" src={props.bookData[props.pageCounter+1].image} />
  </div>  
  );

export default LeftPage;