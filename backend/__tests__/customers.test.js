const request = require('supertest');
const app = require('../server');
const { generateTestData } = require('./testUtils');

describe('Customer API Endpoints', () => {
  let testData;

  beforeAll(() => {
    testData = generateTestData();
  });

  it('should create a new customer', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send(testData.customer);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(testData.customer.name);
    testData.customer.id = res.body.id; // Store for later tests
  });

  it('should get all customers', async () => {
    const res = await request(app)
      .get('/api/customers');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a specific customer', async () => {
    const res = await request(app)
      .get(`/api/customers/${testData.customer.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(testData.customer.id);
  });

  it('should update a customer', async () => {
    const updatedData = { name: 'UpdatedName' };
    const res = await request(app)
      .put(`/api/customers/${testData.customer.id}`)
      .send(updatedData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(updatedData.name);
  });

  it('should delete a customer', async () => {
    const res = await request(app)
      .delete(`/api/customers/${testData.customer.id}`);

    expect(res.statusCode).toEqual(204);

    // Verify deletion
    const getRes = await request(app)
      .get(`/api/customers/${testData.customer.id}`);
    expect(getRes.statusCode).toEqual(404);
  });
});
