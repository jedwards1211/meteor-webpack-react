var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var devProps = require('./devProps');
var config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: devProps.contentBase,
}).listen(devProps.webpackPort, devProps.host, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + devProps.baseUrl);
});
