'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var deepEqual = _interopDefault(require('dequal'));
var react = require('react');

function useDeepCompareMemoize(value) {
  var ref = react.useRef(null);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

exports.useDeepCompareMemoize = useDeepCompareMemoize;
//# sourceMappingURL=use-deep-compare-memoize.cjs.development.js.map
