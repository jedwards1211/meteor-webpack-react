require('shelljs/global');

var fs = require('fs');
var path = require('path');
var dirs = require('./dirs');
var webpack = require('webpack');
var addProgressPlugin = require('./addProgressPlugin');
var statsOptions = require('./statsOptions');

var serverConfig = require(path.join(dirs.webpack, 'webpack.config.server.prod'));
var clientConfig = require(path.join(dirs.webpack, 'webpack.config.client.prod'));

addProgressPlugin(serverConfig);
addProgressPlugin(clientConfig);

var serverBundlePath = path.join(dirs.assets, 'server.bundle.js');
var clientBundlePath = path.join(dirs.assets, 'client.bundle.js');
var serverBundleLink = path.join(dirs.meteor, 'server/server.bundle.min.js');
var clientBundleLink = path.join(dirs.meteor, 'client/client.bundle.min.js');
var loadClientBundleHtml = path.join(dirs.webpack, 'loadClientBundle.html');
var loadClientBundleLink = path.join(dirs.meteor, 'client/loadClientBundle.html');
var requireServerBundleJs = path.join(dirs.meteor, 'server/require.server.bundle.js');

module.exports = function(callback) {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = env.NODE_ENV = 'production';
  }

  require('./core-js-custom-build');

  if (fs.existsSync(loadClientBundleLink)) rm(loadClientBundleLink);
  if (fs.existsSync(requireServerBundleJs)) rm(requireServerBundleJs);

  var serverCompiler = webpack(serverConfig);

  serverCompiler.run(function(err, stats) {
    if (err) {
      return callback(err);
    }
    console.log(stats.toString(statsOptions));
    ln('-sf', serverBundlePath, serverBundleLink);
    compileClient();
  });

  function compileClient() {
    var clientCompiler = webpack(clientConfig);
    clientCompiler.run(function(err, stats) {
      if (err) {
        return callback(err);
      }
      console.log(stats.toString(statsOptions));
      ln('-sf', clientBundlePath, clientBundleLink);

      return callback();
    });
  }
};
