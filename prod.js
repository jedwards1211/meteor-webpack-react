var shell = require('shelljs')
var dirs = require('./dirs')

require('./core-js-custom-build')

process.env.NODE_ENV = 'production'
require('./runWebpackConfigs')({
  mode: 'prod',
  watch: true
}, function(err) {
  if (err) throw err
  
  shell.cd(dirs.meteor)
  shell.exec('meteor run --production --settings ../settings/prod.json', {async: true})
})
