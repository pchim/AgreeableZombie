// /**
//  * https://webpack.github.io/docs/context.html
//  * load each test file into the webpack context
//  *
//  * @param  {filepath} './test'
//  * @param  {boolean}  useSubdirectories
//  * @param  {regexp}   which files to match
//  */
// const context = require.context('./test/components', true, /\.test\.js$/);
// context.keys().forEach(context);
var context = require.context('./test/components', true, /-test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
