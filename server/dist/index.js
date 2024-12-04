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
    let prisma = null;
    let server = null;
    try {
        prisma = await (0, db_1.initializePrisma)();
        if (!prisma)
            throw new Error('Failed to initialize Prisma client');
        app.use(health_1.default);
        server = app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
        const shutdown = async (signal) => {
            console.log(`${signal} received. Shutting down gracefully...`);
            if (server) {
                server.close(async () => {
                    console.log('HTTP server closed');
                    if (prisma) {
                        await prisma.$disconnect();
                        console.log('Database connection closed');
                    }
                    process.exit(0);
                });
                setTimeout(() => {
                    console.error('Could not close connections in time, forcefully shutting down');
                    process.exit(1);
                }, 30000);
            }
        };
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
    catch (error) {
        console.error('Failed to start server:', error);
        if (prisma)
            await prisma.$disconnect();
        if (server)
            server.close();
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map