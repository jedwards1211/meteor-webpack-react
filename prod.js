require('shelljs/global');

require('./core-js-custom-build');

process.env.NODE_ENV = env.NODE_ENV = 'production';
require('./runWebpackConfigs')('prod', function(err) {
  if (err) throw err;
  cd(dirs.meteor);
  exec('meteor run --production --settings ../settings/prod.json', {async: true});
});
