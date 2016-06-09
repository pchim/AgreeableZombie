var passport = require('passport');
var User = require('../../models/User');
var facebook = require('./strategies/facebook');

passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  User.findById(id, function(err, user) {
    callback(err, user);
  });
});

passport.use('facebook', facebook.strategy);

module.exports = {
  facebook: {
    signin: passport.authenticate('facebook'),
    callback: passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    }),
    // these two are not used right now!
    link: passport.authorize('facebook'),
    linkCallback: passport.authorize('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  }
};
