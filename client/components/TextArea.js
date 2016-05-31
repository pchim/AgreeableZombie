import React, { PropTypes, Component } from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super (props);
  }

  render (){
    return (
      <div className="textArea">
        <h2>{this.props.msg}</h2>
      </div>
    )
  }
}

export default TextArea;