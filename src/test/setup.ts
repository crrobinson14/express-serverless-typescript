// import {closeDb, connectDb} from '../lib/orm';

// You will have to decide which testing strategy you want to use. Some test approaches mock everything DB-related, while others make
// actual connections to databases to ensure called functions are writing/reading the right data. If you do decide you want database
// access, these functions will connect to it before the test suite starts, and disconnect when the tests are completed.

beforeAll(async () => {
  // await connectDb();
});

afterAll(async () => {
  // await closeDb();
});
