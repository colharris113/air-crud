import { Customer } from './Customer';
import { OrderItem } from './OrderItem';

export interface Order {
  id: number;
  customer: Customer;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  customerId: number;
  items: {
    shopItemId: number;
    quantity: number;
  }[];
}

export interface UpdateOrderRequest {
  customerId?: number;
  items?: {
    shopItemId: number;
    quantity: number;
  }[];
}