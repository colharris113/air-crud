// Jest setup file
import { database } from '../src/database/InMemoryDatabase';

// Reset database before each test
beforeEach(() => {
  // Clear all data
  (database as any).customers = [];
  (database as any).shopItemCategories = [];
  (database as any).shopItems = [];
  (database as any).orderItems = [];
  (database as any).orders = [];
  
  // Reset ID counters
  (database as any).nextCustomerId = 1;
  (database as any).nextShopItemCategoryId = 1;
  (database as any).nextShopItemId = 1;
  (database as any).nextOrderItemId = 1;
  (database as any).nextOrderId = 1;
  
  // Reinitialize test data
  (database as any).initializeTestData();
});