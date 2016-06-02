import React from 'react';
import ReactDOM from 'react-dom';

class Canvas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mouse: {
        click: false,
        move: false,
        pos: {x:0, y:0},
        pos_prev:false
      },
      canvas: null,
      context: null,
      width: window.innerWidth,
      height: window.innerHeight,
      socket: socket
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="canvas-container">
        <canvas className="canvas"></canvas>
      </div>
    );
  }
}

export default Canvas;