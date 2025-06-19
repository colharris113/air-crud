# Online Shop Backend API

A minimalistic backend web application for an online shop built with Node.js, Express, and TypeScript. This application provides full CRUD (Create, Read, Update, Delete) operations for managing customers, shop item categories, shop items, and orders.

## Features

- **RESTful API** with full CRUD operations
- **TypeScript** for type safety and better development experience
- **In-memory database** for data persistence (with test data initialization)
- **Comprehensive test suite** with Jest and Supertest
- **Input validation** and error handling
- **API security** with Helmet and CORS
- **Request logging** with Morgan

## Data Entities

### Customer
- ID (integer)
- Name (string)
- Surname (string)
- Email (string)

### ShopItemCategory
- ID (integer)
- Title (string)
- Description (string)

### ShopItem
- ID (integer)
- Title (string)
- Description (string)
- Price (float)
- Categories (list of ShopItemCategory)

### OrderItem
- ID (integer)
- ShopItem (ShopItem)
- Quantity (integer)

### Order
- ID (integer)
- Customer (Customer)
- Items (list of OrderItem)

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Shop Items
- `GET /api/shop-items` - Get all shop items
- `GET /api/shop-items/:id` - Get shop item by ID
- `POST /api/shop-items` - Create new shop item
- `PUT /api/shop-items/:id` - Update shop item
- `DELETE /api/shop-items/:id` - Delete shop item

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Health Check
- `GET /health` - Health check endpoint

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Setup Instructions

1. **Clone or navigate to the project directory:**
   ```bash
   cd "/Users/colin/Documents/Air Training/Crud API/Air"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 3000 by default. You can access:
- API: http://localhost:3000/api/
- Health check: http://localhost:3000/health

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (for development)
```bash
npm run test:watch
```

## Test Data

The application comes with pre-initialized test data:

### Categories:
1. Electronics - Electronic devices and gadgets
2. Clothing - Fashion and apparel
3. Books - Books and literature

### Shop Items:
1. Gaming Laptop - High-performance laptop for gaming ($1299.99)
2. Cotton T-Shirt - Comfortable cotton t-shirt ($29.99)
3. The Great Novel - An amazing work of fiction ($19.99)

### Customers:
1. John Doe - john.doe@example.com
2. Jane Smith - jane.smith@example.com

### Orders:
1. John Doe's order with Gaming Laptop (qty: 1) and Cotton T-Shirt (qty: 2)
2. Jane Smith's order with The Great Novel (qty: 1)

## API Usage Examples

### Create a Customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "surname": "Johnson",
    "email": "alice.johnson@example.com"
  }'
```

### Create a Shop Item
```bash
curl -X POST http://localhost:3000/api/shop-items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wireless Headphones",
    "description": "High-quality wireless headphones",
    "price": 199.99,
    "categoryIds": [1]
  }'
```

### Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "items": [
      {
        "shopItemId": 1,
        "quantity": 1
      },
      {
        "shopItemId": 2,
        "quantity": 2
      }
    ]
  }'
```

## Project Structure

```
src/
├── models/           # TypeScript interfaces and types
├── services/         # Business logic layer
├── routes/           # Express route handlers
├── database/         # In-memory database implementation
└── index.ts          # Application entry point

tests/                # Test files
├── setup.ts          # Test setup and configuration
├── customers.test.ts # Customer endpoint tests
├── categories.test.ts# Category endpoint tests
├── shopItems.test.ts # Shop item endpoint tests
└── orders.test.ts    # Order endpoint tests
```

## Error Handling

The API includes comprehensive error handling:
- **400 Bad Request** - Invalid input data or validation errors
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

## Validation Rules

### Customer
- Name, surname, and email are required
- Email must be valid format
- Email must be unique

### Category
- Title and description are required
- Title must be unique (case-insensitive)

### Shop Item
- Title, description, price, and categoryIds are required
- Price must be greater than 0
- All referenced categories must exist

### Order
- CustomerId and items are required
- Customer must exist
- At least one item is required
- All referenced shop items must exist
- Item quantities must be greater than 0

## License

MIT