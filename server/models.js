var mongoose = require("mongoose");
var Books = require("./Models/Books"); //imports the Books module. Contains the bookSchema
mongoose.connect("mongodb://localhost:8000/library"); //db name is library

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

var Book = mongoose.model("Book", Books.bookSchema); //This created Book model

module.exports.Book = Book;