var Book = require('../models/Book.js');
var Promise = require('bluebird');
var fs = require('fs');
fs.readFile = Promise.promisify(fs.readFile);
fs.readdir = Promise.promisify(fs.readdir);

var archiveHelper = require('../../database/PublicBooksLoader/archiveHelper.js');
module.exports = {
  getAllBooks: function (req, res) {
    Book.find({}, function (err, books) {
      if (err) return res.status(500).send(err);
      return res.json(books);
    });
  },

  getOneBook: function (req, res) {
    Book.findOne({ "_id": req.body.bookId }).then(book => {
      res.json(book);
    });
  },

  // currently not un use
  addBook: function (req, res) {
    Book.remove({}).then(function() {
      fs.readFile(__dirname + '/../database/PublicBooksLoader/sample-book-data/14837.json')
        .then(function(content) { return JSON.parse(content); })
        .then(function(content) {
          var newBook = new Book({
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

          res.json({ message: 'inside addBooks !!' });
        });
    });
  },

  updateBook: function (req, res) {
    Book.findOne({bookTitle: req.body.bookTitle}, function(err, book) {
      console.log('what the book is', book)
        book.bookData = req.body.bookData;
        book.save(function(err) {
            if(!err) {
                console.log("updated book object");
            }
            else {
                console.log("Error: could not book ");
            }
        });
        }
    );
  },

  saveCreatedBook: function (req, res) {
    var newCreatedBook = new Book({
      bookTitle: req.body.bookTitle,
      bookTitleImage: req.body.bookTitleImage,
      bookData: req.body.bookData,
    }).save(function(err, newBook) {
      if (err) {
        console.log('cannot save newBook');
      } else {
        console.log('successful save of newly created book')
        res.send(newBook);
      }
    });
  },


  // add all sample books data, called from get '/api/addAllBooks'
  addAllSampleBooks: function (req, res) {
    console.log('add sample books');
    var filePath = archiveHelper.paths.sampleData;
    Book.remove({}).then(function() {
      fs.readdir(filePath).then(function(files) {
        if (files.length) {
          while (files.indexOf('.DS_Store') > -1) {
            files.splice(files.indexOf('.DS_Store'), 1);
          }
          var allBooks = [];
          var importData = function(i) {
            fs.readFile(filePath + '/' + files[i])
              .then(function(content) { return JSON.parse(content); })
              .then(function(book) {
                allBooks.push(book);
              })
              .then(function() {
                if (i === files.length - 1) {
                  Book.insertMany(allBooks);
                  console.log('all books added');
                  res.json({ message: 'sample books added' });
                } else {
                  importData(i + 1);
                }
              });
          };
          importData(0);
        }
      });
    });
  }
};
