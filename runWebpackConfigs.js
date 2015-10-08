var fs = require('fs');
var path = require('path');
var dirs = require('./dirs');
var runWebpackConfigs = require('webpack-meteor-tools/lib/runWebpackConfigs');

module.exports = function(mode, callback) {
  var rx = new RegExp(mode + '\.js$');
  var configs = fs.readdirSync(dirs.webpack).filter(function(file) {
    return rx.test(file);
  }).map(function(file) {
    return require(path.join(dirs.webpack, file));
  });
  return runWebpackConfigs(configs, callback);
};
