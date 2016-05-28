import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';
//import Button from './components/button.js';
//import Label from './components/label.js';

var render = function() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  );
};

render();
