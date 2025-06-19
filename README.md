# Online Shop Backend API - README

## Project Overview
This is a Node.js/Express backend API for an online shop with CRUD operations for Customers, Categories, Shop Items, and Orders.

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd online-shop-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory with the following content:
```
PORT=3456
NODE_ENV=development
```

## Running the Application

### Start the development server
```bash
npm start
```
The server will start on http://localhost:3456

### Available API Endpoints
- Customers: `/api/customers`
- Categories: `/api/categories`
- Shop Items: `/api/shop-items`
- Orders: `/api/orders`

Each endpoint supports full CRUD operations (GET, POST, PUT, DELETE).

## Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Test Structure
Tests are located in the `__tests__` directory and cover:
- Customer API endpoints
- Category API endpoints
- Shop Item API endpoints
- Order API endpoints

## Development Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts the development server |
| `npm test` | Runs all tests |
| `npm run test:watch` | Runs tests in watch mode |
| `npm run test:coverage` | Generates test coverage report |
| `npm run lint` | Runs ESLint (if configured) |

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Solution: Change the PORT in your `.env` file or kill the existing process

2. **Tests not exiting**
   - Solution: Run with `--detectOpenHandles` flag:
     ```bash
     jest --detectOpenHandles
     ```

3. **Database connection issues**
   - Solution: Since this uses in-memory storage, just restart the server

## License
This project is licensed under the MIT License.
