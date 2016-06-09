var booksController = require('./booksController.js');
var auth = require('./controllers/auth');

module.exports = function(app) {
  app.get('/api/books', booksController.getAllBooks);
  app.post('/api/books', booksController.addBook);

  app.get('/facebook/user', auth.facebook.user);
  app.get('/facebook/signin', auth.facebook.signin);
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
