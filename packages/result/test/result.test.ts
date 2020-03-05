import { Result } from '../src';

describe('Result tests', () => {
  type User = {
    username: string;
  };

  class ExampleError extends Error {
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ExampleError.prototype);
      this.name = this.constructor.name;
    }
  }

  it('should set payload.isError === true with a failed result.', () => {
    expect(Result.fail(new Error('Error')).isError()).toBeTruthy();
  });

  it('should set payload.isError === false with a successful result.', () => {
    expect(
      Result.ok<User>({ username: 'Jest' }).isError()
    ).toBeFalsy();
  });

  it('should always have an Error object on failure', () => {
    const failFromError = Result.fail(new Error('from error')).payload;
    const failFromString = Result.fail('from string').payload;

    expect((failFromError as any).error).toBeInstanceOf(Error);
    expect((failFromString as any).error).toBeInstanceOf(Error);
  });

  it('Should allow to map over a successful result', () => {
    // Arrange
    const success = Result.ok<User>({ username: 'Jest' });
    // Act
    const result = success
      .map<string>(r => {
        return `Username is ${r.username}`;
      })
      .map<string[]>(r => {
        return r.toLowerCase().split(' ');
      })
      .mapErr(e => {
        throw new Error(`This cannot happen: ${e.message}`);
      })
      .unwrap();
    // Assert
    expect(result).toEqual(['username', 'is', 'jest']);
  });

  it('Should allow to mapErr over a failed result', () => {
    // Arrange
    const fail = Result.fail(new ExampleError(`I'm a failure :)`));
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const mockCallback = jest.fn(() => {});

    // Act
    const result = fail
      .map<string>(r => {
        throw new Error(`This cannot happen: ${r}`);
      })
      .mapErr(e => {
        if (e instanceof ExampleError) {
          mockCallback();
          return new Error('cool');
        }
        return e;
      })
      .map<string>(r => {
        throw new Error(`This cannot happen too:  ${r}`);
      })
      .unwrap();

    // Assert
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(result).toBeInstanceOf(Error);
    expect((result as any).message).toEqual('cool');
    expect((result as any).name).toEqual('Error');
  });
});
