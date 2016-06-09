var path = require('path');
var mongoose = require('mongoose');

// Express-Node-Socket.io requirements
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Setup of environment variables
require('dotenv').config({ silent: true });

// configure our server with all the middleware and routing
require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, express);

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
var twilio = require('twilio');
var AccessToken = twilio.AccessToken;
var ConversationsGrant = AccessToken.ConversationsGrant;
var randomUsername = require('./randos.js');

app.use(express.static(__dirname + '/client'));

var port = process.env.PORT || 3000;

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

    //grant the access token Twilio Video capabilities
    var grant = new ConversationsGrant();
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

// draw history for canvas
var drawHistory = [];

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('NextButtonClick', function(data) {
    console.log ('inside server');
    io.emit('next page', data);
  });
  socket.on('PrevButtonClick', function(data) {
    io.emit('prev page', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //Socket Events for Canvas interactions
  for(var i in drawHistory){
    socket.emit('drawLine', drawHistory[i]);
  }

  socket.on('drawLine', data => {
    var newLine = {line: data.line};
    drawHistory.push(newLine);
    io.emit('drawLine', newLine);
  });
});

server.listen(port, (err) => {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Your server is running!! Better go catch it!' + port);
});

module.exports = app;
