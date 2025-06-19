"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
const orderService = new services_1.OrderService();
router.get('/', (req, res) => {
    try {
        const orders = orderService.getAllOrders();
        return res.json(orders);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        const order = orderService.getOrderById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        return res.json(order);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', (req, res) => {
    try {
        const { customerId, items } = req.body;
        if (!customerId || !items) {
            return res.status(400).json({ error: 'CustomerId and items are required' });
        }
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Items must be an array' });
        }
        for (const item of items) {
            if (!item.shopItemId || !item.quantity) {
                return res.status(400).json({ error: 'Each item must have shopItemId and quantity' });
            }
        }
        const order = orderService.createOrder({ customerId, items });
        return res.status(201).json(order);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
});
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        const { customerId, items } = req.body;
        const updates = {};
        if (customerId !== undefined)
            updates.customerId = customerId;
        if (items !== undefined) {
            if (!Array.isArray(items)) {
                return res.status(400).json({ error: 'Items must be an array' });
            }
            for (const item of items) {
                if (!item.shopItemId || !item.quantity) {
                    return res.status(400).json({ error: 'Each item must have shopItemId and quantity' });
                }
            }
            updates.items = items;
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'At least one field must be provided for update' });
        }
        const order = orderService.updateOrder(id, updates);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        return res.json(order);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
});
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        const success = orderService.deleteOrder(id);
        if (!success) {
            return res.status(404).json({ error: 'Order not found' });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map