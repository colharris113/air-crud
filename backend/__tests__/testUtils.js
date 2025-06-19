const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateTestData: () => {
    const customer = {
      name: `Test-${uuidv4()}`,
      surname: `User-${uuidv4()}`,
      email: `test-${uuidv4()}@example.com`
    };

    const category = {
      title: `Category-${uuidv4()}`,
      description: `Test category ${uuidv4()}`
    };

    const shopItem = {
      title: `Product-${uuidv4()}`,
      description: `Test product ${uuidv4()}`,
      price: Math.random() * 100,
      categoryIds: [] // Will be populated during tests
    };

    const order = {
      customerId: null, // Will be set during tests
      items: [] // Will be populated during tests
    };

    return { customer, category, shopItem, order };
  }
};
