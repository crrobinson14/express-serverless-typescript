import {userIdIsCaller} from '../../lib/validators';

// Simple unit tests of support functions

describe('Validators', () => {
  it('userIdIsCaller should throw for unauthenticated users', async () => {
    expect(() => userIdIsCaller('test', {req: {}, location: 'params', path: '/'})).toThrowError('Unauthorized');
    expect(() => userIdIsCaller('test', {req: {user: {}}, location: 'params', path: '/'})).toThrowError('Unauthorized');
    expect(() => userIdIsCaller('test', {req: {user: {sub: 'other'}}, location: 'params', path: '/'})).toThrowError('Unauthorized');
  });

  it('userIdIsCaller should succeed for authenticated users', async () => {
    expect(userIdIsCaller('test', {req: {user: {sub: 'test'}}, location: 'params', path: '/'})).toEqual(true);
  });
});
