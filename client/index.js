import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from './components/App';
import LibraryContainer from './components/LibraryContainer';
import StoryTime from './components/StoryTime';
import NoMatch from './components/NoMatch';
import CreateBook from './components/CreateBook';

// Check if browser has WebRTC, WebRTC is required for webcam/Twilio to work
// TODO: check before entering the story time route
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

const render = () => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/library" />
        <Route path="library" component={LibraryContainer} />
        <Route path="create" component={CreateBook} />
        <Route path="story-time/user/:bookId" component={StoryTime} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>,
    document.getElementById('app')
  );
};

render();
