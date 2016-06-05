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

    // var newBook = Book ({
    //   bookTitle: 'The Very Hungry Caterpillar',
    //   bookData: [
    //     {
    //       name: 'Page1',
    //       content: 'In the light of the moon a little egg lay on a leaf.',
    //       image: 'http://bit.ly/22yATDi'
    //     },
    //     {
    //       name: 'Page2',
    //       content: 'On Tuesday he ate through two pears. But he was still hungry.',
    //       image: 'http://bit.ly/1WZdoUc'
    //     },
    //     {
    //       name: 'Page3',
    //       content: 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami, one lollipop, one piece of cherry pie, one sausage, one cupcake, and one slice of watermelon. That night he had a stomach ache.',
    //       image: 'http://bit.ly/1Pl7nPa'
    //     },
    //     {
    //       name: 'Page4',
    //       content: 'He built a small house, called a cocoon, around himself. He stayed inside for more than two weeks. Then he nibbled a hole in the cocoon, pushed is way out and …',
    //       image: 'http://bit.ly/1TXMLeW'
    //     },
    //     {
    //       name: 'Page5',
    //       content: 'Now he wasn’t hungry anymore – and he wasn’t a little caterpillar anymore. He was a big, fat caterpillar.',
    //       image: 'http://bit.ly/1WxlhjD'
    //     },
    //     {
    //       name: 'Page6',
    //       content: 'He was a beautiful butterfly!',
    //       image: 'http://bit.ly/1XQvu9S'
    //     }
    //   ]
    // });

    // newBook.save(function(err) {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log('New Book entry created !');
    // });

    res.json({message: 'inside addBooks !!'});
  }
};