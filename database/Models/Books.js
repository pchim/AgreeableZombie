var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  bookTitle: String,
  pageName: Number,
  content: String,
  image: String
});

module.exports = bookSchema; //Exports bookSchema so models.js can access it