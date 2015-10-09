var _ = require('lodash');

module.exports = _.assign(require('./webpack.config.client.deploy'), {
  watch: true,
});
