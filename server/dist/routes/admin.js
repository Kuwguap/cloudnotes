"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/stats', auth_1.authenticateToken, auth_1.isAdmin, async (_req, res) => {
    try {
        const [totalUsers, totalNotes, totalFolders, recentUsers, recentNotes] = await Promise.all([
            prisma.user.count(),
            prisma.note.count(),
            prisma.folder.count(),
            prisma.user.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            }),
            prisma.note.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    author: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            })
        ]);
        res.json({
            stats: {
                totalUsers,
                totalNotes,
                totalFolders
            },
            recentActivity: {
                users: recentUsers,
                notes: recentNotes
            }
        });
    }
    catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map