"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000'];
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const getDatabaseUrl = () => {
    if (process.env.RAILWAY_ENVIRONMENT === 'production') {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            throw new Error('DATABASE_URL is not configured');
        }
        if (dbUrl.includes('postgresql.railway.internal')) {
            const publicUrl = dbUrl.replace('postgresql.railway.internal', 'railway.app');
            console.log('Using transformed Railway DATABASE_URL');
            return publicUrl;
        }
        console.log('Using original DATABASE_URL');
        return dbUrl;
    }
    console.log('Using default DATABASE_URL');
    return process.env.DATABASE_URL;
};
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
        db: {
            url: getDatabaseUrl()
        }
    }
});
prisma.$use(async (params, next) => {
    try {
        return await next(params);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientInitializationError ||
            error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.error('Database error:', error.message);
            await prisma.$connect();
        }
        throw error;
    }
});
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    }
});
async function testDbConnection(retries = 5, delay = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempting database connection (attempt ${i + 1}/${retries})...`);
            const dbUrl = getDatabaseUrl();
            if (!dbUrl) {
                throw new Error('Database URL is not configured');
            }
            await prisma.$executeRaw `SELECT 1`;
            prisma.$on('error', async (e) => {
                console.error('Prisma Client error:', e);
                try {
                    await prisma.$connect();
                    console.log('Reconnected to database after error');
                }
                catch (reconnectError) {
                    console.error('Failed to reconnect:', reconnectError);
                }
            });
            console.log('Successfully connected to database');
            return true;
        }
        catch (error) {
            console.error(`Database connection attempt ${i + 1} failed:`, error);
            if (i < retries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    return false;
}
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
app.use((0, cors_1.default)({
    origin: corsOrigins,
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (_req, res) => {
    res.json({
        message: 'CloudNotes API is running',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});
app.get('/health', async (_req, res) => {
    var _a;
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString(),
            databaseUrl: (_a = getDatabaseUrl()) === null || _a === void 0 ? void 0 : _a.split('@')[1]
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3001;
async function startServer() {
    try {
        const dbConnected = await testDbConnection();
        if (!dbConnected) {
            throw new Error('Failed to connect to database after multiple retries');
        }
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Health check available at http://localhost:${PORT}/health`);
            console.log('Database connection successful');
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Closing HTTP server and database connection...');
    await prisma.$disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=index.js.map