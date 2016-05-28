import React, { PropTypes, Component } from 'react';

var Button = (props) => (
  <div className="button"> 
    <button onClick={props.clickHandler}> Button </button>
  </div>  
  );


// var Button = React.createClass({
//       _notifyServer: function(event){
//         socket.emit('client event', {msg: 'button clicked'});
//       },
//       render: function(){
//         return (
//           <div className="update-label">
//           <button onClick={this._notifyServer}/>
//           </div>
//         );
//       }
// });

// var button = React.render(<Button/>, document.getElementById('mount-point'));

export default Button;

