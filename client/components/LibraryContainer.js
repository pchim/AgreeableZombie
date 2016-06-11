import React, { Component } from 'react';
import Library from './Library';

class LibraryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      books: [],
      filtered: [],
    };

    this.filterBooks = this.filterBooks.bind(this);
  }

  componentWillMount() {
    fetch('/api/books').then(res => {
      res.json().then(json => this.receiveBooks(json));
    });
  }

  receiveBooks(books) {
    const filtered = books;
    this.setState({ ...this.state, books, filtered });
  }

  /*
   * filter the books where the title contains the term (case-sensistive)
   */
  filterBooks(term) {
    const filtered = term ? this.state.books.filter(
      book => book.bookTitle.includes(term)
    ) : this.state.books;

    this.setState({ ...this.state, term, filtered });
  }

  render() {
    return (
      <Library books={this.state.filtered} term={this.state.term} filter={this.filterBooks} />
    );
  }
}

export default LibraryContainer;
