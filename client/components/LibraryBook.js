import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LibraryBook = ({ book }, context) => (
  <div className="card library-book transparent">
    <div className="card-image">
      <img src={book.bookTitleImage} alt={book.bookTitle} />
    </div>
    <div className="card-action cyan lighten-5 black-text">
      <h5 className="book-title-text">
        <Link to={`/story-time/user/${book._id}`}>
          {book.bookTitle}
        </Link>
      </h5>
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
