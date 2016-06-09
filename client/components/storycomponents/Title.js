import React from 'react';

const Title = (props) => (
  <div className="center">
    <h3 className="title">{props.bookTitle}</h3>
    <p className="author">By {props.author}</p>
  </div>
  );

export default Title;
