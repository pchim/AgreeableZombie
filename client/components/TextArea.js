import React, { PropTypes, Component } from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super (props);
  }

  render (){
    return (
      <div className="my-label">
        <h2>{this.props.msg}</h2>
      </div>
    )
  }
}

// var Label = React.createClass({
//   _onUpdateLabel: function(data) {
//     this.setState(serverMsg: data.msg);
//   },
//   getInitialState: function(){
//     return { serverMsg: '' };
//   },
//   render: function(){
//     return (
//       <div class="my-label">
//         <h2>{this.state.serverMsg}</h2>
//       </div>
//     )
//   }
// });

// var label = React.render(<Label/>, document.getElementById('label-mount-point'));
// socket.on('update label', function (data) {
//   label._onUpdateLabel(data);
// });

export default TextArea;