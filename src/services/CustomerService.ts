import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models';
import { database } from '../database/InMemoryDatabase';

export class CustomerService {
  getAllCustomers(): Customer[] {
    return database.getAllCustomers();
  }

  getCustomerById(id: number): Customer | null {
    const customer = database.getCustomerById(id);
    return customer || null;
  }

  createCustomer(customerData: CreateCustomerRequest): Customer {
    // Basic email validation
    if (!this.isValidEmail(customerData.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingCustomers = database.getAllCustomers();
    if (existingCustomers.some(customer => customer.email === customerData.email)) {
      throw new Error('Customer with this email already exists');
    }

    return database.createCustomer(customerData);
  }

  updateCustomer(id: number, updates: UpdateCustomerRequest): Customer | null {
    // Basic email validation if email is being updated
    if (updates.email && !this.isValidEmail(updates.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists (excluding current customer)
    if (updates.email) {
      const existingCustomers = database.getAllCustomers();
      if (existingCustomers.some(customer => customer.email === updates.email && customer.id !== id)) {
        throw new Error('Customer with this email already exists');
      }
    }

    return database.updateCustomer(id, updates);
  }

  deleteCustomer(id: number): boolean {
    return database.deleteCustomer(id);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}