var User     = require('../../../models/user');
var Strategy = require('passport-facebook').Strategy;

var config = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/facebook/callback',
  passReqToCallback: true
};

var verify = function(req, token, refreshToken, profile, done) {
  console.log(req);
  User.findOne({ 'facebook.id': profile.id }, function(err, existingUser) {
    var user;

    if (err) {
      return done(err);
    }

    if (existingUser) {
      return done(null, existingUser);
    }

    // if user exists on `req`, then
    //   user is logged in: link account;
    // otherwise create a new account.
    user = req.user ? req.user : new User();

    console.log(profile);

    user.facebook.id = profile.id;
    user.facebook.token = token;
    user.facebook.name = profile.displayName;

    return user.save(function(error, savedUser) {
      if (error) {
        throw error;
      }
      return done(null, savedUser);
    });
  });
};

module.exports = {
  strategy: new Strategy(config, verify)
};

