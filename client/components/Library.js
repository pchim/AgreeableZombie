import React, { PropTypes } from 'react';

const Library = ({ books }) => (
  <div className="library">
    <h1>Read With Me</h1>
    {books.map((book, index) => (
      <div className="book" key={index}>{book.bookTitle}</div>
    ))}
  </div>
);

Library.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Library;
