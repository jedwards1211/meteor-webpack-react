var shell = require('shelljs')
var dirs = require('./dirs')
var fs = require('fs')
var path = require('path')

dirs.lib = path.join(dirs.webpack, 'lib')
if (!fs.existsSync(dirs.lib)) shell.mkdir(dirs.lib)

var coreJsVersion = JSON.parse(fs.readFileSync('node_modules/core-js/package.json')).version
var targetFileName = 'core-js-no-number.js'
var currentFileExist = fs.existsSync(path.join(dirs.lib, targetFileName))
var currentFileFewLines = currentFileExist ?
  fs.readFileSync(path.join(dirs.lib, targetFileName)).toString().substr(0, 130) : ''
var currentFileVersionRegex = /core-js (\d.\d.\d+)/m
var currentFileVersion = currentFileVersionRegex.test(currentFileFewLines) ?
  currentFileVersionRegex.exec(currentFileFewLines)[1] : false

if (coreJsVersion !== currentFileVersion) {
  console.log('Building core-js@' + coreJsVersion + ' without ES6 number constructor...')
  require('core-js-builder')({
    modules: ['es5', 'es6', 'es7', 'core.dict', 'web'],
    blacklist: ['es6.number.constructor'],
  }).then(function(code) {
    fs.writeFileSync(path.join(dirs.lib, targetFileName), code)
  }).catch(function(error) {
    console.error('core-js build error', error.stack)
  })
}
else {
  console.log('core-js@' + coreJsVersion + ' without ES6 number constructor is up to date')
}
