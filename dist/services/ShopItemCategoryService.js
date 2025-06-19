"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopItemCategoryService = void 0;
const InMemoryDatabase_1 = require("../database/InMemoryDatabase");
class ShopItemCategoryService {
    getAllCategories() {
        return InMemoryDatabase_1.database.getAllShopItemCategories();
    }
    getCategoryById(id) {
        const category = InMemoryDatabase_1.database.getShopItemCategoryById(id);
        return category || null;
    }
    createCategory(categoryData) {
        const existingCategories = InMemoryDatabase_1.database.getAllShopItemCategories();
        if (existingCategories.some(category => category.title.toLowerCase() === categoryData.title.toLowerCase())) {
            throw new Error('Category with this title already exists');
        }
        return InMemoryDatabase_1.database.createShopItemCategory(categoryData);
    }
    updateCategory(id, updates) {
        if (updates.title) {
            const existingCategories = InMemoryDatabase_1.database.getAllShopItemCategories();
            if (existingCategories.some(category => category.title.toLowerCase() === updates.title.toLowerCase() && category.id !== id)) {
                throw new Error('Category with this title already exists');
            }
        }
        return InMemoryDatabase_1.database.updateShopItemCategory(id, updates);
    }
    deleteCategory(id) {
        return InMemoryDatabase_1.database.deleteShopItemCategory(id);
    }
}
exports.ShopItemCategoryService = ShopItemCategoryService;
//# sourceMappingURL=ShopItemCategoryService.js.map