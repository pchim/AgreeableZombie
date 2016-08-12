
import React, { PropTypes, Component } from 'react';

const RightPageText = (props) => (
  <div className="col s6 page-text">

    {props.bookData[props.pageCounter+1] === undefined ? '' : props.bookData[props.pageCounter+1].image ? <img className="page-image" src={props.bookData[props.pageCounter+1].content} /> :
      <p className="page-words">{props.bookData[props.pageCounter+1].content}</p>}
  </div>
  );

export default RightPageText;