"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
const shopItemService = new services_1.ShopItemService();
router.get('/', (req, res) => {
    try {
        const items = shopItemService.getAllItems();
        return res.json(items);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid shop item ID' });
        }
        const item = shopItemService.getItemById(id);
        if (!item) {
            return res.status(404).json({ error: 'Shop item not found' });
        }
        return res.json(item);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', (req, res) => {
    try {
        const { title, description, price, categoryIds } = req.body;
        if (!title || !description || price === undefined || !categoryIds) {
            return res.status(400).json({ error: 'Title, description, price, and categoryIds are required' });
        }
        if (!Array.isArray(categoryIds)) {
            return res.status(400).json({ error: 'categoryIds must be an array' });
        }
        const item = shopItemService.createItem({ title, description, price, categoryIds });
        return res.status(201).json(item);
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
            return res.status(400).json({ error: 'Invalid shop item ID' });
        }
        const { title, description, price, categoryIds } = req.body;
        const updates = {};
        if (title !== undefined)
            updates.title = title;
        if (description !== undefined)
            updates.description = description;
        if (price !== undefined)
            updates.price = price;
        if (categoryIds !== undefined) {
            if (!Array.isArray(categoryIds)) {
                return res.status(400).json({ error: 'categoryIds must be an array' });
            }
            updates.categoryIds = categoryIds;
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'At least one field must be provided for update' });
        }
        const item = shopItemService.updateItem(id, updates);
        if (!item) {
            return res.status(404).json({ error: 'Shop item not found' });
        }
        return res.json(item);
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
            return res.status(400).json({ error: 'Invalid shop item ID' });
        }
        const success = shopItemService.deleteItem(id);
        if (!success) {
            return res.status(404).json({ error: 'Shop item not found' });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=shopItemRoutes.js.map