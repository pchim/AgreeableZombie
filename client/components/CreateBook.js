import React from 'react';
import $ from 'jquery';

class CreateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: '',
      bookTitleImage: '',
      bookData: [],
      content: '',
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleTitleImage = this.handleTitleImage.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.saveBook = this.saveBook.bind(this);
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
    console.log('the content', this.state.content)
    this.setState({ bookData: this.state.bookData.push(
      {
        content: this.state.content,
        image: false,
      }
    ),
    });
    // this.setState({
    //   bookData: this.state.bookData.concat({
    //     content: this.state.content,
    //     image: false,
    //   }),
    // });

    const story = {
      bookTitle: this.state.bookTitle,
      bookTitleImage: this.state.bookTitleImage,
      bookData: this.state.bookData,
    };

    $.post('/api/savebook', story, (data, status) => {
      console.log('save STORY', data);
      console.log(data);
      console.log(status);
    })
    .fail((err, status) => console.log('err', status));
  }

  render() {
    return (
      <div className="container">
        <h3>Your Story!</h3>
        <form onSubmit={this.saveBook}>
          <input
            type="text"
            placeholder="Title of Book"
            value={this.state.bookTitle}
            onChange={this.handleTitle}
          />
          <input
            type="text"
            placeholder="Title Image URL"
            value={this.state.bookTitleImage}
            onChange={this.handleTitleImage}
          />
          <textarea
            className="materialize-textarea textareastory"
            type="text"
            placeholder="Write your story!"
            value={this.state.content}
            onChange={this.handleContent}
          >
          </textarea>
          <input className="btn waves-effect waves-light" type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateBook;
