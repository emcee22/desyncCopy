import deepEqual from 'dequal';
import { useRef } from 'react';

function useDeepCompareMemoize(value) {
  var ref = useRef(null);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export { useDeepCompareMemoize };
//# sourceMappingURL=use-deep-compare-memoize.esm.js.map
