const request = require('supertest');
const app = require('../server');
const { generateTestData } = require('./testUtils');

describe('Order API Endpoints', () => {
  let testData;

  beforeAll(async () => {
    testData = generateTestData();

    // Create required dependencies
    const customerRes = await request(app)
      .post('/api/customers')
      .send(testData.customer);
    testData.customer.id = customerRes.body.id;
    testData.order.customerId = testData.customer.id;

    const categoryRes = await request(app)
      .post('/api/categories')
      .send(testData.category);
    testData.category.id = categoryRes.body.id;

    const shopItemRes = await request(app)
      .post('/api/shop-items')
      .send({
        ...testData.shopItem,
        categoryIds: [testData.category.id]
      });
    testData.shopItem.id = shopItemRes.body.id;

    testData.order.items = [{
      shopItemId: testData.shopItem.id,
      quantity: 2
    }];
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send(testData.order);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.items.length).toBe(1);
    testData.order.id = res.body.id;
  });

  // Add other CRUD tests
});
