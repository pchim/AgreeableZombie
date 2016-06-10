var books = require('./controllers/books');
var auth = require('./controllers/auth');

module.exports = function(app) {
  app.get('/api/books', books.getAllBooks);
  app.post('/api/books', books.addBook);

  app.get('/facebook/signin', auth.facebook.signin);
  app.get('/facebook/verify', function(req, res) {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ message: 'not logged in' });
    }
  });
  app.get('/facebook/callback', auth.facebook.callback);
  app.get('/facebook/signout', function(req, res) {
    var user = req.user;
    user.facebook.id    = undefined;
    user.facebook.token = undefined;
    user.facebook.name  = undefined;
    user.save(function() {
      res.redirect('/profile');
    });
  });
};
