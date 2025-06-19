export interface Customer {
    id: number;
    name: string;
    surname: string;
    email: string;
}
export interface CreateCustomerRequest {
    name: string;
    surname: string;
    email: string;
}
export interface UpdateCustomerRequest {
    name?: string;
    surname?: string;
    email?: string;
}
//# sourceMappingURL=Customer.d.ts.map