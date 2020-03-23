import { usePromise, useDeepCompareMemoize, Result } from '../src';

describe('@desync/core', () => {
  it('should correctly import the Result package', async () => {
    expect(
      Result.ok<unknown>({ username: 'Name' }).isError()
    ).toBeFalsy();
  });
});
