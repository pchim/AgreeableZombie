var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema ({
  bookTitle: String,
  bookData: [{
    name: String,
    content: String,
    image: String
  }]
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book; 