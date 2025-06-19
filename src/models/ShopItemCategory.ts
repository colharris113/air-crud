export interface ShopItemCategory {
  id: number;
  title: string;
  description: string;
}

export interface CreateShopItemCategoryRequest {
  title: string;
  description: string;
}

export interface UpdateShopItemCategoryRequest {
  title?: string;
  description?: string;
}