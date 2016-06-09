
import React from 'react';

const LeftPageImage = (props) => (
  <div className="left-page-image">
    <img
      className="page-image hvr-wobble-vertical"
      src={props.bookData[props.pageCounter].image}
      alt="childrenbookpic"
    />
  </div>
  );

export default LeftPageImage;
