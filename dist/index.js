"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API endpoints:`);
    console.log(`  - Customers: http://localhost:${PORT}/api/customers`);
    console.log(`  - Categories: http://localhost:${PORT}/api/categories`);
    console.log(`  - Shop Items: http://localhost:${PORT}/api/shop-items`);
    console.log(`  - Orders: http://localhost:${PORT}/api/orders`);
});
//# sourceMappingURL=index.js.map