import React from 'react';
import Logo from './storycomponents/Logo.js';
import Title from './storycomponents/Title.js';
import BookBackground from './storycomponents/BookBackground.js';
import PrevButton from './storycomponents/PrevButton.js';
import NextButton from './storycomponents/NextButton.js';
import LeftPageText from './storycomponents/LeftPageText.js';
import RightPageText from './storycomponents/RightPageText.js';
import WebCam from './storycomponents/WebCam.js';
import Canvas from './storycomponents/Canvas.jsx';
import SideBar from './storycomponents/SideBar.js';
import socket from '../../websocket.js';
import $ from 'jquery';
// import LeftPageImage from './storycomponents/LeftPageImage.js';
// import RightPageImage from './storycomponents/RightPageImage.js';

class StoryTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCounter: 0,
      bookTitle: '',
      bookData: [],
      author: 'Eric Carle',
    };

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);

    socket.on('prev page', (data) => {
      console.log('data from server', data);
      this.setState({ msg: data.msg });
      this.setState({ pageCounter: data.pageCounter });
    });

    socket.on('next page', (data) => {
      this.setState({ msg: data.msg });
      this.setState({ pageCounter: data.pageCounter });
    });
  }

  componentWillMount() {
    const app = this;
    $.getJSON('/api/books', function(data) {

      console.log('data from server is - ', data);

      const title = data[0].bookTitle;
      const bookData = data[0].bookData;

      console.log('bookTitle is - ', title);
      console.log('bookdata is - ', bookData);

      app.setState({
        bookTitle: title,
        bookData,
      });
    });
  }

  componentDidMount() {
    this.render();
  }

  onClickPrev() {
    console.log('Previous Clicked');
    socket.emit('PrevButtonClick', {
      msg: 'Previous button clicked', pageCounter: this.state.pageCounter - 2,
    });
    if (this.state.pageCounter - 1 >= 0) {
      this.setState({
        pageCounter: this.state.pageCounter - 2 });
    } else {
      socket.emit('PrevButtonClick', {
        msg: 'BEGINNING OF BOOK!', pageCounter: this.state.pageCounter,
      });
    }
  }

  onClickNext() {
    console.log('Next clicked');
    if (this.state.pageCounter < this.state.bookData.length - 1) {
      this.setState({ pageCounter: this.state.pageCounter + 2 });
      socket.emit('NextButtonClick', {
        msg: 'Next button clicked', pageCounter: this.state.pageCounter + 2,
      });
    } else {
      socket.emit('NextButtonClick', {
        msg: 'END OF BOOK!',
        pageCounter: this.state.pageCounter,
      });
    }
  }

  changeText(event) {
    this.setState({
      msg: event.msg,
    });
  }

  render() {
    if (this.state.bookData.length > 0) {
      return (
        <div  >
          <nav className="orange lighten-5">
            <SideBar />
          </nav>
          <section>
            <Title bookTitle={this.state.bookTitle} author={this.state.author} />
            <BookBackground />
            <PrevButton leftClickHandler={this.onClickPrev} />
            <NextButton rightClickHandler={this.onClickNext} />
            <LeftPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter} />
            <RightPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter} />
            <div id="webcam-features">
              <WebCam conversation={this.state.conversation} />
            </div>
          </section>
        </div>
      );
    }
    return (<p> Loading ... </p>);
  }
}

export default StoryTime;


// <div id='buttons-with-book'>
//   <div id='left-button'><PrevButton clickHandler={this.onClickPrev.bind(this)}/></div>
//   <div id='right-button'><NextButton clickHandler={this.onClickNext.bind(this)}/></div>
//     <LeftPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
//     <LeftPageImage bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
//     <RightPageText bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
//     <RightPageImage bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>   
//     </div>
//      </div>
// // <Canvas />