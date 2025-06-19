import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models';
export declare class CustomerService {
    getAllCustomers(): Customer[];
    getCustomerById(id: number): Customer | null;
    createCustomer(customerData: CreateCustomerRequest): Customer;
    updateCustomer(id: number, updates: UpdateCustomerRequest): Customer | null;
    deleteCustomer(id: number): boolean;
    private isValidEmail;
}
//# sourceMappingURL=CustomerService.d.ts.map