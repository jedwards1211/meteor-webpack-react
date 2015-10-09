var webpack = require('webpack');
var config = require('./webpack.config.server');
var _ = require('lodash');
var dirs = require('../dirs');
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin');

var config = module.exports = _.assign(_.clone(config), {
  devtool: 'source-map',
  output: _.assign(_.clone(config.output), {
    pathinfo: true,
  }),
  watch: true,
  plugins: (config.plugins || []).concat([
    new RunInMeteorPlugin({
      meteor: dirs.meteor,
      key: 'server',
      target: 'server',
      mode: 'development',
    }),
  ]),
});
