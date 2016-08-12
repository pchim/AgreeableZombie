/* global document */
import 'materialize-css/sass/materialize.scss';
import React, { PropTypes, Component } from 'react';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getChildContext() {
    return {
      user: this.state.user,
      signIn: this.signIn,
      signOut: this.signOut,
    };
  }

  componentDidMount() {
    // $.get('/facebook/verify').then(user => user && this.setState({ ...this.state, user }));
  }

  signIn() {
    // document.location.assign('/facebook/signin');
  }

  signOut() {
    // $.get('/facebook/signout').then(() => this.setState({ ...this.state, user: null }));
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array,
};

App.childContextTypes = {
  user: PropTypes.object,
  signIn: PropTypes.func,
  signOut: PropTypes.func,
};



export default App;


