import React, { PropTypes, Component } from 'react';
import TextArea from './TextArea.js';
import Button from './button.js';
import WebCam from './WebCam.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'hello'
    };

    socket.on('prev page', (data) => {
      console.log ('data from server', data);
      this.setState({msg: data.msg});
    });

    socket.on('next page', (data) => {
      this.setState({msg: data.msg});
    });
  }

  onClickPrev() {
    console.log('Previous Clicked');
    socket.emit('PrevButtonClick', {msg: 'Previous button clicked'});
  }

  onClickNext() {
    console.log('Next clicked');
    socket.emit('NextButtonClick', {msg: 'Next button clicked'});
  }

  changeText(event) {
    this.setState ({msg: event.msg});
  }
 
  render() {
    return (
      <div>
        <h1> Hello I am App </h1>
        <TextArea msg={this.state.msg}/>
        <Button clickHandler={this.onClickPrev.bind(this)}/> 
        <Button clickHandler={this.onClickNext.bind(this)}/> 

        <WebCam conversation={this.state.conversation} />
      </div>
      
    );
  }
};

export default App;
