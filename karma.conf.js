var path = require('path');
var webpackConfig = require('./webpack/webpack.config.client.js');

module.exports = function (config) {
  config.set({
    //singleRun: true,
    reporters: [ 'dots' ],
    browsers: [ 'Chrome' ],
    files: [ './test/karma.bundle.js' ],
    frameworks: [ 'jasmine' ],
    plugins: [
      'karma-chrome-launcher',
      //'karma-firefox-launcher',
      'karma-jasmine',
      //'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      './test/karma.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    // use our own webpack config to mirror test setup
    webpack: {
      entry: [
        './lib/core-js-no-number',
        'regenerator/runtime',
      ],
      devtool: 'eval-source-map',
      resolve: webpackConfig.resolve,
      module: { loaders: webpackConfig.module.loaders },
    },
    webpackMiddleware: {
      noInfo: true,
    }
  });
};
