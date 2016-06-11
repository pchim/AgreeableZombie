
import React, { PropTypes, Component } from 'react';

const RightPageText = (props) => (
  <div className="right-page-text">

    {props.bookData[props.pageCounter+1] === undefined ? '' : props.bookData[props.pageCounter+1].image ? <img className="right-book-image" src={props.bookData[props.pageCounter+1].content} /> :
      <p className="page-words">{props.bookData[props.pageCounter+1].content}</p>}
  </div>
  );

export default RightPageText;