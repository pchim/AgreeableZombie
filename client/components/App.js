import React, { PropTypes, Component } from 'react';


class App extends Component {

  componentDidMount() {
    console.log('mounted');
    var socket = io();
  }

  render() {
    return (
      <div>
        <h1> Hello I am App </h1>
      </div>
    );
  }
}

export default App;
