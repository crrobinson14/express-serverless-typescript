import {supertest} from '../helpers/supertest';

// Integration tests that use Supertest to "run" the API and "call" it
// See https://github.com/visionmedia/supertest

describe('API: Health Check', () => {
  it('The health check endpoint should return 200 OK', async () => {
    const {body: result} = await supertest.get('/health').expect(200);
    expect(result.status).toEqual('OK');
  });
});
