require('shelljs/global');
var fs = require('fs');
var path = require('path');
var dirs = require('./dirs');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var addProgressPlugin = require('./addProgressPlugin');
var statsOptions = require('./statsOptions');

var serverConfig = require(path.join(dirs.webpack, 'webpack.config.server.dev'));
var clientConfig = require(path.join(dirs.webpack, 'webpack.config.client.dev'));

if (!clientConfig.devServer) clientConfig.devServer = {};
if (!clientConfig.devServer.stats) clientConfig.devServer.stats = statsOptions;

addProgressPlugin(serverConfig);
addProgressPlugin(clientConfig);

serverConfig.plugins.push(new webpack.BannerPlugin(
  'require("source-map-support/register");\n' +
  'var Npm = Meteor.__mwrContext__.Npm;\n' +
  'var Assets = Meteor.__mwrContext__.Assets;\n' +
  'delete Meteor.__mwrContext__;\n' +
  'var require = Npm.require;\n',
  {raw: true}
));

var serverBundlePath = path.join(dirs.assets, 'server.bundle.js');
var serverBundleLink = path.join(dirs.meteor, 'server/server.bundle.min.js');
var clientBundleLink = path.join(dirs.meteor, 'client/client.bundle.min.js');
var loadClientBundleHtml = path.join(dirs.webpack, 'loadClientBundle.html');
var loadClientBundleLink = path.join(dirs.meteor, 'client/loadClientBundle.html');

var requireServerBundleJs = path.join(dirs.meteor, 'server/require.server.bundle.js');

require('./core-js-custom-build');

if (fs.existsSync(clientBundleLink)) rm(clientBundleLink);
if (fs.existsSync(serverBundleLink)) rm(serverBundleLink);

var serverCompiler = webpack(serverConfig);
var serverBundleReady = false;

serverCompiler.watch({
  progress: true,
  colors: true,
}, function(err, stats) {
  console.log(stats.toString(statsOptions)) ;
  var jsonStats = stats.toJson({hash: true});
  ('//' + jsonStats.hash + '\n' + 
   'Meteor.__mwrContext__ = {Npm: Npm, Assets: Assets};\n' +
   'Npm.require("' + serverBundlePath + '");').to(requireServerBundleJs);

  if (!serverBundleReady) {
    serverBundleReady = true;
    compileClient();
    runMeteor();
  }  
});

function compileClient() {
  var clientCompiler = webpack(clientConfig);
  var clientDevServer = new WebpackDevServer(clientCompiler, clientConfig.devServer);

  clientDevServer.listen(clientConfig.devServer.port, clientConfig.devServer.host, function() {});

  ln('-sf', loadClientBundleHtml, loadClientBundleLink);
}

function runMeteor() {
  cd(dirs.meteor);
  exec('meteor --settings ../settings/devel.json', {async: true});
}
