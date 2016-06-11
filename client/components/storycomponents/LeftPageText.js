import React from 'react';

const LeftPageText = (props) => {
  console.log ('bookData inside LeftPageText is - ', props.bookData);
  console.log ('bookTitle inside LeftPageText is - ', props.bookTitle);
  return (
  <div className="left-page-text">
    {props.bookData[props.pageCounter].image ? <img className="left-book-image" src={props.bookData[props.pageCounter].content} /> : <p className="page-words">{props.bookData[props.pageCounter].content}</p>}
     
      
  </div>
  );
}

export default LeftPageText;