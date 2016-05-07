var runWebpackConfigs = require('./runWebpackConfigs')

require('./core-js-custom-build')

process.env.NODE_ENV = 'production'

module.exports = runWebpackConfigs.bind(undefined, {
  mode: 'deploy'
})
