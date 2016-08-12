import React from 'react';

const LeftPageText = (props) => {
  return (
  <div className="col s6 page-text">
    {props.bookData[props.pageCounter].image ? <img className="page-image" src={props.bookData[props.pageCounter].content} /> : 
    <p className="page-words">{props.bookData[props.pageCounter].content}</p>}
  </div>
  );
}

export default LeftPageText;