var books = require('./controllers/books');
// var auth = require('./controllers/auth');
var email = require('./controllers/email');

module.exports = function(app) {
  app.get('/api/books', books.getAllBooks);
  app.post('/api/savebook', books.saveCreatedBook);
  app.post('/api/updatebook', books.updateBook);
  app.post('/api/getBook', books.getOneBook);
  app.post('/api/addAllBooks', books.addAllSampleBooks);

  app.post('/api/email', email.sendEmail);

  // app.get('/facebook/signin', auth.facebook.signin);
  // app.get('/facebook/verify', function(req, res) {
  //   if (req.user) {
  //     res.status(200).json(req.user);
  //   } else {
  //     res.status(401).json({ message: 'not logged in' });
  //   }
  // });
  // app.get('/facebook/callback', auth.facebook.callback);
  // app.get('/facebook/signout', function(req, res) {
  //   var user = req.user;
  //   user.facebook.id    = undefined;
  //   user.facebook.token = undefined;
  //   user.facebook.name  = undefined;
  //   user.facebook.email = undefined;
  //   user.facebook.firstName = undefined;
  //   user.facebook.lastName = undefined;
  //   user.save(function() {
  //     res.redirect('/');
  //   });
  // });
};

