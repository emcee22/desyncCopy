import { Result } from '../src';

type UserData = {
  username: string;
};

const { payload } = Result.ok<UserData>({ username: 'John' });

if (payload.isError) {
  throw payload.error;
}

console.log(payload.value.username);
