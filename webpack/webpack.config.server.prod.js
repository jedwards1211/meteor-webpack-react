var _ = require('lodash');

module.exports = _.assign(require('./webpack.config.server.deploy'), {
  watch: true,
});
