import { Customer, ShopItemCategory, ShopItem, OrderItem, Order } from '../models';

export class InMemoryDatabase {
  private customers: Customer[] = [];
  private shopItemCategories: ShopItemCategory[] = [];
  private shopItems: ShopItem[] = [];
  private orderItems: OrderItem[] = [];
  private orders: Order[] = [];

  private nextCustomerId = 1;
  private nextShopItemCategoryId = 1;
  private nextShopItemId = 1;
  private nextOrderItemId = 1;
  private nextOrderId = 1;

  constructor() {
    this.initializeTestData();
  }

  // Customer methods
  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: number): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  createCustomer(customerData: Omit<Customer, 'id'>): Customer {
    const customer: Customer = {
      id: this.nextCustomerId++,
      ...customerData
    };
    this.customers.push(customer);
    return customer;
  }

  updateCustomer(id: number, updates: Partial<Omit<Customer, 'id'>>): Customer | null {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) return null;

    this.customers[customerIndex] = { ...this.customers[customerIndex], ...updates };
    return this.customers[customerIndex];
  }

  deleteCustomer(id: number): boolean {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) return false;

    this.customers.splice(customerIndex, 1);
    return true;
  }

  // ShopItemCategory methods
  getAllShopItemCategories(): ShopItemCategory[] {
    return this.shopItemCategories;
  }

  getShopItemCategoryById(id: number): ShopItemCategory | undefined {
    return this.shopItemCategories.find(category => category.id === id);
  }

  createShopItemCategory(categoryData: Omit<ShopItemCategory, 'id'>): ShopItemCategory {
    const category: ShopItemCategory = {
      id: this.nextShopItemCategoryId++,
      ...categoryData
    };
    this.shopItemCategories.push(category);
    return category;
  }

  updateShopItemCategory(id: number, updates: Partial<Omit<ShopItemCategory, 'id'>>): ShopItemCategory | null {
    const categoryIndex = this.shopItemCategories.findIndex(category => category.id === id);
    if (categoryIndex === -1) return null;

    this.shopItemCategories[categoryIndex] = { ...this.shopItemCategories[categoryIndex], ...updates };
    return this.shopItemCategories[categoryIndex];
  }

  deleteShopItemCategory(id: number): boolean {
    const categoryIndex = this.shopItemCategories.findIndex(category => category.id === id);
    if (categoryIndex === -1) return false;

    this.shopItemCategories.splice(categoryIndex, 1);
    return true;
  }

  // ShopItem methods
  getAllShopItems(): ShopItem[] {
    return this.shopItems;
  }

  getShopItemById(id: number): ShopItem | undefined {
    return this.shopItems.find(item => item.id === id);
  }

  createShopItem(itemData: Omit<ShopItem, 'id'>): ShopItem {
    const item: ShopItem = {
      id: this.nextShopItemId++,
      ...itemData
    };
    this.shopItems.push(item);
    return item;
  }

  updateShopItem(id: number, updates: Partial<Omit<ShopItem, 'id'>>): ShopItem | null {
    const itemIndex = this.shopItems.findIndex(item => item.id === id);
    if (itemIndex === -1) return null;

    this.shopItems[itemIndex] = { ...this.shopItems[itemIndex], ...updates };
    return this.shopItems[itemIndex];
  }

  deleteShopItem(id: number): boolean {
    const itemIndex = this.shopItems.findIndex(item => item.id === id);
    if (itemIndex === -1) return false;

    this.shopItems.splice(itemIndex, 1);
    return true;
  }

  // Order methods
  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  createOrder(orderData: Omit<Order, 'id'>): Order {
    const order: Order = {
      id: this.nextOrderId++,
      ...orderData
    };
    this.orders.push(order);
    return order;
  }

  updateOrder(id: number, updates: Partial<Omit<Order, 'id'>>): Order | null {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) return null;

    this.orders[orderIndex] = { ...this.orders[orderIndex], ...updates };
    return this.orders[orderIndex];
  }

  deleteOrder(id: number): boolean {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) return false;

    this.orders.splice(orderIndex, 1);
    return true;
  }

  private initializeTestData(): void {
    // Initialize categories
    const electronics = this.createShopItemCategory({
      title: 'Electronics',
      description: 'Electronic devices and gadgets'
    });

    const clothing = this.createShopItemCategory({
      title: 'Clothing',
      description: 'Fashion and apparel'
    });

    const books = this.createShopItemCategory({
      title: 'Books',
      description: 'Books and literature'
    });

    // Initialize shop items
    const laptop = this.createShopItem({
      title: 'Gaming Laptop',
      description: 'High-performance laptop for gaming',
      price: 1299.99,
      categories: [electronics]
    });

    const tshirt = this.createShopItem({
      title: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 29.99,
      categories: [clothing]
    });

    const novel = this.createShopItem({
      title: 'The Great Novel',
      description: 'An amazing work of fiction',
      price: 19.99,
      categories: [books]
    });

    // Initialize customers
    const customer1 = this.createCustomer({
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com'
    });

    const customer2 = this.createCustomer({
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com'
    });

    // Initialize order items
    const orderItem1: OrderItem = {
      id: this.nextOrderItemId++,
      shopItem: laptop,
      quantity: 1
    };

    const orderItem2: OrderItem = {
      id: this.nextOrderItemId++,
      shopItem: tshirt,
      quantity: 2
    };

    // Initialize orders
    this.createOrder({
      customer: customer1,
      items: [orderItem1, orderItem2]
    });

    this.createOrder({
      customer: customer2,
      items: [{
        id: this.nextOrderItemId++,
        shopItem: novel,
        quantity: 1
      }]
    });
  }
}

export const database = new InMemoryDatabase();