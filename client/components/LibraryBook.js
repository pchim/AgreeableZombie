import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LibraryBook = ({ book }, context) => (
  <div className="card library-book small transparent">
    <div className="card-image">
      <img src={book.bookData[0].image} alt={book.bookTitle} />
    </div>
    <div className="card-action green darken-4">
      {context.user ?
        <Link to={`/story-time/${context.user._id}/${book._id}`}>
          {book.bookTitle}
        </Link> : null
      }
    </div>
  </div>
);

LibraryBook.propTypes = {
  book: PropTypes.object.isRequired,
};

LibraryBook.contextTypes = {
  user: PropTypes.object,
};

export default LibraryBook;
