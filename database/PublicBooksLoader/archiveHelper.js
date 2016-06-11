const url = require('url');
const fs = require('fs-extra');
var fetch = fetch || require('node-fetch');
var limitFetch = require('./request-limiter/limit-fetch.js');

const archive = {};
archive.paths = {
  stories: __dirname + '/archived-stories',
  sampleData: __dirname + '/sample-book-data', 
};

module.exports = archive;

