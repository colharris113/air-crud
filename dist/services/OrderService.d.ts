import { Order, CreateOrderRequest, UpdateOrderRequest } from '../models';
export declare class OrderService {
    getAllOrders(): Order[];
    getOrderById(id: number): Order | null;
    createOrder(orderData: CreateOrderRequest): Order;
    updateOrder(id: number, updates: UpdateOrderRequest): Order | null;
    deleteOrder(id: number): boolean;
}
//# sourceMappingURL=OrderService.d.ts.map