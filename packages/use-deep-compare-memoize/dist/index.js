'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./use-deep-compare-memoize.cjs.production.min.js');
} else {
  module.exports = require('./use-deep-compare-memoize.cjs.development.js');
}
