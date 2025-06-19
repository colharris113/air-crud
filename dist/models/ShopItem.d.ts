import { ShopItemCategory } from './ShopItemCategory';
export interface ShopItem {
    id: number;
    title: string;
    description: string;
    price: number;
    categories: ShopItemCategory[];
}
export interface CreateShopItemRequest {
    title: string;
    description: string;
    price: number;
    categoryIds: number[];
}
export interface UpdateShopItemRequest {
    title?: string;
    description?: string;
    price?: number;
    categoryIds?: number[];
}
//# sourceMappingURL=ShopItem.d.ts.map