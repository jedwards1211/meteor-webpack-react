var webpack = require('webpack');
var config = require('./webpack.config.client');
var _ = require('lodash');
var devProps = require('./devProps');

var config = module.exports = _.assign(_.cloneDeep(config), {
  // http://webpack.github.io/docs/build-performance.html#sourcemaps
  devtool: 'eval',             // fastest - readable source maps
  // devtool: 'source-map',       // slowest - best source maps
  // devtool: 'eval-source-map',    // best of both worlds
  entry: [
    'webpack-dev-server/client?' + devProps.baseUrl,
    'webpack/hot/only-dev-server',
  ].concat(config.entry),
  output: _.assign(_.cloneDeep(config.output), {
    publicPath: devProps.baseUrl + '/assets/',
    pathinfo: true,
  }),
  plugins: (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
