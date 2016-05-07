process.env.NODE_ENV = 'production'

var webpackConfig = require('./webpack/make-webpack-config')({
  karma: true,
  target: 'client',
  mode: 'production',
  useDevServer: true,
  webpackPort: 8080,
  entry: []
})

module.exports = function (config) {
  config.set({
    //singleRun: true,
    reporters: [ 'dots' ],
    browsers: [ 'Chrome' ],
    files: [
      'test/clientUnitTests.js'
    ],
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
      './test/clientUnitTests.js': [ 'webpack', 'sourcemap' ]
    },
    // use our own webpack config to mirror test setup
    webpack: webpackConfig,
    webpackMiddleware: webpackConfig.devServer || {},
  })
}
