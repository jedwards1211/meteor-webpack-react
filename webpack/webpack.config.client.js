var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel/polyfill',
    '../app/main_client',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      app: path.join(__dirname, '../app')
    },
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
  plugins: [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ]
};
