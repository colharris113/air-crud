"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopItemService = void 0;
const InMemoryDatabase_1 = require("../database/InMemoryDatabase");
class ShopItemService {
    getAllItems() {
        return InMemoryDatabase_1.database.getAllShopItems();
    }
    getItemById(id) {
        const item = InMemoryDatabase_1.database.getShopItemById(id);
        return item || null;
    }
    createItem(itemData) {
        if (itemData.price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        const categories = [];
        for (const categoryId of itemData.categoryIds) {
            const category = InMemoryDatabase_1.database.getShopItemCategoryById(categoryId);
            if (!category) {
                throw new Error(`Category with id ${categoryId} not found`);
            }
            categories.push(category);
        }
        return InMemoryDatabase_1.database.createShopItem({
            title: itemData.title,
            description: itemData.description,
            price: itemData.price,
            categories
        });
    }
    updateItem(id, updates) {
        if (updates.price !== undefined && updates.price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        let categories;
        if (updates.categoryIds) {
            categories = [];
            for (const categoryId of updates.categoryIds) {
                const category = InMemoryDatabase_1.database.getShopItemCategoryById(categoryId);
                if (!category) {
                    throw new Error(`Category with id ${categoryId} not found`);
                }
                categories.push(category);
            }
        }
        const updateData = {
            ...updates,
            categories: categories || undefined
        };
        delete updateData.categoryIds;
        return InMemoryDatabase_1.database.updateShopItem(id, updateData);
    }
    deleteItem(id) {
        return InMemoryDatabase_1.database.deleteShopItem(id);
    }
}
exports.ShopItemService = ShopItemService;
//# sourceMappingURL=ShopItemService.js.map