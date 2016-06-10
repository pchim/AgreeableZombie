var Book = require ('./bookModel.js');
//var getSampleBookData = require('../database/PublicBooksLoader/convertStoryData.js')
var Promise = Promise || require('bluebird');
var fs = require('fs');
fs.readFile = Promise.promisify(fs.readFile);

module.exports = {
  getAllBooks: function (req, res) {
    Book.find({}, function (err, books) {
      if (err) return res.status(500).send(err);
      return res.json(books);
    });
  },

  addBook: function (req, res, next) {
    console.log ('inside addBook !!');
    Book.remove({}).then(() => {
        fs.readFile(__dirname + '/../database/PublicBooksLoader/sample-book-data/14837.json')
          .then(content => JSON.parse(content))
          .then(content => {
            console.log(content);
            var newBook = Book ({
              bookTitle: 'The Very Hungry Caterpillar',
              author: 'Eric Carle',
              bookData: content
            });

            newBook.save(function(err) {
              if (err) {
                throw err;
              }
              console.log('New Book entry created !');
            });

            res.json({message: 'inside addBooks !!'});     
      });
    })

  }
};
