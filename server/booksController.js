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

    var newBook = Book ({
      bookTitle: 'The Very Hungry Caterpillar',
      author: 'Eric Carle',
      bookData: [
        {
          name: 'Page1',
          content: 'In the light of the moon a little egg lay on a leaf.',
          image: 'http://i.imgur.com/gXB9G7j.gif'
        },
        {
          name: 'Page2',
          content: 'On Tuesday he ate through two pears. But he was still hungry.',
          image: 'http://i.imgur.com/UbJv7zo.png'
        },
        {
          name: 'Page3',
          content: 'On Saturday, he ate through one piece of chocolate cake, one pickle, one slice of Swiss cheese, one slice of salami, one piece of cherry pie, one sausage, one cupcake, and one slice of watermelon.',
          image: 'http://i.imgur.com/yh1dpvf.gif'
        },
        {
          name: 'Page4',
          content: 'He built a small house, called a cocoon, around himself. He stayed inside for more than two weeks. Then he nibbled a hole in the cocoon, pushed is way out and …',
          image: 'http://i.imgur.com/z0RUFAo.png'
        },
        {
          name: 'Page5',
          content: 'Now he wasn’t hungry anymore – and he wasn’t a little caterpillar anymore. He was a big, fat caterpillar.',
          image: 'http://i.imgur.com/Vzbap43.gif'
        },
        {
          name: 'Page6',
          content: 'He was a beautiful butterfly!',
          image: 'http://i.imgur.com/M52l5cx.png'
        }
      ]
    });

    newBook.save(function(err) {
      if (err) {
        throw err;
      }
      console.log('New Book entry created !');
    });

    res.json({message: 'inside addBooks !!'});
  }
};