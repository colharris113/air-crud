import request from 'supertest';
import app from '../src/app';

describe('Shop Item API', () => {
  describe('GET /api/shop-items', () => {
    it('should return all shop items', async () => {
      const response = await request(app)
        .get('/api/shop-items')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/shop-items/:id', () => {
    it('should return a shop item by ID', async () => {
      const response = await request(app)
        .get('/api/shop-items/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('categories');
      expect(Array.isArray(response.body.categories)).toBe(true);
    });

    it('should return 404 for non-existent shop item', async () => {
      await request(app)
        .get('/api/shop-items/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .get('/api/shop-items/invalid')
        .expect(400);
    });
  });

  describe('POST /api/shop-items', () => {
    it('should create a new shop item', async () => {
      const newItem = {
        title: 'Test Item',
        description: 'A test item description',
        price: 99.99,
        categoryIds: [1]
      };

      const response = await request(app)
        .post('/api/shop-items')
        .send(newItem)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newItem.title);
      expect(response.body.description).toBe(newItem.description);
      expect(response.body.price).toBe(newItem.price);
      expect(Array.isArray(response.body.categories)).toBe(true);
      expect(response.body.categories.length).toBe(1);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteItem = {
        title: 'Test Item'
      };

      await request(app)
        .post('/api/shop-items')
        .send(incompleteItem)
        .expect(400);
    });

    it('should return 400 for invalid price', async () => {
      const invalidItem = {
        title: 'Test Item',
        description: 'A test item',
        price: -10,
        categoryIds: [1]
      };

      await request(app)
        .post('/api/shop-items')
        .send(invalidItem)
        .expect(400);
    });

    it('should return 400 for zero price', async () => {
      const invalidItem = {
        title: 'Test Item',
        description: 'A test item',
        price: 0,
        categoryIds: [1]
      };

      await request(app)
        .post('/api/shop-items')
        .send(invalidItem)
        .expect(400);
    });

    it('should return 400 for non-existent category', async () => {
      const invalidItem = {
        title: 'Test Item',
        description: 'A test item',
        price: 99.99,
        categoryIds: [999]
      };

      await request(app)
        .post('/api/shop-items')
        .send(invalidItem)
        .expect(400);
    });

    it('should return 400 for invalid categoryIds format', async () => {
      const invalidItem = {
        title: 'Test Item',
        description: 'A test item',
        price: 99.99,
        categoryIds: 'not-an-array'
      };

      await request(app)
        .post('/api/shop-items')
        .send(invalidItem)
        .expect(400);
    });

    it('should create item with multiple categories', async () => {
      const newItem = {
        title: 'Multi-Category Item',
        description: 'An item with multiple categories',
        price: 199.99,
        categoryIds: [1, 2]
      };

      const response = await request(app)
        .post('/api/shop-items')
        .send(newItem)
        .expect(201);

      expect(response.body.categories.length).toBe(2);
    });
  });

  describe('PUT /api/shop-items/:id', () => {
    it('should update a shop item', async () => {
      const updates = {
        title: 'Updated Item Title',
        price: 149.99
      };

      const response = await request(app)
        .put('/api/shop-items/1')
        .send(updates)
        .expect(200);

      expect(response.body.title).toBe(updates.title);
      expect(response.body.price).toBe(updates.price);
    });

    it('should return 404 for non-existent shop item', async () => {
      const updates = {
        title: 'Updated Title'
      };

      await request(app)
        .put('/api/shop-items/999')
        .send(updates)
        .expect(404);
    });

    it('should return 400 for no update fields', async () => {
      await request(app)
        .put('/api/shop-items/1')
        .send({})
        .expect(400);
    });

    it('should return 400 for invalid price update', async () => {
      const updates = {
        price: -50
      };

      await request(app)
        .put('/api/shop-items/1')
        .send(updates)
        .expect(400);
    });

    it('should return 400 for non-existent category in update', async () => {
      const updates = {
        categoryIds: [999]
      };

      await request(app)
        .put('/api/shop-items/1')
        .send(updates)
        .expect(400);
    });

    it('should update categories', async () => {
      const updates = {
        categoryIds: [2, 3]
      };

      const response = await request(app)
        .put('/api/shop-items/1')
        .send(updates)
        .expect(200);

      expect(response.body.categories.length).toBe(2);
      expect(response.body.categories.map((c: any) => c.id)).toEqual(expect.arrayContaining([2, 3]));
    });
  });

  describe('DELETE /api/shop-items/:id', () => {
    it('should delete a shop item', async () => {
      await request(app)
        .delete('/api/shop-items/1')
        .expect(204);

      await request(app)
        .get('/api/shop-items/1')
        .expect(404);
    });

    it('should return 404 for non-existent shop item', async () => {
      await request(app)
        .delete('/api/shop-items/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .delete('/api/shop-items/invalid')
        .expect(400);
    });
  });
});