var User     = require('../../../models/User');
var Strategy = require('passport-facebook').Strategy;

var config = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
  passReqToCallback: true,
  profileFields: ['email', 'first_name', 'last_name', 'displayName']
};

var verify = function(req, token, refreshToken, profile, done) {
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

    user.facebook.id = profile.id;
    user.facebook.token = token;
    user.facebook.name = profile.displayName;
    user.facebook.email = profile.emails[0].value;
    user.facebook.firstName = profile.name.givenName;
    user.facebook.lastName = profile.name.familyName;

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

