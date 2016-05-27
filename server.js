var express = require('express');


var app = express();
app.use(express.static(__dirname + '/client'));


var port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('serving up static files!');
});


app.listen(port, function(err) {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Your App is running!! Better go catch it!' + port);
});