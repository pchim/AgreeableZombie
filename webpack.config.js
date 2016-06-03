var path = require('path');
var webpack = require('webpack');

module.exports = {
  externals: {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
},
  entry: './client/index.js',
  output: { path: __dirname, filename: '/client/bundle.js' },
  devtool: 'source-map',
  module: {
    // preLoaders: [
        // { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
    // ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
    ],
  },
};
