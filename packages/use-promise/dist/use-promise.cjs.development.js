'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var useDeepCompareMemoize = require('@desync/use-deep-compare-memoize');

function usePromise(promise, params, options) {
  var _ref;

  var immediate = true;

  var _useState = react.useState(null),
    error = _useState[0],
    setError = _useState[1];

  var _useState2 = react.useState(true),
    loading = _useState2[0],
    setLoading = _useState2[1];

  var _useState3 = react.useState(
      (_ref = options === null || options === void 0 ? void 0 : options.initialData) !== null && _ref !== void 0
        ? _ref
        : null
    ),
    data = _useState3[0],
    setData = _useState3[1];

  var _useReducer = react.useReducer(function(x) {
      return x + 1;
    }, 0),
    force = _useReducer[0],
    forceUpdate = _useReducer[1];

  var mounted = react.useRef(true);
  var memoizedParams = useDeepCompareMemoize.useDeepCompareMemoize(params);
  var promiseFn = react.useCallback(
    function() {
      if (mounted.current) {
        setLoading(true);
        setData(null);
        setError(null);
      }

      return promise(params)
        .then(function(response) {
          if (mounted.current) {
            setData(response);
            setLoading(false);
          }
        })
        ['catch'](function(error) {
          if (mounted.current) {
            setError(error);
            setLoading(false);
          }
        }); // Caution: keep exhaustive deps off here
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [promise, memoizedParams]
  );
  react.useEffect(
    function() {
      mounted.current = true;

      {
        promiseFn();
      }

      return function() {
        // Loading cannot be safely determined here
        // abort should be a no-op anyway
        //abortController.abort();
        mounted.current = false;
      };
    },
    [force, promiseFn, immediate]
  );
  var reload = react.useCallback(
    function() {
      forceUpdate();
    },
    [force]
  );
  return {
    data: data,
    isLoading: loading,
    error: error,
    reload: reload,
  };
}

exports.usePromise = usePromise;
//# sourceMappingURL=use-promise.cjs.development.js.map
