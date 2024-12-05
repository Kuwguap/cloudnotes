"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                isAdmin: true,
                createdAt: true
            }
        });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = async (req, res, next) => {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
            res.status(403).json({ error: 'Admin access required' });
            return;
        }
        next();
    }
    catch (error) {
        console.error('Admin check error:', error);
        res.status(500).json({ error: 'Server error' });
        return;
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map