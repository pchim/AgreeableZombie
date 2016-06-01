import React, { PropTypes, Component } from 'react';
 

var LeftPage = (props) => (
  <div className="left-page"> 
    <h2>Left Page</h2>
    <img className="book-page" src={props.bookData[props.pageCounter].image} />
    <img className="book-page" src={props.bookData[props.pageCounter+1].image} />
  </div>  
  );

export default LeftPage;