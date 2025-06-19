"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
const categoryService = new services_1.ShopItemCategoryService();
router.get('/', (req, res) => {
    try {
        const categories = categoryService.getAllCategories();
        return res.json(categories);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }
        const category = categoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.json(category);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const category = categoryService.createCategory({ title, description });
        return res.status(201).json(category);
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
            return res.status(400).json({ error: 'Invalid category ID' });
        }
        const { title, description } = req.body;
        const updates = {};
        if (title !== undefined)
            updates.title = title;
        if (description !== undefined)
            updates.description = description;
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'At least one field must be provided for update' });
        }
        const category = categoryService.updateCategory(id, updates);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.json(category);
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
            return res.status(400).json({ error: 'Invalid category ID' });
        }
        const success = categoryService.deleteCategory(id);
        if (!success) {
            return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map