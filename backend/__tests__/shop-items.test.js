const request = require('supertest');
const app = require('../server');
const { generateTestData } = require('./testUtils');

describe('Shop Item API Endpoints', () => {
  let testData;

  beforeAll(async () => {
    testData = generateTestData();

    // First create a category for the shop item
    const categoryRes = await request(app)
      .post('/api/categories')
      .send(testData.category);
    testData.category.id = categoryRes.body.id;
    testData.shopItem.categoryIds = [testData.category.id];
  });

  it('should create a new shop item', async () => {
    const res = await request(app)
      .post('/api/shop-items')
      .send(testData.shopItem);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.category.length).toBe(1);
    testData.shopItem.id = res.body.id;
  });

  // Add other CRUD tests
});
