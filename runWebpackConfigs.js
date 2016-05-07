var _ = require('lodash')
var runWebpackConfigs = require('webpack-meteor-tools/lib/runWebpackConfigs')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')

var makeWebpackConfig = require('./webpack/make-webpack-config')

module.exports = function(options, callback) {
  return runWebpackConfigs([
    makeWebpackConfig(_.assign({}, options, {
      target: 'client'
    })),
    makeWebpackConfig(_.assign({}, options, {
      target: 'server'
    }))
  ], {
    webpack: webpack,
    webpackDevServer: webpackDevServer
  }, callback)
}
