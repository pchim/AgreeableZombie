var Models = require("./models"); //Instantiate a Models object so you can access the models.js module.

var Kid = new Models.Book({
  bookTitle: "I'm a Big Kid Now",
  pageName: "Page1",
  content: "Hello. There. I'm a big kid now.",
  image: "https://scontent-sjc.xx.fbcdn.net/t31.0-8/p960x960/12898293_555536841282152_1579387227536746401_o.jpg"

});

Kid.save(function(error) {
  console.log("Your book has been saved!");
  if (error) {
    console.error(error);
  }
});