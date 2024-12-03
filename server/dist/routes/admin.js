"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/stats', auth_1.authenticateToken, auth_1.isAdmin, async (_req, res) => {
    try {
        const [totalUsers, totalNotes, totalSharedNotes, categoryStats] = await Promise.all([
            prisma.user.count(),
            prisma.note.count(),
            prisma.note.count({
                where: {
                    sharedWith: {
                        some: {}
                    }
                }
            }),
            prisma.note.groupBy({
                by: ['category'],
                _count: true,
                where: {
                    category: {
                        not: null
                    }
                },
                orderBy: {
                    category: 'asc'
                }
            })
        ]);
        res.json({
            totalUsers,
            totalNotes,
            totalSharedNotes,
            categoryStats
        });
    }
    catch (error) {
        console.error('Error getting admin stats:', error);
        res.status(500).json({ error: 'Failed to get admin statistics' });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map