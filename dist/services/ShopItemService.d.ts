import { ShopItem, CreateShopItemRequest, UpdateShopItemRequest } from '../models';
export declare class ShopItemService {
    getAllItems(): ShopItem[];
    getItemById(id: number): ShopItem | null;
    createItem(itemData: CreateShopItemRequest): ShopItem;
    updateItem(id: number, updates: UpdateShopItemRequest): ShopItem | null;
    deleteItem(id: number): boolean;
}
//# sourceMappingURL=ShopItemService.d.ts.map