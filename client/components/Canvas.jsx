import React from 'react';
import ReactDOM from 'react-dom';
// import update from 'react-addons-update';

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