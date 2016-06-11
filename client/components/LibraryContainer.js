import React, { Component } from 'react';
import Library from './Library';
import $ from 'jquery';

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
      res.json().then(books => {
        const convertTitles = (i) => {
          if (i === books.length) {
            this.receiveBooks(books);
          }

          books[i].bookTitle = $('<textarea />').html(books[i].bookTitle).text();
          convertTitles(i + 1);
        };

        if (books) {
          convertTitles(0);
        }
      });
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
      book => book.bookTitle.toUpperCase().includes(term.toUpperCase())
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
