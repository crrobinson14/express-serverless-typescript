import {User} from '../../models';

describe('Models: User', () => {
  it('Password hashing should work', async () => {
    const hash = User.hashPassword('test');
    expect(hash.length).toBeGreaterThan(50);
    expect(hash.length).toBeLessThan(100);
  });
});
