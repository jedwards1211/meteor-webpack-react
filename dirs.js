var path = require('path')

module.exports = {
  webpack: path.join(__dirname, 'webpack'),
  meteor:  path.join(__dirname, 'meteor'),
}

module.exports.assets= path.join(module.exports.webpack, 'assets')
