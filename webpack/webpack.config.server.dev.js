var webpack = require('webpack');
var config = require('./webpack.config.server');
var _ = require('lodash');

var config = module.exports = _.assign(_.clone(config), {
  devtool: 'source-map',
  output: _.assign(_.clone(config.output), {
    pathinfo: true,
  }),
});
