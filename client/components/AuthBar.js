/* global document */
import React from 'react';
import $ from 'jquery';

const fbButtonStyle = {
  textTransform: 'none',
  backgroundColor: '#3B5998',
};

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
          {user ? <li>{user.name}</li>
                : <li>
                    <button className="btn fb-button" style={fbButtonStyle} onClick={this.signIn}>
                      <span className="fa fa-facebook-square"></span>
                      Log in
                    </button>
                  </li>}
          {user ? <li><button className="btn fb-button" style={fbButtonStyle} onClick={this.signOut}>Log out</button></li> : null}
        </ul>
      </div>
    );
  }
}

export default AuthBar;
