var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
  {
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String,
      firstName: String,
      lastName: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
