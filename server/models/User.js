var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema(
  {
    facebook: {
      id: String,
      token: String,
      name: String
    }
  },
  { timestamps: true }
);


// we're not storing passwords, right? do we get a password from Facebook?

// UserSchema.pre('save', function hashPassword(next) {
//   bcrypt.hash(this.password, 5, function(err, hash) {
//     this.password = hash;
//     next();
//   });
// });

/**
 * Create instance method for authenticating user
 */
// UserSchema.methods.authenticate = function authenticate(password, callback) {
//   var hash = this.password;

//   bcrypt.compare(password, hash, function(err, isMatch) {
//     if (err) {
//       return callback(err);
//     }
//     return callback(null, isMatch);
//   });
// };

module.exports = mongoose.model('User', UserSchema);
