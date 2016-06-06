console.log("seed is running!");

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library', function() {
  mongoose.connection.on('open', function(){
    console.log("Database connection now open!");
  });
});


