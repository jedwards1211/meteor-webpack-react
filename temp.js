require('shelljs/global');
var dirs = require('./dirs');
var runWebpackConfigs = require('./runWebpackConfigs');

require('./core-js-custom-build');

runWebpackConfigs('prod', runMeteor);

function runMeteor(err) {
  if (err) throw err;
  cd(dirs.meteor);
  exec('meteor --settings ../settings/devel.json', {async: true});
}
