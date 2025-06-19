import { ShopItemCategory, CreateShopItemCategoryRequest, UpdateShopItemCategoryRequest } from '../models';
import { database } from '../database/InMemoryDatabase';

export class ShopItemCategoryService {
  getAllCategories(): ShopItemCategory[] {
    return database.getAllShopItemCategories();
  }

  getCategoryById(id: number): ShopItemCategory | null {
    const category = database.getShopItemCategoryById(id);
    return category || null;
  }

  createCategory(categoryData: CreateShopItemCategoryRequest): ShopItemCategory {
    // Check if title already exists
    const existingCategories = database.getAllShopItemCategories();
    if (existingCategories.some(category => category.title.toLowerCase() === categoryData.title.toLowerCase())) {
      throw new Error('Category with this title already exists');
    }

    return database.createShopItemCategory(categoryData);
  }

  updateCategory(id: number, updates: UpdateShopItemCategoryRequest): ShopItemCategory | null {
    // Check if title already exists (excluding current category)
    if (updates.title) {
      const existingCategories = database.getAllShopItemCategories();
      if (existingCategories.some(category => 
        category.title.toLowerCase() === updates.title!.toLowerCase() && category.id !== id)) {
        throw new Error('Category with this title already exists');
      }
    }

    return database.updateShopItemCategory(id, updates);
  }

  deleteCategory(id: number): boolean {
    return database.deleteShopItemCategory(id);
  }
}