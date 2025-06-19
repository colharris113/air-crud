import request from 'supertest';
import app from '../src/app';

describe('Customer API', () => {
  describe('GET /api/customers', () => {
    it('should return all customers', async () => {
      const response = await request(app)
        .get('/api/customers')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/customers/:id', () => {
    it('should return a customer by ID', async () => {
      const response = await request(app)
        .get('/api/customers/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('surname');
      expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for non-existent customer', async () => {
      await request(app)
        .get('/api/customers/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .get('/api/customers/invalid')
        .expect(400);
    });
  });

  describe('POST /api/customers', () => {
    it('should create a new customer', async () => {
      const newCustomer = {
        name: 'Test',
        surname: 'User',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/customers')
        .send(newCustomer)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newCustomer.name);
      expect(response.body.surname).toBe(newCustomer.surname);
      expect(response.body.email).toBe(newCustomer.email);
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteCustomer = {
        name: 'Test'
      };

      await request(app)
        .post('/api/customers')
        .send(incompleteCustomer)
        .expect(400);
    });

    it('should return 400 for invalid email', async () => {
      const invalidCustomer = {
        name: 'Test',
        surname: 'User',
        email: 'invalid-email'
      };

      await request(app)
        .post('/api/customers')
        .send(invalidCustomer)
        .expect(400);
    });

    it('should return 400 for duplicate email', async () => {
      const customer1 = {
        name: 'Test1',
        surname: 'User1',
        email: 'duplicate@example.com'
      };

      const customer2 = {
        name: 'Test2',
        surname: 'User2',
        email: 'duplicate@example.com'
      };

      await request(app)
        .post('/api/customers')
        .send(customer1)
        .expect(201);

      await request(app)
        .post('/api/customers')
        .send(customer2)
        .expect(400);
    });
  });

  describe('PUT /api/customers/:id', () => {
    it('should update a customer', async () => {
      const updates = {
        name: 'Updated Name'
      };

      const response = await request(app)
        .put('/api/customers/1')
        .send(updates)
        .expect(200);

      expect(response.body.name).toBe(updates.name);
    });

    it('should return 404 for non-existent customer', async () => {
      const updates = {
        name: 'Updated Name'
      };

      await request(app)
        .put('/api/customers/999')
        .send(updates)
        .expect(404);
    });

    it('should return 400 for no update fields', async () => {
      await request(app)
        .put('/api/customers/1')
        .send({})
        .expect(400);
    });

    it('should return 400 for invalid email update', async () => {
      const updates = {
        email: 'invalid-email'
      };

      await request(app)
        .put('/api/customers/1')
        .send(updates)
        .expect(400);
    });
  });

  describe('DELETE /api/customers/:id', () => {
    it('should delete a customer', async () => {
      await request(app)
        .delete('/api/customers/1')
        .expect(204);

      await request(app)
        .get('/api/customers/1')
        .expect(404);
    });

    it('should return 404 for non-existent customer', async () => {
      await request(app)
        .delete('/api/customers/999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .delete('/api/customers/invalid')
        .expect(400);
    });
  });
});