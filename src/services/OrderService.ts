import { Order, CreateOrderRequest, UpdateOrderRequest, OrderItem } from '../models';
import { database } from '../database/InMemoryDatabase';

export class OrderService {
  getAllOrders(): Order[] {
    return database.getAllOrders();
  }

  getOrderById(id: number): Order | null {
    const order = database.getOrderById(id);
    return order || null;
  }

  createOrder(orderData: CreateOrderRequest): Order {
    // Validate customer exists
    const customer = database.getCustomerById(orderData.customerId);
    if (!customer) {
      throw new Error(`Customer with id ${orderData.customerId} not found`);
    }

    // Validate order items
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    const orderItems: OrderItem[] = [];
    let nextOrderItemId = database.getAllOrders()
      .reduce((maxId, order) => Math.max(maxId, ...order.items.map(item => item.id)), 0) + 1;

    for (const item of orderData.items) {
      // Validate shop item exists
      const shopItem = database.getShopItemById(item.shopItemId);
      if (!shopItem) {
        throw new Error(`Shop item with id ${item.shopItemId} not found`);
      }

      // Validate quantity
      if (item.quantity <= 0) {
        throw new Error('Item quantity must be greater than 0');
      }

      orderItems.push({
        id: nextOrderItemId++,
        shopItem,
        quantity: item.quantity
      });
    }

    return database.createOrder({
      customer,
      items: orderItems
    });
  }

  updateOrder(id: number, updates: UpdateOrderRequest): Order | null {
    // Validate customer if provided
    let customer;
    if (updates.customerId) {
      customer = database.getCustomerById(updates.customerId);
      if (!customer) {
        throw new Error(`Customer with id ${updates.customerId} not found`);
      }
    }

    // Validate order items if provided
    let orderItems;
    if (updates.items) {
      if (updates.items.length === 0) {
        throw new Error('Order must contain at least one item');
      }

      orderItems = [];
      let nextOrderItemId = database.getAllOrders()
        .reduce((maxId, order) => Math.max(maxId, ...order.items.map(item => item.id)), 0) + 1;

      for (const item of updates.items) {
        // Validate shop item exists
        const shopItem = database.getShopItemById(item.shopItemId);
        if (!shopItem) {
          throw new Error(`Shop item with id ${item.shopItemId} not found`);
        }

        // Validate quantity
        if (item.quantity <= 0) {
          throw new Error('Item quantity must be greater than 0');
        }

        orderItems.push({
          id: nextOrderItemId++,
          shopItem,
          quantity: item.quantity
        });
      }
    }

    const updateData: Partial<Omit<Order, 'id'>> = {};
    if (customer) updateData.customer = customer;
    if (orderItems) updateData.items = orderItems;

    return database.updateOrder(id, updateData);
  }

  deleteOrder(id: number): boolean {
    return database.deleteOrder(id);
  }
}