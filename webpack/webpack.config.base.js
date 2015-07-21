var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel/polyfill',
    './app',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
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
        exclude: /node_modules|vendor/,
      }, 
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, 
    ],
  },
};
