import React, { PropTypes, Component } from 'react';
import TextArea from './TextArea.js';
import PrevButton from './PrevButton.js';
import NextButton from './NextButton.js';
import Background from './Background.js';
import LeftPage from './LeftPage.js';
import RightPage from './RightPage.js';
import Video1 from './Video1.js';
import Video2 from './Video2.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'This is the TextArea.',
      pageCounter: 0, 
      bookData: [
        // {
        //   name: 'BookCover',
        //   content: null,
        //   image: 'https://drive.google.com/open?id=0Bz-k8izjSKu9VjhNWjJWN056UkE'
        // },
        {
          name: 'Page1',
          content: 'In the light of the moon a little egg lay on a leaf.',
          image: 'http://bit.ly/22yATDi'
        },
        {
          name: 'Page2',
          content: 'On Tuesday he ate through two pears. But he was still hungry.',
          image: 'http://bit.ly/1WZdoUc'
        },
        {
          name: 'Page3',
          content: 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami, one lollipop, one piece of cherry pie, one sausage, one cupcake, and one slice of watermelon. That night he had a stomach ache.',
          image: 'http://bit.ly/1Pl7nPa'
        },
        {
          name: 'Page4',
          content: 'He built a small house, called a cocoon, around himself. He stayed inside for more than two weeks. Then he nibbled a hole in the cocoon, pushed is way out and …',
          image: 'http://bit.ly/1TXMLeW'
        },
        {
          name: 'Page5',
          content: 'Now he wasn’t hungry anymore – and he wasn’t a little caterpillar anymore. He was a big, fat caterpillar.',
          image: 'http://bit.ly/1WxlhjD'
        },
        {
          name: 'Page6',
          content: 'He was a beautiful butterfly!',
          image: 'http://bit.ly/1XQvu9S'
        }
        // {
        //   name: 'BackCover'
        //   content: null,
        //   image: 'http://bit.ly/1Uvgqw0'
        // }

      ]
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
    if(this.state.pageCounter-1>=0) {
      this.setState({pageCounter: this.state.pageCounter-1});
    } else {
      socket.emit('PrevButtonClick', {msg: "BEGINNING OF BOOK!"});
    }
  }

  onClickNext() {
    console.log('Next clicked');
    if (this.state.pageCounter<this.state.bookData.length-1) {
      // socket.emit('NextButtonClick', {bookData: bookData[pageCounter].image});
      this.setState({pageCounter: this.state.pageCounter+1});
    } else {
      socket.emit('NextButtonClick', {msg: "END OF BOOK!"});
    }
    // socket.emit('NextButtonClick', {msg: 'Next button clicked'});

  }

  changeText(event) {
    this.setState ({msg: event.msg});
  }
 
  render() {
    {console.log("What's up brah")};
    return (
      <div>
        <div id='header'>
          <h1>Amazing Reader App</h1>
        </div>
        <PrevButton clickHandler={this.onClickPrev.bind(this)}/>
        {console.log("hello there")}
        <NextButton clickHandler={this.onClickNext.bind(this)}/>
        <LeftPage bookData={this.state.bookData} pageCounter={this.state.pageCounter}/>
        <RightPage />

        <Background />

        <Video1 />
        <Video2 />
      </div>
    );
  }
};

export default App;
