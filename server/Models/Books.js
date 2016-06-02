var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  bookTitle: String,
  pageName: String,
  content: String,
  image: String
});

module.exports.bookSchema = bookSchema; //Exports bookSchema so models.js can access it