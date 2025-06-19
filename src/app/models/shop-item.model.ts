import { ShopItemCategory } from './category.model';

export interface ShopItem {
  id: number;
  title: string;
  description: string;
  price: number;
  category: ShopItemCategory[];
}
