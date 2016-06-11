import React from 'react';

const AddPage = (props) => (
  <div>
    <form onSubmit={props.savePage}>
      <textarea
        className="materialize-textarea textareastory"
        type="text"
        placeholder="Write More!"
        value={props.content}
        onChange={props.handleContent}
      >
      </textarea>
      <input className="btn waves-effect waves-light" type="submit" value="ADD PAGE" />
    </form>
  </div>
);

export default AddPage;

