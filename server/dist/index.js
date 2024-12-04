"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./utils/db");
const health_1 = __importDefault(require("./routes/health"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        const prisma = await (0, db_1.initializePrisma)();
        if (!prisma)
            throw new Error('Failed to initialize Prisma client');
        app.use(health_1.default);
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
        process.on('SIGTERM', async () => {
            console.log('SIGTERM received. Closing database connection...');
            await prisma.$disconnect();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map