var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel/polyfill',
    './app/main_server',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'server.bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=0',
        exclude: /node_modules/,
      }, 
    ],
  },
};
