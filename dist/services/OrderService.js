"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const InMemoryDatabase_1 = require("../database/InMemoryDatabase");
class OrderService {
    getAllOrders() {
        return InMemoryDatabase_1.database.getAllOrders();
    }
    getOrderById(id) {
        const order = InMemoryDatabase_1.database.getOrderById(id);
        return order || null;
    }
    createOrder(orderData) {
        const customer = InMemoryDatabase_1.database.getCustomerById(orderData.customerId);
        if (!customer) {
            throw new Error(`Customer with id ${orderData.customerId} not found`);
        }
        if (!orderData.items || orderData.items.length === 0) {
            throw new Error('Order must contain at least one item');
        }
        const orderItems = [];
        let nextOrderItemId = InMemoryDatabase_1.database.getAllOrders()
            .reduce((maxId, order) => Math.max(maxId, ...order.items.map(item => item.id)), 0) + 1;
        for (const item of orderData.items) {
            const shopItem = InMemoryDatabase_1.database.getShopItemById(item.shopItemId);
            if (!shopItem) {
                throw new Error(`Shop item with id ${item.shopItemId} not found`);
            }
            if (item.quantity <= 0) {
                throw new Error('Item quantity must be greater than 0');
            }
            orderItems.push({
                id: nextOrderItemId++,
                shopItem,
                quantity: item.quantity
            });
        }
        return InMemoryDatabase_1.database.createOrder({
            customer,
            items: orderItems
        });
    }
    updateOrder(id, updates) {
        let customer;
        if (updates.customerId) {
            customer = InMemoryDatabase_1.database.getCustomerById(updates.customerId);
            if (!customer) {
                throw new Error(`Customer with id ${updates.customerId} not found`);
            }
        }
        let orderItems;
        if (updates.items) {
            if (updates.items.length === 0) {
                throw new Error('Order must contain at least one item');
            }
            orderItems = [];
            let nextOrderItemId = InMemoryDatabase_1.database.getAllOrders()
                .reduce((maxId, order) => Math.max(maxId, ...order.items.map(item => item.id)), 0) + 1;
            for (const item of updates.items) {
                const shopItem = InMemoryDatabase_1.database.getShopItemById(item.shopItemId);
                if (!shopItem) {
                    throw new Error(`Shop item with id ${item.shopItemId} not found`);
                }
                if (item.quantity <= 0) {
                    throw new Error('Item quantity must be greater than 0');
                }
                orderItems.push({
                    id: nextOrderItemId++,
                    shopItem,
                    quantity: item.quantity
                });
            }
        }
        const updateData = {};
        if (customer)
            updateData.customer = customer;
        if (orderItems)
            updateData.items = orderItems;
        return InMemoryDatabase_1.database.updateOrder(id, updateData);
    }
    deleteOrder(id) {
        return InMemoryDatabase_1.database.deleteOrder(id);
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map