import React, { PropTypes, Component } from 'react';

var Book = (props) => (
      <div className="book">
        <h2>{props.msg}</h2>
      </div>
    );
  
export default Book;

/*this is the component where highlighting will take place.*/