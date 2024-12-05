"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                authorId: req.user.id
            },
            include: {
                notes: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.json(folders);
    }
    catch (error) {
        console.error('Error fetching folders:', error);
        res.status(500).json({ error: 'Failed to fetch folders' });
    }
});
exports.default = router;
//# sourceMappingURL=folders.js.map