var webpack = require('webpack');
var config = require('./webpack.config.client');
var _ = require('lodash');
var devProps = require('./devProps');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');
var dirs = require('../dirs');

var config = module.exports = _.assign(_.clone(config), {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?' + devProps.baseUrl,
    'webpack/hot/only-dev-server',
  ].concat(config.entry),
  output: _.assign(_.clone(config.output), {
    publicPath: devProps.baseUrl + '/assets/',
    pathinfo: true,
    // crossOriginLoading is important since we are running 
    // webpack-dev-server from a different port than Meteor
    crossOriginLoading: 'anonymous',
  }),
  plugins: (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new RunInMeteorPlugin({
      mode: 'development', 
      target: 'client', 
      meteor: dirs.meteor,
      key: 'client',
    }),
  ]),
  devServer: {
    publicPath: devProps.baseUrl + '/assets/',
    host: devProps.host,
    hot: true,
    historyApiFallback: true,
    contentBase: devProps.contentBase,
    port: devProps.webpackPort,
  }
});
