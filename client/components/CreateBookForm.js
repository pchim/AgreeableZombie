import React from 'react';

const CreateBookForm = (props) => (
  <div>
    <form onSubmit={props.saveBook}>
      <input
        type="text"
        placeholder="Title of Book"
        value={props.bookTitle}
        onChange={props.handleTitle}
      />
      <input
        type="text"
        placeholder="Title Image URL"
        value={props.bookTitleImage}
        onChange={props.handleTitleImage}
      />
      <textarea
        className="materialize-textarea textareastory"
        type="text"
        placeholder="Write your story!"
        value={props.content}
        onChange={props.handleContent}
      >
      </textarea>
      <input className="btn waves-effect waves-light" type="submit" value="CREATE BOOK" />
    </form>
  </div>
);

export default CreateBookForm;

