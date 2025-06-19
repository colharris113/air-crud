"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const InMemoryDatabase_1 = require("../database/InMemoryDatabase");
class CustomerService {
    getAllCustomers() {
        return InMemoryDatabase_1.database.getAllCustomers();
    }
    getCustomerById(id) {
        const customer = InMemoryDatabase_1.database.getCustomerById(id);
        return customer || null;
    }
    createCustomer(customerData) {
        if (!this.isValidEmail(customerData.email)) {
            throw new Error('Invalid email format');
        }
        const existingCustomers = InMemoryDatabase_1.database.getAllCustomers();
        if (existingCustomers.some(customer => customer.email === customerData.email)) {
            throw new Error('Customer with this email already exists');
        }
        return InMemoryDatabase_1.database.createCustomer(customerData);
    }
    updateCustomer(id, updates) {
        if (updates.email && !this.isValidEmail(updates.email)) {
            throw new Error('Invalid email format');
        }
        if (updates.email) {
            const existingCustomers = InMemoryDatabase_1.database.getAllCustomers();
            if (existingCustomers.some(customer => customer.email === updates.email && customer.id !== id)) {
                throw new Error('Customer with this email already exists');
            }
        }
        return InMemoryDatabase_1.database.updateCustomer(id, updates);
    }
    deleteCustomer(id) {
        return InMemoryDatabase_1.database.deleteCustomer(id);
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map