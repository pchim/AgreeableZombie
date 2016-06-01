import React, { PropTypes, Component } from 'react';

var LeftPage = (props) => (
  <div className="leftPage"> 
    <h2>Left Page</h2>
    <img src='../assets/page3.png' />
    <img src='{props.fakeBookData[0].image}' />

  </div>  
  );

export default LeftPage;