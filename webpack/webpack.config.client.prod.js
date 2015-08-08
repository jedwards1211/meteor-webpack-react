var webpack = require('webpack');
var config = require('./webpack.config.client');
var _ = require('lodash');

var config = module.exports = _.assign(_.cloneDeep(config), {
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': process.env.NODE_ENV}),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});