import request from 'supertest';
import app from '../src/app';

describe('Order API', () => {
  describe('GET /api/orders', () => {
    it('should return all orders', async () => {
      const response = await request(app)
        .get('/api/orders')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should return an order by ID', async () => {
      const response = await request(app)
        .get('/api/orders/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('customer');
      expect(response.body).toHaveProperty('items');
      expect(Array.isArray(response.body.items)).toBe(true);
      expect(response.body.items.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existent order', async () => {
      await request(app)
        .get('/api/orders/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .get('/api/orders/invalid')
        .expect(400);
    });
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const newOrder = {
        customerId: 1,
        items: [
          {
            shopItemId: 1,
            quantity: 2
          },
          {
            shopItemId: 2,
            quantity: 1
          }
        ]
      };

      const response = await request(app)
        .post('/api/orders')
        .send(newOrder)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.customer.id).toBe(newOrder.customerId);
      expect(response.body.items.length).toBe(2);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteOrder = {
        customerId: 1
      };

      await request(app)
        .post('/api/orders')
        .send(incompleteOrder)
        .expect(400);
    });

    it('should return 400 for non-existent customer', async () => {
      const invalidOrder = {
        customerId: 999,
        items: [
          {
            shopItemId: 1,
            quantity: 1
          }
        ]
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });

    it('should return 400 for non-existent shop item', async () => {
      const invalidOrder = {
        customerId: 1,
        items: [
          {
            shopItemId: 999,
            quantity: 1
          }
        ]
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });

    it('should return 400 for invalid quantity', async () => {
      const invalidOrder = {
        customerId: 1,
        items: [
          {
            shopItemId: 1,
            quantity: 0
          }
        ]
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });

    it('should return 400 for negative quantity', async () => {
      const invalidOrder = {
        customerId: 1,
        items: [
          {
            shopItemId: 1,
            quantity: -1
          }
        ]
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });

    it('should return 400 for empty items array', async () => {
      const invalidOrder = {
        customerId: 1,
        items: []
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });

    it('should return 400 for invalid items format', async () => {
      const invalidOrder = {
        customerId: 1,
        items: 'not-an-array'
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });

    it('should return 400 for incomplete item data', async () => {
      const invalidOrder = {
        customerId: 1,
        items: [
          {
            shopItemId: 1
            // missing quantity
          }
        ]
      };

      await request(app)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);
    });
  });

  describe('PUT /api/orders/:id', () => {
    it('should update an order', async () => {
      const updates = {
        customerId: 2,
        items: [
          {
            shopItemId: 3,
            quantity: 1
          }
        ]
      };

      const response = await request(app)
        .put('/api/orders/1')
        .send(updates)
        .expect(200);

      expect(response.body.customer.id).toBe(updates.customerId);
      expect(response.body.items.length).toBe(1);
    });

    it('should update only customer', async () => {
      const updates = {
        customerId: 2
      };

      const response = await request(app)
        .put('/api/orders/1')
        .send(updates)
        .expect(200);

      expect(response.body.customer.id).toBe(updates.customerId);
    });

    it('should update only items', async () => {
      const updates = {
        items: [
          {
            shopItemId: 2,
            quantity: 3
          }
        ]
      };

      const response = await request(app)
        .put('/api/orders/1')
        .send(updates)
        .expect(200);

      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0].quantity).toBe(3);
    });

    it('should return 404 for non-existent order', async () => {
      const updates = {
        customerId: 2
      };

      await request(app)
        .put('/api/orders/999')
        .send(updates)
        .expect(404);
    });

    it('should return 400 for no update fields', async () => {
      await request(app)
        .put('/api/orders/1')
        .send({})
        .expect(400);
    });

    it('should return 400 for non-existent customer in update', async () => {
      const updates = {
        customerId: 999
      };

      await request(app)
        .put('/api/orders/1')
        .send(updates)
        .expect(400);
    });

    it('should return 400 for empty items array in update', async () => {
      const updates = {
        items: []
      };

      await request(app)
        .put('/api/orders/1')
        .send(updates)
        .expect(400);
    });

    it('should return 400 for invalid quantity in update', async () => {
      const updates = {
        items: [
          {
            shopItemId: 1,
            quantity: 0
          }
        ]
      };

      await request(app)
        .put('/api/orders/1')
        .send(updates)
        .expect(400);
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('should delete an order', async () => {
      await request(app)
        .delete('/api/orders/1')
        .expect(204);

      await request(app)
        .get('/api/orders/1')
        .expect(404);
    });

    it('should return 404 for non-existent order', async () => {
      await request(app)
        .delete('/api/orders/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .delete('/api/orders/invalid')
        .expect(400);
    });
  });
});