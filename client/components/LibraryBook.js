import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LibraryBook = ({ book }) => (
  <div className="card library-book small transparent">
    <div className="card-image">
      <img src={book.bookData[0].image} alt={book.bookTitle} />
    </div>
    <div className="card-action green darken-4">
      <Link to={`/story-time/${book._id}`}>{book.bookTitle}</Link>
    </div>
  </div>
);

LibraryBook.propTypes = {
  book: PropTypes.object.isRequired,
};

export default LibraryBook;
