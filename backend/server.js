const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3456;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// In-memory data stores
let customers = [];
let shopItemCategories = [];
let shopItems = [];
let orders = [];
let idCounter = 1;

// Helper function to generate IDs
const generateId = () => idCounter++;

// Customer CRUD
app.get('/api/customers', (req, res) => res.json(customers));
app.post('/api/customers', (req, res) => {
  const customer = { id: generateId(), ...req.body };
  customers.push(customer);
  res.status(201).json(customer);
});
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).send('Customer not found');
  res.json(customer);
});
app.put('/api/customers/:id', (req, res) => {
  const index = customers.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Customer not found');
  customers[index] = { ...customers[index], ...req.body };
  res.json(customers[index]);
});
app.delete('/api/customers/:id', (req, res) => {
  customers = customers.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

// ShopItemCategory CRUD
app.get('/api/categories', (req, res) => res.json(shopItemCategories));
app.post('/api/categories', (req, res) => {
  const category = { id: generateId(), ...req.body };
  shopItemCategories.push(category);
  res.status(201).json(category);
});
app.get('/api/categories/:id', (req, res) => {
  const category = shopItemCategories.find(c => c.id === parseInt(req.params.id));
  if (!category) return res.status(404).send('Category not found');
  res.json(category);
});
app.put('/api/categories/:id', (req, res) => {
  const index = shopItemCategories.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Category not found');
  shopItemCategories[index] = { ...shopItemCategories[index], ...req.body };
  res.json(shopItemCategories[index]);
});
app.delete('/api/categories/:id', (req, res) => {
  shopItemCategories = shopItemCategories.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

// ShopItem CRUD
app.get('/api/shop-items', (req, res) => res.json(shopItems));
app.post('/api/shop-items', (req, res) => {
  // Validate required fields
  if (!req.body.title || !req.body.price || !req.body.categoryIds) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate category IDs exist
  const invalidCategories = req.body.categoryIds.filter(id =>
    !shopItemCategories.some(c => c.id === id)
  );

  if (invalidCategories.length > 0) {
    return res.status(400).json({
      error: 'Invalid category IDs',
      invalidIds: invalidCategories
    });
  }

  const shopItem = {
    id: generateId(),
    title: req.body.title,
    description: req.body.description || '',
    price: req.body.price,
    category: req.body.categoryIds.map(id =>
      shopItemCategories.find(c => c.id === id)
    )
  };

  shopItems.push(shopItem);
  res.status(201).json(shopItem);
});
app.get('/api/shop-items/:id', (req, res) => {
  const shopItem = shopItems.find(i => i.id === parseInt(req.params.id));
  if (!shopItem) return res.status(404).send('Shop item not found');
  res.json(shopItem);
});
app.put('/api/shop-items/:id', (req, res) => {
  const index = shopItems.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Shop item not found');
  shopItems[index] = {
    ...shopItems[index],
    ...req.body,
    category: req.body.categoryIds.map(id =>
      shopItemCategories.find(c => c.id === id))
  };
  res.json(shopItems[index]);
});
app.delete('/api/shop-items/:id', (req, res) => {
  shopItems = shopItems.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Order CRUD
app.get('/api/orders', (req, res) => res.json(orders));
app.post('/api/orders', (req, res) => {
  const order = {
    id: generateId(),
    customer: customers.find(c => c.id === req.body.customerId),
    items: req.body.items.map(item => ({
      id: generateId(),
      shopItem: shopItems.find(i => i.id === item.shopItemId),
      quantity: item.quantity
    }))
  };
  orders.push(order);
  res.status(201).json(order);
});
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});
app.put('/api/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Order not found');

  orders[index] = {
    ...orders[index],
    customer: customers.find(c => c.id === req.body.customerId),
    items: req.body.items.map(item => ({
      id: item.id || generateId(),
      shopItem: shopItems.find(i => i.id === item.shopItemId),
      quantity: item.quantity
    }))
  };
  res.json(orders[index]);
});
app.delete('/api/orders/:id', (req, res) => {
  orders = orders.filter(o => o.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export the app for testing
module.exports = app;

// Only start the server if this file is run directly
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Handle server cleanup on SIGTERM
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed');
    });
  });
}
