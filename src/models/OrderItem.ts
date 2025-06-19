import { ShopItem } from './ShopItem';

export interface OrderItem {
  id: number;
  shopItem: ShopItem;
  quantity: number;
}

export interface CreateOrderItemRequest {
  shopItemId: number;
  quantity: number;
}

export interface UpdateOrderItemRequest {
  shopItemId?: number;
  quantity?: number;
}