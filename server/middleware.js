var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function (app, express) {
  app.use(cors({
    origin: '*',
    methods: ['GET, POST, OPTIONS'],
    allowHeaders: 'content-type, accept',
    credentials: true,
    maxAge: 10
  }));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(cookieParser());
  app.use(session({
    secret: 'peter cotton-tail',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};
