var shell = require('shelljs')
var dirs = require('./dirs')

require('./core-js-custom-build')

require('./runWebpackConfigs')({
  mode: 'dev',
  watch: true
}, function(err) {
  if (err) throw err
  shell.cd(dirs.meteor)
  shell.exec('meteor --settings ../settings/devel.json', {async: true})
})
