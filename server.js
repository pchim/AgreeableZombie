var path = require('path');
var mongoose = require('mongoose');

// Express-Node-Socket.io requirements
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var twilio = require('twilio');
var randomUsername = require('./randos.js');

var port;
var grant;
var AccessToken;
var ConversationsGrant;

// Setup of environment variables
require('dotenv').config({ silent: true });

// configure our server with all the middleware and routing
require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, express);

// Setup of environment variables
require('dotenv').load();
var path = require('path');

// connect to mongo database named "books"
mongoose.connect(process.env.MONGODB_URI);

/* Twilio Webcam Setup
Sign-up with Twilio and get keys
Load Twilio configuration from .env config file - the following environment
variables should be set:
process.env.TWILIO_ACCOUNT_SID
process.env.TWILIO_API_KEY
process.env.TWILIO_API_SECRET
process.env.TWILIO_CONFIGURATION_SID
*/
AccessToken = twilio.AccessToken;
ConversationsGrant = AccessToken.ConversationsGrant;

app.use(express.static(__dirname + '/client'));


// Twilio token request
app.get('/token', function(req, res) {
  var identity = randomUsername();

  // Create an access token
  var token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  // grant the access token Twilio Video capabilities
  grant = new ConversationsGrant();
  grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

// Socket.IO Connection
io.on('connection', function(socket) {
  var room;

  socket.on('join', function(data) {
    if (room) {
      console.log('leaving room ' + room);
      socket.leave(room);
    }

    room = data;
    console.log('joining room ' + room);
    socket.join(room);
  });

  socket.on('action', function(data) {
    console.log('action in room ' + room + ': ', data);
    socket.to(room).emit('action', data);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected from room ' + room);
  });
});

port = process.env.PORT || 3000;
server.listen(port, function(err) {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Your server is running!! Better go catch it!' + port);
});

module.exports = app;
