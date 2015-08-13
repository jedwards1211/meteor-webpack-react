var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    client: [
      'babel/polyfill',
      '../app/main_client.js',
    ],
    react: [
      './react-runtime.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets/',
    pathinfo: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=0',
        exclude: /node_modules|react-runtime\.js/,
      }, 
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ],
  },
  plugins: [
    new webpack.PrefetchPlugin("react/addons"),
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    new webpack.optimize.CommonsChunkPlugin('react', 'react.bundle.js'),
  ]
};
