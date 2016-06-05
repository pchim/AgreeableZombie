import React, { PropTypes, Component } from 'react';
import Book from './Book.js';
import Title from './Title.js';
import PrevButton from './PrevButton.js';
import NextButton from './NextButton.js';
import Background from './Background.js';
import LeftPageText from './LeftPageText.js';
import RightPageText from './RightPageText.js';
import LeftPageImage from './LeftPageImage.js';
import RightPageImage from './RightPageImage.js';
import Video1 from './Video1.js';
import Video2 from './Video2.js';
import WebCam from './WebCam.js';
import Canvas from './Canvas.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'This is the TextArea.',
      pageCounter: 0, 
      bookTitle: '',
      bookData: []
    };

    var app = this;

    $.getJSON('/api/books', function(data) {

      console.log('data from server is - ', data);

      var title = data[0].bookTitle;
      var bookData = data[0].bookData;

      console.log('bookTitle is - ', title);
      console.log('bookdata is - ', bookData);

      app.setState({
        bookTitle: title,
        bookData: bookData
      });
    });

    socket.on('prev page', (data) => {
      console.log ('data from server', data);
      this.setState({msg: data.msg});
      this.setState({pageCounter: data.pageCounter});
    });

    socket.on('next page', (data) => {
      this.setState({msg: data.msg});
      this.setState({pageCounter: data.pageCounter});
    });
  }
  onClickPrev() {
    console.log('Previous Clicked');
    socket.emit('PrevButtonClick', {msg: 'Previous button clicked', pageCounter: this.state.pageCounter-2});
    if(this.state.pageCounter-1>=0) {
      this.setState({pageCounter: this.state.pageCounter-2});
    } else {
      socket.emit('PrevButtonClick', {msg: "BEGINNING OF BOOK!", pageCounter: this.state.pageCounter});
    }
  }

  onClickNext() {
    console.log('Next clicked');
    if (this.state.pageCounter<this.state.bookData.length-1) { 
      this.setState({pageCounter: this.state.pageCounter+2});
      socket.emit('NextButtonClick', {msg: 'Next button clicked', pageCounter: this.state.pageCounter+2});
    } else {
      socket.emit('NextButtonClick', {msg: "END OF BOOK!", pageCounter: this.state.pageCounter});
    }  
  }

  changeText(event) {
    this.setState ({msg: event.msg});
  }
 
  render() {
    return (
      <div>
        <Background />
        <Title bookTitle={this.state.bookTitle}/>
        <Book msg={this.state.msg} /> 
        <LeftPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
        <RightPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
        <LeftPageImage bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
        <RightPageImage bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
        <PrevButton clickHandler={this.onClickPrev.bind(this)}/>
        <NextButton clickHandler={this.onClickNext.bind(this)}/>
        <Video1 />
        <Video2 />

        <WebCam conversation={this.state.conversation} />
        
        <Canvas />
      </div>
      
    );
  }
};

export default App;