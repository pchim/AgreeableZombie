var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/client'));


var port = process.env.PORT || 8000;


app.get('/', (req, res) => {
  res.send('serving up static files!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('highlight', {hello: 'world'});
  socket.on('event2', function(data) {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port, (err) => {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Your App is running!! Better go catch it!' + port);
});


    
