"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services");
const router = (0, express_1.Router)();
const customerService = new services_1.CustomerService();
router.get('/', (req, res) => {
    try {
        const customers = customerService.getAllCustomers();
        return res.json(customers);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }
        const customer = customerService.getCustomerById(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.json(customer);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', (req, res) => {
    try {
        const { name, surname, email } = req.body;
        if (!name || !surname || !email) {
            return res.status(400).json({ error: 'Name, surname, and email are required' });
        }
        const customer = customerService.createCustomer({ name, surname, email });
        return res.status(201).json(customer);
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
            return res.status(400).json({ error: 'Invalid customer ID' });
        }
        const { name, surname, email } = req.body;
        const updates = {};
        if (name !== undefined)
            updates.name = name;
        if (surname !== undefined)
            updates.surname = surname;
        if (email !== undefined)
            updates.email = email;
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'At least one field must be provided for update' });
        }
        const customer = customerService.updateCustomer(id, updates);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.json(customer);
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
            return res.status(400).json({ error: 'Invalid customer ID' });
        }
        const success = customerService.deleteCustomer(id);
        if (!success) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=customerRoutes.js.map