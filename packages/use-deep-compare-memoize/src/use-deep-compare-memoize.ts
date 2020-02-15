import deepEqual from 'dequal';
import { useRef } from 'react';

type AcceptedValue = string | boolean | object | null;

export function useDeepCompareMemoize(value: AcceptedValue): AcceptedValue {
  const ref = useRef<AcceptedValue>(null);
  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
