import materialize from 'materialize-css/sass/materialize.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AuthBar from './AuthBar';

const App = (props) => (
  <div className="container">
    <AuthBar />
    <ul>
      <li><Link to="/library">Library</Link></li>
      <li><Link to="/story-time">Story Time</Link></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
