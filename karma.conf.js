// var webpack = require('webpack');
//
// module.exports = function (config) {
//   config.set({
//     browsers: [ 'Chrome' ], //run in Chrome
//     singleRun: false, //just run once by default
//     frameworks: [ 'mocha' ], //use the mocha test framework
//     files: [
//       'tests.webpack.js' //just load this file
//     ],
//     preprocessors: {
//       'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
//     },
//     reporters: [ 'dots' ], //report results in this format
//     webpack: { //kind of a copy of your webpack config
//       devtool: 'inline-source-map', //just do inline source maps instead of the default
//       module: {
//         loaders: [
//           { test: /\.js$/, loader: 'babel-loader' }
//         ]
//       }
//     },
//     webpackServer: {
//       noInfo: true //please don't spam the console when running in karma!
//     }
//   });
// };

var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ], // use Firefox for Travis CI
    singleRun: false,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'spec' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
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
      }
    },
    webpackServer: {
      stats: 'errors-only',
    },
    externals: {
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true,
    },
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ],
  });
};
