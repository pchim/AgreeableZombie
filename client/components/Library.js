import React, { PropTypes } from 'react';
import LibraryBook from './LibraryBook';

const Library = ({ books, term, filter }) => (
  <div className="library">
    <h1>Read With Me</h1>
    <input placeholder="filter by title..." value={term} onChange={e => filter(e.target.value)} />
    <div className="row">
      <div className="col s12 card-deck">
        {books.map((book, index) => (
          <LibraryBook book={book} key={index} />
        ))}
      </div>
    </div>
  </div>
);

Library.propTypes = {
  books: PropTypes.array.isRequired,
  term: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
};

export default Library;
