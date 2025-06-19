import request from 'supertest';
import app from '../src/app';

describe('Category API', () => {
  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      const response = await request(app)
        .get('/api/categories')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/categories/:id', () => {
    it('should return a category by ID', async () => {
      const response = await request(app)
        .get('/api/categories/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
    });

    it('should return 404 for non-existent category', async () => {
      await request(app)
        .get('/api/categories/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .get('/api/categories/invalid')
        .expect(400);
    });
  });

  describe('POST /api/categories', () => {
    it('should create a new category', async () => {
      const newCategory = {
        title: 'Test Category',
        description: 'A test category description'
      };

      const response = await request(app)
        .post('/api/categories')
        .send(newCategory)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newCategory.title);
      expect(response.body.description).toBe(newCategory.description);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteCategory = {
        title: 'Test Category'
      };

      await request(app)
        .post('/api/categories')
        .send(incompleteCategory)
        .expect(400);
    });

    it('should return 400 for duplicate title', async () => {
      const category1 = {
        title: 'Duplicate Category',
        description: 'First description'
      };

      const category2 = {
        title: 'Duplicate Category',
        description: 'Second description'
      };

      await request(app)
        .post('/api/categories')
        .send(category1)
        .expect(201);

      await request(app)
        .post('/api/categories')
        .send(category2)
        .expect(400);
    });

    it('should return 400 for duplicate title with different case', async () => {
      const category1 = {
        title: 'Case Test',
        description: 'First description'
      };

      const category2 = {
        title: 'case test',
        description: 'Second description'
      };

      await request(app)
        .post('/api/categories')
        .send(category1)
        .expect(201);

      await request(app)
        .post('/api/categories')
        .send(category2)
        .expect(400);
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('should update a category', async () => {
      const updates = {
        title: 'Updated Category Title'
      };

      const response = await request(app)
        .put('/api/categories/1')
        .send(updates)
        .expect(200);

      expect(response.body.title).toBe(updates.title);
    });

    it('should return 404 for non-existent category', async () => {
      const updates = {
        title: 'Updated Title'
      };

      await request(app)
        .put('/api/categories/999')
        .send(updates)
        .expect(404);
    });

    it('should return 400 for no update fields', async () => {
      await request(app)
        .put('/api/categories/1')
        .send({})
        .expect(400);
    });

    it('should return 400 for duplicate title update', async () => {
      // First, create another category
      const newCategory = {
        title: 'Another Category',
        description: 'Another description'
      };

      await request(app)
        .post('/api/categories')
        .send(newCategory)
        .expect(201);

      // Try to update existing category with the title of another category
      const updates = {
        title: 'Another Category'
      };

      await request(app)
        .put('/api/categories/1')
        .send(updates)
        .expect(400);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category', async () => {
      await request(app)
        .delete('/api/categories/1')
        .expect(204);

      await request(app)
        .get('/api/categories/1')
        .expect(404);
    });

    it('should return 404 for non-existent category', async () => {
      await request(app)
        .delete('/api/categories/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .delete('/api/categories/invalid')
        .expect(400);
    });
  });
});