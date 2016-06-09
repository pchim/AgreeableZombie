import React, { Component } from 'react';
import Library from './Library';

class LibraryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentWillMount() {
    fetch('/api/books').then(res => {
      res.json().then(json => this.receiveBooks(json));
    });
  }

  receiveBooks(books) {
    this.setState({ ...this.state, books });
  }

  render() {
    return (
      <Library books={this.state.books} />
    );
  }
}

export default LibraryContainer;
