var booksController = require('./booksController.js');

module.exports = function (app, express) {

  app.get ('/api/books', booksController.getAllBooks);

  app.post ('/api/books', booksController.addBook);
};