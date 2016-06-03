import React from 'react';
import ReactDOM from 'react-dom';

class Canvas extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // mouse state
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev:false,

      //canvas state
      canvas: null,
      context: null,
      width: window.innerWidth,
      height: window.innerHeight,
      socket: socket
    };

    socket.on('drawLine', data => {
      var line = data.line;
      console.log(line, '<<<<< line for drawing on canvas');
      var context = this.state.context;
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(line[0].x * this.state.width, line[0].y * this.state.height);
      context.lineTo(line[1].x * this.state.width, line[1].y * this.state.height);
      context.stroke();
    });
  }

  componentDidMount() {
    var canvas = this.refs.canvas;
    var context = canvas.getContext('2d');
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    canvas.onmousedown = e => {
      // this.setState
      console.log(e);
      this.setState({click:true});
    };

    canvas.onmouseup = e => {
      console.log('mouse up detected');
      this.setState({click:false});
    };

    canvas.onmousemove = e => {
      var mx = e.clientX / canvas.width;
      var my = e.clientY / canvas.height;

      this.setState({
        move: true,
        pos: {x:mx, y:my}
      });
    };

    this.setState({
      canvas: canvas,
      context: context
    });

    this.drawLoop();
  }

  drawLoop() {
    if(this.state.click && this.state.move && this.state.pos_prev) {
      socket.emit('drawLine', {line: [this.state.pos, this.state.pos_prev]});
      this.setState({move: false});
    }
    this.setState({pos_prev: this.state.pos});
    setTimeout(this.drawLoop.bind(this), 25);
  }

  render() {
    return (
      <div className="canvas-container">
      THE CANVAS
        <canvas id="canvas" ref="canvas" className="canvas"></canvas>
      </div>
    );
  }
}

export default Canvas;