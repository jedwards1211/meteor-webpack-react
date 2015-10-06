require('shelljs/global');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = env.NODE_ENV = 'production';
}

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

serverConfig.plugins.push(new webpack.BannerPlugin('var require = Npm.require;\n', {raw: true}));

var serverBundlePath = path.join(dirs.assets, 'server.bundle.js');
var clientBundlePath = path.join(dirs.assets, 'client.bundle.js');
var serverBundleLink = path.join(dirs.meteor, 'server/server.bundle.min.js');
var clientBundleLink = path.join(dirs.meteor, 'client/client.bundle.min.js');
var loadClientBundleHtml = path.join(dirs.webpack, 'loadClientBundle.html');
var loadClientBundleLink = path.join(dirs.meteor, 'client/loadClientBundle.html');
var requireServerBundleJs = path.join(dirs.meteor, 'server/require.server.bundle.js');

require('./core-js-custom-build');

if (fs.existsSync(loadClientBundleLink)) rm(loadClientBundleLink);
if (fs.existsSync(requireServerBundleJs)) rm(requireServerBundleJs);

var serverCompiler = webpack(serverConfig);
var serverBundleReady = false;
var clientBundleReady = false;

serverCompiler.watch(serverConfig.watchOptions || {}, function(err, stats) {
  console.log(stats.toString(statsOptions));
  if (!serverBundleReady) {
    serverBundleReady = true;
    ln('-sf', serverBundlePath, serverBundleLink);
    compileClient();
  }  
});

function compileClient() {
  var clientCompiler = webpack(clientConfig);
  clientCompiler.watch(clientConfig.watchOptions || {}, function(err, stats) {
    console.log(stats.toString(statsOptions));
    if (!clientBundleReady) {
      clientBundleReady = true;
      ln('-sf', clientBundlePath, clientBundleLink);
      runMeteor();
    }  
  });
}

function runMeteor() {
  cd(dirs.meteor);
  exec('meteor run --production --settings ../settings/prod.json', {async: true});
}
