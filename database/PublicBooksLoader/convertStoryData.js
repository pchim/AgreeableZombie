const archiveHelper = require('./archiveHelper.js');
var Promise = Promise || require('bluebird');
const fs = require('fs-extra');
const stripTags = require('striptags');

// is our image hosted online?
const hosted = true;
require('dotenv').load();
console.log('process ', process.env.IMAGE_HOST);

// location where images are hosted
let host = '../assets/stories/';
if (hosted === true) {
  host = process.env.IMAGE_HOST;
}

// file path where all the stories folders are stored
const filePath = archiveHelper.paths.stories;

// promisify necessary fs files
fs.readdir = Promise.promisify(fs.readdir);
fs.readFile = Promise.promisify(fs.readFile);
fs.writeFile = Promise.promisify(fs.writeFile);
fs.copy = Promise.promisify(fs.copy);

// get the file path minus the furthest right directory or file
// e.g. getTrail('sample/data/directory/last') returns ['sample/data/directory', 'last']
const getTrail = filePath => {
  let trail = filePath.split('/');
  let lastTrail = trail[trail.length-1];
  trail = trail.slice(0, trail.length-1).join('/');
  return [trail, lastTrail];
};

// get the downloaded stories (in .htm format) and parse the text
const getFiles = () => {
  fs.readdir(filePath).then(files => {
    // loop through all folders in the directory
    for (let i = 0; i < files.length; i++) {
      if (files[i] !== '.DS_Store') {
        // file path to the htm file
        let bookPath = filePath + '/' + files[i] + '/' + files[i] + '-h/' + files[i] + '-h.htm';
        parseText(bookPath, files[i]);
      }
    }
  });
};

// pass in the bookpath and the story's unique id, parse the text
const parseText = (bookPath, fileName) => {
  fs.readFile(bookPath, 'utf8').then(content => {
    // we're stripping the html and necessary contents to obtain the public domain
    // version of the children's stories
    let text = content.replace(/\<pre\>([\s\S]*?)\<\/pre\>/g, '');
    text = text.replace(/\<title\>([\s\S]*?)\<\/title\>/, '');
    text = stripTags(text, ['img']).replace(/\/\*([\s\S]*?)\*\//g, '');
    text = text.replace(/\s*\<img ([\s\S]*?)\/\>\s*/g, '\n[IMAGE]\n');
    const trail = getTrail(bookPath)[0];

    // write a stripped down version of the .htm version
    fs.writeFile(trail + '/' + fileName + '.txt', text).then(() => {
      // parse image file names
      parseImage(bookPath, text, fileName);
    });
  });
}

// given the bookpath, the parsed text, and the story's unique id file name,
// get an array of all image files used
const parseImage = (bookPath, text, fileName) => {
  // read the contents of the .htm file
  fs.readFile(bookPath, 'utf8').then(content => {
    // split by image src files
    let images = content.split('src=').slice(1);
    let imageSources = images.map(image => image.replace(/\s+[^]*/, '').replace(/["]+/g, ''));

    const trail = getTrail(bookPath)[0];
    // take the image sources that we parsed and make them into paths where they're hosted
    imageSources = imageSources.map(imageSource => host + fileName + '/' + imageSource);
    // write the array of image sources into a json file
    fs.writeFile(trail + '/' + fileName + '.json', JSON.stringify(imageSources, null, ' '))
      .then(() => {
        // parse our data into a usable format
        getBookData(bookPath, imageSources, text, fileName);
      });
  });
};

// given a book path, array of image sources, stripped down text, and story id,
// transform the data to fit our book model found in bookModel.js
const getBookData = (bookPath, imageSources, text, fileName) => {
  let bookData = [];
  // split the text by lines
  let textSplit = text.split('\n');
  // text content accumulator
  let currStr = '';
  let currPage = 0;
  // keep track of which image in the imageSources array we are on
  let currImage = 0;
  // go through the text, line by line
  for (let i = 0; i < textSplit.length-1; i++) {
    // if the current line is an image
    if (textSplit[i] === '[IMAGE]') {
      // if the current string is not empty spaces
      if (!!(currStr.replace(/\s+/g, ''))) {
        currPage++;
        // we create a text page object
        bookData.push({
          name: currPage.toString(),
          content: currStr,
          image: false,
        });
        // and reset the accumulated text
        currStr = '';        
      }
      currPage++;
      // then we push that image object that we found on this line
      bookData.push({
        name: currPage.toString(),
        content: imageSources[currImage],
        image: true,
      });
      currImage++;
    } else {
      // if the current line is not an image, we add it the the text content accumulator
      currStr += textSplit[i] + '\n';
    }
  }
  // write the transformed data to the sample book data directory
  fs.writeFile(archiveHelper.paths.sampleData + '/' + fileName + '.json', JSON.stringify(bookData, null, ' '))
    .then(() => {
      console.log('write success');
      const trail = getTrail(bookPath)[0];
      // copy the images in our archived stories to our assets folder to access the images locally
      fs.copy(trail + '/images/', __dirname + '/../../client/assets/stories/' + fileName + '/images/');
    });
};

getFiles();
module.exports = getFiles;














