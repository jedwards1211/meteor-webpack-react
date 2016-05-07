var _ = require('lodash');

module.exports = function(configs) {
  var result = {};
  for (var i = 0; i < arguments.length; i++) {
    _.assign(result, arguments[i], {
      presets: _.union(result.presets || [], arguments[i].presets || []),
      plugins: _.union(result.plugins || [], arguments[i].plugins || [])
    });
  }
  return result;
};
