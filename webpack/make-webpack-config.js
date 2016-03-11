var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var _ = require('lodash');
var babelMerge = require('./babel-merge');

module.exports = function(options) {
  var argv = require('minimist')(process.argv.slice(2));
  options = _.assign({}, options, argv);

  var target = options.target;
  var mode = options.mode || process.env.NODE_ENV || 'dev';
  if (mode === 'development') mode = 'dev';
  if (mode === 'production') mode = 'prod';

  ////////////////////////////////////////////////////////////////////////////////
  // BASE
  ////////////////////////////////////////////////////////////////////////////////

  var babelQueryBase = {
    presets: ["es2015", "stage-1", "react"],
    plugins: ["transform-decorators-legacy"],
    cacheDirectory: true
  };

  var config = {
    context: __dirname,
    entry: [
      './lib/core-js-no-number',
      'regenerator/runtime'
    ],
    output: {
      path: path.join(__dirname, 'assets'),
      publicPath: '/',
      pathinfo: true
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: path.join(__dirname, '../app')
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules|lib/,
          query: babelQueryBase
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin()
    ]
  };

  ////////////////////////////////////////////////////////////////////////////////
  // CLIENT
  ////////////////////////////////////////////////////////////////////////////////

  if (target === 'client') {
    config = merge(config, {
      entry: [ '../app/main_client' ],
      output: {
        filename: 'client.bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'Meteor.isClient': true,
          'Meteor.isServer': false
        }),
        new webpack.PrefetchPlugin("react"),
        new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
      ]
    });

    ////////////////////////////////////////////////////////////////////////////////
    // CLIENT DEVELOPMENT
    ////////////////////////////////////////////////////////////////////////////////

    if (mode === 'dev') {
      var devProps = require('./devProps');
      var baseUrl = 'http://' + devProps.host + ':' + devProps.webpackPort;
      var contentBase = 'http://' + devProps.host + ':' + devProps.meteorPort;

      config = merge.smart({
        entry: [
          'webpack-dev-server/client?' + baseUrl,
          'webpack/hot/only-dev-server'
        ],
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        ]
      }, config);

      config = merge.smart(config, {
        devtool: 'eval',
        output: {
          publicPath: baseUrl + '/'
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel',
              exclude: /node_modules|lib/,
              query: babelMerge(babelQueryBase, {
                "plugins": [
                  ["react-transform", {
                    "transforms": [
                      {
                        "transform": "react-transform-hmr",
                        "imports": ["react"],
                        "locals": ["module"]
                      },
                      {
                        "transform": "react-transform-catch-errors",
                        "imports": ["react", "redbox-react"]
                      }
                    ]
                  }]
                ]
              })
            }
          ]
        },
        devServer: {
          publicPath: baseUrl + '/',
          host: devProps.host,
          hot: true,
          historyApiFallback: true,
          contentBase: contentBase,
          port: devProps.webpackPort,
          stats: require('../statsOptions'),
          proxy: {
            '*': contentBase,
            '/sockjs/*': {
              target: contentBase,
              ws: true
            }
          }
        }
      });
    }

    ////////////////////////////////////////////////////////////////////////////////
    // CLIENT PRODUCTION
    ////////////////////////////////////////////////////////////////////////////////

    if (mode === 'prod') {
      config = merge.smart(config, {
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel',
              exclude: /node_modules|lib/,
              query: babelMerge(babelQueryBase, {
                "plugins": [
                  "transform-react-constant-elements",
                ],
              })
            }
          ]
        }
      });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  // SERVER
  ////////////////////////////////////////////////////////////////////////////////

  if (target === 'server') {
    config = merge(config, {
      entry: [ '../app/main_server' ],
      output: {
        filename: 'server.bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'null-loader'
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'Meteor.isClient': false,
          'Meteor.isServer': true
        })
      ]
    });

    ////////////////////////////////////////////////////////////////////////////////
    // SERVER DEVELOPMENT
    ////////////////////////////////////////////////////////////////////////////////

    if (mode === 'dev') {
      config = merge(config, {
        devtool: 'source-map'
      });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  // PRODUCTION
  ////////////////////////////////////////////////////////////////////////////////

  if (mode === 'prod') {
    config = merge(config, {
      output: {
        pathinfo: false
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {warnings: false}
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true)
      ]
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  // KARMA
  ////////////////////////////////////////////////////////////////////////////////

  if (options.karma) {
   config = merge(config, {
      devtool: 'eval-source-map'
    });
  }

  if (argv['print-webpack-config']) {
    console.log('================================================================');
    console.log('Webpack config for: ' + JSON.stringify(options, null, 2));
    console.log('================================================================\n');
    console.log(JSON.stringify(config, null, 2));
  }

  return config;
};

if (!module.parent) {
  console.log(JSON.stringify(module.exports(), null, 2));
}
