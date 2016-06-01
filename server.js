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
  //socket.emit('server event', {hello: 'world'});
  socket.on('NextButtonClick', function(data) {
    console.log ('inside server');
    socket.emit('next page', data);
  });
  socket.on('PrevButtonClick', function(data) {
    socket.emit('prev page', data);
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

