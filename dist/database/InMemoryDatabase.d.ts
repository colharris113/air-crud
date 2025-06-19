import { Customer, ShopItemCategory, ShopItem, Order } from '../models';
export declare class InMemoryDatabase {
    private customers;
    private shopItemCategories;
    private shopItems;
    private orderItems;
    private orders;
    private nextCustomerId;
    private nextShopItemCategoryId;
    private nextShopItemId;
    private nextOrderItemId;
    private nextOrderId;
    constructor();
    getAllCustomers(): Customer[];
    getCustomerById(id: number): Customer | undefined;
    createCustomer(customerData: Omit<Customer, 'id'>): Customer;
    updateCustomer(id: number, updates: Partial<Omit<Customer, 'id'>>): Customer | null;
    deleteCustomer(id: number): boolean;
    getAllShopItemCategories(): ShopItemCategory[];
    getShopItemCategoryById(id: number): ShopItemCategory | undefined;
    createShopItemCategory(categoryData: Omit<ShopItemCategory, 'id'>): ShopItemCategory;
    updateShopItemCategory(id: number, updates: Partial<Omit<ShopItemCategory, 'id'>>): ShopItemCategory | null;
    deleteShopItemCategory(id: number): boolean;
    getAllShopItems(): ShopItem[];
    getShopItemById(id: number): ShopItem | undefined;
    createShopItem(itemData: Omit<ShopItem, 'id'>): ShopItem;
    updateShopItem(id: number, updates: Partial<Omit<ShopItem, 'id'>>): ShopItem | null;
    deleteShopItem(id: number): boolean;
    getAllOrders(): Order[];
    getOrderById(id: number): Order | undefined;
    createOrder(orderData: Omit<Order, 'id'>): Order;
    updateOrder(id: number, updates: Partial<Omit<Order, 'id'>>): Order | null;
    deleteOrder(id: number): boolean;
    private initializeTestData;
}
export declare const database: InMemoryDatabase;
//# sourceMappingURL=InMemoryDatabase.d.ts.map