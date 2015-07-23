var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base');
var _ = require('lodash');

var getWindowReact = path.resolve(__dirname, 'getWindowReact');

module.exports = _.assign({}, config, {
  resolve: _.assign({}, config.resolve, {
    alias: _.assign({}, config.resolve.alias, {
      'react$': getWindowReact,
      'react/addons$': getWindowReact,
    }),
  }),
});