var shell = require('shelljs')
shell.exec('node-inspector', {async: true})
process.env.NODE_OPTIONS = '--debug=5858'
require('./dev')
