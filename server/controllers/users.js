var User = require('../models/User');

module.exports = {
  getAllUsers: function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(users);
    });
  }
};
