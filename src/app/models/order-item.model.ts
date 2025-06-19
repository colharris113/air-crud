import { ShopItem } from './shop-item.model';

export interface OrderItem {
  id: number;
  shopItem: ShopItem;
  quantity: number;
}
