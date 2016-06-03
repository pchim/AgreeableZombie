import React, { PropTypes, Component } from 'react';

var RightPageImage = (props) => (
<<<<<<< a53422de1fe072d50650c3217fd5c170980909c5
  <div className="right-page-image"> 
    <img className="page-image hvr-wobble-vertical" src={props.bookData[props.pageCounter+1].image} />
  </div>  
=======
  <div className="cow">
    <img className="page-image" src={props.bookData[props.pageCounter+1].image} />
  </div>
>>>>>>> Adds React tests
  );

export default RightPageImage;
