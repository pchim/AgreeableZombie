var Book = require ('./bookModel.js');

module.exports = {
  getAllBooks: function (req, res, next) {
    //res.json({message: 'inside getAllBooks !!'});

    Book.find({}, function(err, books) {
      if (err) {
        throw err;
      }
      console.log ('inside getAllBooks - ', books);
      res.json(books);
    });
  },

  addBook: function (req, res, next) {
    console.log ('inside addBook !!');
    //res.json({message: 'inside addBooks !!'});

    var newBook = Book ({

    });

  }
};