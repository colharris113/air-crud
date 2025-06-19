import { ShopItem, CreateShopItemRequest, UpdateShopItemRequest } from '../models';
import { database } from '../database/InMemoryDatabase';

export class ShopItemService {
  getAllItems(): ShopItem[] {
    return database.getAllShopItems();
  }

  getItemById(id: number): ShopItem | null {
    const item = database.getShopItemById(id);
    return item || null;
  }

  createItem(itemData: CreateShopItemRequest): ShopItem {
    // Validate price
    if (itemData.price <= 0) {
      throw new Error('Price must be greater than 0');
    }

    // Validate categories exist
    const categories = [];
    for (const categoryId of itemData.categoryIds) {
      const category = database.getShopItemCategoryById(categoryId);
      if (!category) {
        throw new Error(`Category with id ${categoryId} not found`);
      }
      categories.push(category);
    }

    return database.createShopItem({
      title: itemData.title,
      description: itemData.description,
      price: itemData.price,
      categories
    });
  }

  updateItem(id: number, updates: UpdateShopItemRequest): ShopItem | null {
    // Validate price if provided
    if (updates.price !== undefined && updates.price <= 0) {
      throw new Error('Price must be greater than 0');
    }

    // Validate categories if provided
    let categories;
    if (updates.categoryIds) {
      categories = [];
      for (const categoryId of updates.categoryIds) {
        const category = database.getShopItemCategoryById(categoryId);
        if (!category) {
          throw new Error(`Category with id ${categoryId} not found`);
        }
        categories.push(category);
      }
    }

    const updateData: Partial<Omit<ShopItem, 'id'>> = {
      ...updates,
      categories: categories || undefined
    };

    // Remove categoryIds from update data as it's not part of ShopItem
    delete (updateData as any).categoryIds;

    return database.updateShopItem(id, updateData);
  }

  deleteItem(id: number): boolean {
    return database.deleteShopItem(id);
  }
}