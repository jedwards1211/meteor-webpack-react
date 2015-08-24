var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    '../lib/core-js-no-number',
    'regenerator/runtime',
    '../app/main_server',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'server.bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      app: path.join(__dirname, '../app'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=0',
        exclude: /node_modules|lib/,
      },
    ],
  },
};
