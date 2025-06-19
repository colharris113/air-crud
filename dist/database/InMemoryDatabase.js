"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.InMemoryDatabase = void 0;
class InMemoryDatabase {
    constructor() {
        this.customers = [];
        this.shopItemCategories = [];
        this.shopItems = [];
        this.orderItems = [];
        this.orders = [];
        this.nextCustomerId = 1;
        this.nextShopItemCategoryId = 1;
        this.nextShopItemId = 1;
        this.nextOrderItemId = 1;
        this.nextOrderId = 1;
        this.initializeTestData();
    }
    getAllCustomers() {
        return this.customers;
    }
    getCustomerById(id) {
        return this.customers.find(customer => customer.id === id);
    }
    createCustomer(customerData) {
        const customer = {
            id: this.nextCustomerId++,
            ...customerData
        };
        this.customers.push(customer);
        return customer;
    }
    updateCustomer(id, updates) {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        if (customerIndex === -1)
            return null;
        this.customers[customerIndex] = { ...this.customers[customerIndex], ...updates };
        return this.customers[customerIndex];
    }
    deleteCustomer(id) {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        if (customerIndex === -1)
            return false;
        this.customers.splice(customerIndex, 1);
        return true;
    }
    getAllShopItemCategories() {
        return this.shopItemCategories;
    }
    getShopItemCategoryById(id) {
        return this.shopItemCategories.find(category => category.id === id);
    }
    createShopItemCategory(categoryData) {
        const category = {
            id: this.nextShopItemCategoryId++,
            ...categoryData
        };
        this.shopItemCategories.push(category);
        return category;
    }
    updateShopItemCategory(id, updates) {
        const categoryIndex = this.shopItemCategories.findIndex(category => category.id === id);
        if (categoryIndex === -1)
            return null;
        this.shopItemCategories[categoryIndex] = { ...this.shopItemCategories[categoryIndex], ...updates };
        return this.shopItemCategories[categoryIndex];
    }
    deleteShopItemCategory(id) {
        const categoryIndex = this.shopItemCategories.findIndex(category => category.id === id);
        if (categoryIndex === -1)
            return false;
        this.shopItemCategories.splice(categoryIndex, 1);
        return true;
    }
    getAllShopItems() {
        return this.shopItems;
    }
    getShopItemById(id) {
        return this.shopItems.find(item => item.id === id);
    }
    createShopItem(itemData) {
        const item = {
            id: this.nextShopItemId++,
            ...itemData
        };
        this.shopItems.push(item);
        return item;
    }
    updateShopItem(id, updates) {
        const itemIndex = this.shopItems.findIndex(item => item.id === id);
        if (itemIndex === -1)
            return null;
        this.shopItems[itemIndex] = { ...this.shopItems[itemIndex], ...updates };
        return this.shopItems[itemIndex];
    }
    deleteShopItem(id) {
        const itemIndex = this.shopItems.findIndex(item => item.id === id);
        if (itemIndex === -1)
            return false;
        this.shopItems.splice(itemIndex, 1);
        return true;
    }
    getAllOrders() {
        return this.orders;
    }
    getOrderById(id) {
        return this.orders.find(order => order.id === id);
    }
    createOrder(orderData) {
        const order = {
            id: this.nextOrderId++,
            ...orderData
        };
        this.orders.push(order);
        return order;
    }
    updateOrder(id, updates) {
        const orderIndex = this.orders.findIndex(order => order.id === id);
        if (orderIndex === -1)
            return null;
        this.orders[orderIndex] = { ...this.orders[orderIndex], ...updates };
        return this.orders[orderIndex];
    }
    deleteOrder(id) {
        const orderIndex = this.orders.findIndex(order => order.id === id);
        if (orderIndex === -1)
            return false;
        this.orders.splice(orderIndex, 1);
        return true;
    }
    initializeTestData() {
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
        const orderItem1 = {
            id: this.nextOrderItemId++,
            shopItem: laptop,
            quantity: 1
        };
        const orderItem2 = {
            id: this.nextOrderItemId++,
            shopItem: tshirt,
            quantity: 2
        };
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
exports.InMemoryDatabase = InMemoryDatabase;
exports.database = new InMemoryDatabase();
//# sourceMappingURL=InMemoryDatabase.js.map