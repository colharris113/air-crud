import { ShopItemCategory, CreateShopItemCategoryRequest, UpdateShopItemCategoryRequest } from '../models';
export declare class ShopItemCategoryService {
    getAllCategories(): ShopItemCategory[];
    getCategoryById(id: number): ShopItemCategory | null;
    createCategory(categoryData: CreateShopItemCategoryRequest): ShopItemCategory;
    updateCategory(id: number, updates: UpdateShopItemCategoryRequest): ShopItemCategory | null;
    deleteCategory(id: number): boolean;
}
//# sourceMappingURL=ShopItemCategoryService.d.ts.map