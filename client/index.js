import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

var render = function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
};

render();
