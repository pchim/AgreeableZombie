/* global document */

import React from 'react';
// import { Link } from 'react-router';
import $ from 'jquery';

class AuthBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    // $.get('/facebook/signin').then(user => {
    //   this.setState({ user });
    // });
    document.location.assign('/facebook/signin');
  }

  signOut() {
    $.get('/facebook/signout').then(() => {
      this.setState({ user: {} });
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            {
              name ? this.state.user.name
                   : <button onClick={this.signIn}>Sign In</button>
            }
          </li>
          <li>
            {
              name ? <button onClick={this.signOut}>Sign Out</button>
                   : null
            }
          </li>
        </ul>
      </div>
    );
  }
}

export default AuthBar;
