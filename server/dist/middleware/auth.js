"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Invalid token' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
            res.status(403).json({ error: 'Admin access required' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
        return;
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map