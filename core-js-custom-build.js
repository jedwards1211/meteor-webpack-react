require('shelljs/global');
var dirs = require('./dirs');
var fs = require('fs');
var path = require('path');

dirs.lib = path.join(dirs.webpack, 'lib');
if (!fs.existsSync(dirs.lib)) mkdir(dirs.lib);


var coreJsVersion = JSON.parse(fs.readFileSync('node_modules/core-js/package.json')).version;
var targetFile = 'core-js-no-number-' + coreJsVersion + '.js';

if (!fs.existsSync(path.join(dirs.lib, targetFile))) {
  echo('Building core-js@' + coreJsVersion + ' without ES6 number constructor...');
  cd('node_modules/core-js');
  exec('npm install');
  cd(__dirname);  
  exec('npm run build-core-js');
  cd('node_modules/core-js');
  mv('core-js-no-number.js', path.join(dirs.lib, targetFile));
  rm('-rf', 'node_modules');
  cd(dirs.lib);
  ln('-sf', targetFile, 'core-js-no-number.js');
}
else {
  echo('core-js@' + coreJsVersion + ' without ES6 number constructor is up to date');
}
