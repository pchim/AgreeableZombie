import React from 'react';
import $ from 'jquery';

class CreateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      content: '',
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleAuthor(event) {
    this.setState({ author: event.target.value });
  }

  handleContent(event) {
    this.setState({ content: event.target.value });
  }

  saveBook(e) {
    e.preventDefault();
    const context = this;
    const story = {
      title: this.state.title,
      author: this.state.author,
      content: this.state.content,
    };

    $.post('/User', story, (data, status) => {
      console.log('the data', data);
      console.log(status);
      context.setState({ userData: this.state.userData.concat([data]) });
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
            value={this.state.title}
            onChange={this.handleTitle}
          />
          <input
            type="text"
            placeholder="Author"
            value={this.state.author}
            onChange={this.handleAuthor}
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
