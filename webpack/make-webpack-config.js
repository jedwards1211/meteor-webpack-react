var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var _ = require('lodash')
var babelMerge = require('./babel-merge')
var RunInMeteorPlugin = require('webpack-meteor-tools/lib/RunInMeteorPlugin')
var dirs = require('../dirs')

module.exports = function(options) {
  var argv        = require('yargs').argv

  options         = options || {}
  // override anything in options with argv
  for (var key in argv) {
    if (argv[key] === 'false') argv[key] = false
    options[_.camelCase(key)] = argv[key]
  }

  if (argv['print-options']) {
    console.log(JSON.stringify(options, null, 2))
  }

  var karma       = options.karma
  var watch       = options.watch        || false
  var target      = options.target
  var mode        = options.mode         || process.env.NODE_ENV || 'development'
  
  if      (mode === 'dev')  mode = 'development'
  else if (mode === 'prod') mode = 'production'
  
  var useDevServer = options.useDevServer || false

  var uglify      = options.uglify != null ? options.uglify : mode === 'production' && target === 'client'
  var host        = options.host         || '0.0.0.0'
  var entry       = options.entry        || [path.join(__dirname, '../app/main_' + target)]
  var meteorPort  = options.meteorPort   || 3000
  var webpackPort = options.webpackPort  || 9000
  var meteorDir   = karma ? undefined : dirs.meteor

  if (!target) {
    throw new Error('you must specify a target with --target or options.target')
  }

  var baseUrl     = 'http://' + host + ':' + webpackPort
  var contentBase = 'http://' + host + ':' + meteorPort

  // prevent Meteor from minifying thanks to why-reminify package
  var bundleExt   = mode === 'production' ? '.min.es5.js' : '.es5.js';

  var publicPath
  var meteorPath
  if (target === 'client') {
    publicPath = '/'
    meteorPath = meteorDir && path.join(meteorDir, mode === 'development' ? 'client' : 'public', publicPath)
  }
  else if (target === 'server') {
    publicPath = '/server/'
    meteorPath = meteorDir && path.join(meteorDir, publicPath)
  }
  
  var statsOptions = {
    colors: true,
    chunkModules: false,
    modules: false
  }

  ////////////////////////////////////////////////////////////////////////////////
  // BASE
  ////////////////////////////////////////////////////////////////////////////////

  var babelQueryBase = {
    presets: ["es2015", "stage-1", "react"],
    plugins: ["transform-decorators-legacy"],
    cacheDirectory: true
  }

  var config = {
    context: __dirname,
    entry: [
      './lib/core-js-no-number',
      'regenerator-runtime/runtime'
    ],
    watch: watch,
    output: {
      path: path.join(__dirname, 'assets'),
      publicPath: '/',
      pathinfo: true
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
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
  }

  ////////////////////////////////////////////////////////////////////////////////
  // CLIENT
  ////////////////////////////////////////////////////////////////////////////////

  if (target === 'client') {
    config = merge(config, {
      output: {
        filename: (mode === 'production' ? '[hash]' : 'client.bundle') + bundleExt,
        chunkFilename: (mode === 'production' ? '[name].[chunkhash]' : '[name].client.bundle') + bundleExt
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          { test: /\.json$/, loader: 'json-loader' }
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
    })

    ////////////////////////////////////////////////////////////////////////////////
    // CLIENT DEVELOPMENT
    ////////////////////////////////////////////////////////////////////////////////

    if (mode === 'development' || useDevServer) {
      config = merge.smart({
        entry: [
          'webpack-dev-server/client?' + baseUrl,
          'webpack/hot/only-dev-server'
        ],
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        ]
      }, config)

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
          host: host,
          hot: true,
          historyApiFallback: true,
          contentBase: contentBase,
          port: webpackPort,
          stats: statsOptions,
          proxy: {
            '*': contentBase,
            '/sockjs/*': {
              target: contentBase,
              ws: true
            }
          }
        }
      })
    }

    ////////////////////////////////////////////////////////////////////////////////
    // CLIENT PRODUCTION
    ////////////////////////////////////////////////////////////////////////////////

    if (mode === 'production') {
      config = merge.smart(config, {
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel',
              exclude: /node_modules|lib/,
              query: babelMerge(babelQueryBase, {
                "plugins": [
                  "transform-react-constant-elements"
                ]
              })
            }
          ]
        }
      })
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  // SERVER
  ////////////////////////////////////////////////////////////////////////////////

  if (target === 'server') {
    config = merge(config, {
      target: 'node',
      output: {
        filename: 'server.bundle' + bundleExt
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
    })

    ////////////////////////////////////////////////////////////////////////////////
    // SERVER DEVELOPMENT
    ////////////////////////////////////////////////////////////////////////////////

    if (mode === 'development') {
      config = merge(config, {
        devtool: 'source-map'
      })
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  // PRODUCTION
  ////////////////////////////////////////////////////////////////////////////////

  if (mode === 'production') {
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
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true)
      ]
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  // UGLIFY
  ////////////////////////////////////////////////////////////////////////////////

  if (uglify) {
    config = merge(config, {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
      ] 
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  // METEOR
  ////////////////////////////////////////////////////////////////////////////////

  if (meteorPath) {
    config = merge(config, {
      plugins: [
        new RunInMeteorPlugin({
          mode: mode,
          target: target,
          path: meteorPath,
          key: target
        })
      ]
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  // ENTRY
  ////////////////////////////////////////////////////////////////////////////////

  if (entry) {
    config = merge(config, {
      entry: entry 
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  // KARMA
  ////////////////////////////////////////////////////////////////////////////////

  if (karma) {
    config = merge(config, {
      devtool: 'eval-source-map',
      externals: {
        jsdom: 'window'
      },
      plugins: [
        new webpack.IgnorePlugin(/react\/lib\/(ReactContext|ExecutionEnvironment)/)
      ],
      devServer: {
        port: webpackPort,
        stats: statsOptions,
      }
    })
  }

  if (argv['print-webpack-config']) {
    console.log('================================================================')
    console.log('Webpack config for: ' + JSON.stringify(options, null, 2))
    console.log('================================================================\n')
    console.log(JSON.stringify(config, null, 2))
  }

  return config
}

if (!module.parent) {
  console.log(JSON.stringify(module.exports(), null, 2))
}
