var Book = require ('./bookModel.js');
var Promise = Promise || require('bluebird');
var fs = require('fs');
fs.readFile = Promise.promisify(fs.readFile);
fs.readdir = Promise.promisify(fs.readdir);

var archiveHelper = require('../database/PublicBooksLoader/archiveHelper.js');
module.exports = {
  getAllBooks: function (req, res) {
    Book.find({}, function (err, books) {
      if (err) return res.status(500).send(err);
      return res.json(books);
    });
  },

  // currently not un use
  addBook: function (req, res, next) {
    console.log ('inside addBook !!');
    const filePath = archiveHelper.paths.sampleData;
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
  },

  // add all sample books data, called from get '/api/addAllBooks'
  addAllSampleBooks: function (req, res, next) {
    console.log('add sample books');
    const filePath = archiveHelper.paths.sampleData;
    Book.remove({}).then( () => {
      fs.readdir(filePath).then(files => {
        if(files.length) {
          while (files.indexOf('.DS_Store') > -1) {
            files.splice(files.indexOf('.DS_Store'), 1);
          }
          let allBooks = [];
          var importData = (i) => {
            fs.readFile(filePath + '/' + files[i]).then(content => JSON.parse(content))
              .then(book => {
                allBooks.push(book);
              }).then(() => {
                if (i === files.length-1) {
                  Book.insertMany(allBooks);
                  console.log('all books added');
                  res.json({ message: 'sample books added' });
                } else {
                  importData(i+1);
                }
              });
          };
          importData(0);
        }
      });
    });
  },
};
