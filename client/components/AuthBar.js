/* global document */
import React from 'react';
import $ from 'jquery';

class AuthBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    $.get('/facebook/verify')
      .then(user => {
        this.setState({ user });
      });
  }

  signIn() {
    document.location.assign('/facebook/signin');
  }

  signOut() {
    $.get('/facebook/signout').then(() => {
      this.setState({ user: {} });
    });
  }

  render() {
    const user = this.state.user ? this.state.user.facebook : '';

    return (
      <div>
        <ul>
          {user ? <li>{user.name}</li> : <li><button onClick={this.signIn}>Sign In</button></li>}
          {user ? <li><button onClick={this.signOut}>Sign Out</button></li> : null}
        </ul>
      </div>
    );
  }
}

export default AuthBar;
