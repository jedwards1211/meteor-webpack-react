var webpack = require('webpack');
var config = require('./webpack.config.base');
var _ = require('lodash');

module.exports = _.assign(_.cloneDeep(config), {
  entry: ['./vendor/react-with-addons-0.13.3.min.js'].concat(config.entry),
});