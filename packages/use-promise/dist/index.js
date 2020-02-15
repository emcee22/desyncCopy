'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./use-promise.cjs.production.min.js');
} else {
  module.exports = require('./use-promise.cjs.development.js');
}
