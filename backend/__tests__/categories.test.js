
const request = require('supertest');
const app = require('../server'); // This now imports just the Express app
const { generateTestData } = require('./testUtils');

describe('Category API Endpoints', () => {
  let testData;
  let server;

  beforeAll(() => {
    testData = generateTestData();
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it('should create a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .send(testData.category);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    testData.category.id = res.body.id;
  });
  // Add other CRUD tests similar to customer tests
  // GET all, GET by ID, PUT, DELETE
});
