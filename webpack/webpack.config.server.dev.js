var webpack = require('webpack');
var config = require('./webpack.config.server');
var _ = require('lodash');

var config = module.exports = _.assign(_.cloneDeep(config), {
  devtool: 'source-map',
  output: _.assign(_.cloneDeep(config.output), {
    pathinfo: true,
  }),
  plugins: (config.plugins || []).concat([
    new webpack.BannerPlugin('require("source-map-support/register");\n', {raw: true}),
  ]),
});
