import React, { PropTypes, Component } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    socket.on('prev page', function(data){
      console.log ('data from server', data);
    });

    socket.on('next page', function(data) {

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
 
  render() {
    return (
      <div>
        <h1> Hello I am App </h1>
        <TextArea />
        <Button clickHandler={this.onClickPrev.bind(this)}/> 
        <Button clickHandler={this.onClickNext.bind(this)}/> 
      </div>
    );
  }
};

var Button = (props) => (
  <div className="button"> 
    <button onClick={props.clickHandler}> Button </button>
  </div>  
  );

class TextArea extends React.Component {
  constructor(props) {
    super (props);
    this.state = { 
      msg: ''
    }
  }

  changeText(event) {
    this.setState ({msg: event.msg});
  }

  render (){
    return (
      <div className="my-label">
        <h2 onChange={this.changeText}>{this.state.msg}</h2>
      </div>
    )
  }
}

export default App;
