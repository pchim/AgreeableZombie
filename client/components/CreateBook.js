import React from 'react';
import $ from 'jquery';
import CreateBookForm from './CreateBookForm';
import AddPage from './AddPage';

class CreateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: '',
      bookTitleImage: '',
      bookData: [],
      content: '',

      showCreateOrAddPage: false,
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleTitleImage = this.handleTitleImage.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.savePage = this.savePage.bind(this);
    this.toggleForm = this.toggleForm.bind(this);

  }
  toggleForm() {
    this.setState({ showCreateOrAddPage: true});
  }

  handleTitle(event) {
    this.setState({ bookTitle: event.target.value });
  }

  handleTitleImage(event) {
    this.setState({ bookTitleImage: event.target.value });
  }

  handleContent(event) {
    this.setState({ content: event.target.value });
  }

  saveBook(e) {
    e.preventDefault();
    this.state.bookData.push(
      {
        content: this.state.content,
        image: false,
      }
    );

    const story = {
      bookTitle: this.state.bookTitle,
      bookTitleImage: this.state.bookTitleImage,
      bookData: this.state.bookData,
    };

    $.post('/api/savebook', story, (data, status) => {
    })
    .fail((err, status) => console.log('err', status));
    this.toggleForm()
  }

  savePage(e) {
    e.preventDefault();
    this.state.bookData.push(
      {
        content: this.state.content,
        image: false,
      }
    )
    const story = {
      bookTitle: this.state.bookTitle,
      bookTitleImage: this.state.bookTitleImage,
      bookData: this.state.bookData,
    };

    $.post('/api/updatebook', story, (data, status) => {
      // console.log('add PAGE', data);
    })
    .fail((err, status) => console.log('err', status));
  }

  render() {
    return (
      <div className="container">
        <h3>Your Story!</h3>
        {this.state.showCreateOrAddPage ? <AddPage content={this.state.content} bookData={this.state.bookData} handleContent={this.handleContent} savePage={this.savePage} /> : <CreateBookForm bookTitle={this.state.bookTitle} bookTitleImage={this.state.bookTitleImage} content={this.state.content} bookData={this.state.bookData} handleTitle={this.handleTitle} handleTitleImage={this.handleTitleImage} handleContent={this.handleContent} saveBook={this.saveBook} /> }
        
      </div>
    );
  }
}

export default CreateBook;
