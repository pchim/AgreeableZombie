import 'materialize-css/sass/materialize.scss';
import React, { PropTypes, Component } from 'react';
import AuthBar from './AuthBar';

class App extends Component {
  componentDidMount() {
    if (this.props.routes[1].path === 'story-time') {
      document.body.classList.toggle('story-time', this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routes[1].path.startsWith('story-time')) {
      document.body.classList.toggle('story-time', nextProps);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('story-time');
  }

  render() {
    return (
      <div className="container">
        <AuthBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array,
};

export default App;

