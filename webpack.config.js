module.exports = {
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  entry: './client/index.js',
  output: {
    path: './client',
    filename: 'bundle.js'
  },
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
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=assets/images/[name].[ext]?[hash]&context=./client',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=client/assets/fonts/[name].[ext]'
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
};
