"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./utils/db");
const health_1 = __importDefault(require("./routes/health"));
const auth_1 = __importDefault(require("./routes/auth"));
const notes_1 = __importDefault(require("./routes/notes"));
const folders_1 = __importDefault(require("./routes/folders"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:3000'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || corsOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
async function startServer() {
    let prisma = null;
    let server = null;
    try {
        prisma = await (0, db_1.initializePrisma)();
        if (!prisma)
            throw new Error('Failed to initialize Prisma client');
        app.get('/', (_req, res) => {
            res.json({ message: 'Welcome to CloudNotes API' });
        });
        app.get('/health', (_req, res) => {
            res.json({ status: 'ok' });
        });
        app.use('/api/health', health_1.default);
        app.use('/api/auth', auth_1.default);
        app.use('/api/notes', notes_1.default);
        app.use('/api/folders', folders_1.default);
        app.use('/api/admin', admin_1.default);
        app.use((err, _req, res, _next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong!' });
        });
        app.use((_req, res) => {
            res.status(404).json({ error: 'Not Found' });
        });
        server = app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
            console.log('CORS enabled for origins:', corsOrigins);
        });
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: (origin, callback) => {
                    if (!origin || corsOrigins.includes(origin)) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error('Not allowed by CORS'));
                    }
                },
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization']
            }
        });
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
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