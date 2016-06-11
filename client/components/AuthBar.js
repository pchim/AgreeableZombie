import React, { PropTypes } from 'react';

const fbButtonStyle = {
  textTransform: 'none',
  backgroundColor: '#3B5998',
};

const AuthBar = (props, context) => (
  <div>
    <ul>
      {context.user ?
        <li>{context.user.facebook.name}</li> :
        <li>
          <button className="btn fb-button" style={fbButtonStyle} onClick={context.signIn}>
            <span className="fa fa-facebook-square"></span>
            Log in
          </button>
        </li>
      }
      {context.user ?
        <li>
          <button className="btn fb-button" style={fbButtonStyle} onClick={context.signOut}>
            Log out
          </button>
        </li> : null
      }
    </ul>
  </div>
);

AuthBar.contextTypes = {
  user: PropTypes.object,
  signIn: PropTypes.func,
  signOut: PropTypes.func,
};

export default AuthBar;
