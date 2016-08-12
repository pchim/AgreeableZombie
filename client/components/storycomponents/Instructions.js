import React, { Component } from 'react';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };

    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  toggleInstructions() {
    this.setState({ display: !this.state.display });
  }

  render() {
    return (
      <div>
        <div
          id="toggle-instructions"
          onClick={this.toggleInstructions}
        >Instructions   <a>{this.state.display ? 'Hide ' : 'Show '}</a></div>
          {this.state.display ? (<div id="instructions">
            <p>1. Double click on BOOK icon to go back to library.</p>
            <p>2. Click on CAMERA icon to ALLOW webcam broadcast.</p>
            <p>3. Send URL in address bar to INVITE guest to broadcast.</p>
            <p>4. HIDE instructions.</p>
            <p>5. Interact and read book</p>
          </div>) : (<div></div>)}
      </div>
    );
  }
}

export default Instructions;
