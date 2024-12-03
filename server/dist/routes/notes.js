"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                OR: [
                    { authorId: userId },
                    {
                        sharedWith: {
                            some: {
                                userId
                            }
                        }
                    }
                ]
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                sharedWith: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        return res.json(note);
    }
    catch (error) {
        console.error('Get note error:', error);
        return res.status(500).json({ error: 'Failed to get note' });
    }
});
router.post('/:id/lock', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { passcode } = req.body;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                authorId: userId
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        const hashedPasscode = await bcrypt_1.default.hash(passcode, 10);
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                isLocked: true,
                passcode: hashedPasscode
            }
        });
        return res.json(updatedNote);
    }
    catch (error) {
        console.error('Lock note error:', error);
        return res.status(500).json({ error: 'Failed to lock note' });
    }
});
router.post('/:id/unlock', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { passcode } = req.body;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                OR: [
                    { authorId: userId },
                    {
                        sharedWith: {
                            some: {
                                userId
                            }
                        }
                    }
                ]
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        if (!note.passcode) {
            return res.status(400).json({ error: 'Note is not locked' });
        }
        const validPasscode = await bcrypt_1.default.compare(passcode, note.passcode);
        if (!validPasscode) {
            return res.status(401).json({ error: 'Invalid passcode' });
        }
        return res.json({ message: 'Note unlocked successfully' });
    }
    catch (error) {
        console.error('Unlock note error:', error);
        return res.status(500).json({ error: 'Failed to unlock note' });
    }
});
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const { title, content, folderId, category } = req.body;
        const userId = req.user.id;
        const note = await prisma.note.create({
            data: {
                title,
                content,
                folderId,
                category,
                authorId: userId,
                isLocked: false
            }
        });
        return res.json(note);
    }
    catch (error) {
        console.error('Create note error:', error);
        return res.status(500).json({ error: 'Failed to create note' });
    }
});
router.put('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                OR: [
                    { authorId: userId },
                    {
                        sharedWith: {
                            some: {
                                userId,
                                canEdit: true
                            }
                        }
                    }
                ]
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found or not editable' });
        }
        const updatedNote = await prisma.note.update({
            where: { id },
            data: updates
        });
        return res.json(updatedNote);
    }
    catch (error) {
        console.error('Update note error:', error);
        return res.status(500).json({ error: 'Failed to update note' });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                authorId: userId
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        await prisma.note.delete({
            where: { id }
        });
        return res.json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        console.error('Delete note error:', error);
        return res.status(500).json({ error: 'Failed to delete note' });
    }
});
router.post('/:id/share', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, canEdit } = req.body;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                authorId: userId
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        const targetUser = await prisma.user.findUnique({
            where: { email }
        });
        if (!targetUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const share = await prisma.noteShare.create({
            data: {
                noteId: id,
                userId: targetUser.id,
                canEdit
            }
        });
        return res.json(share);
    }
    catch (error) {
        console.error('Share note error:', error);
        return res.status(500).json({ error: 'Failed to share note' });
    }
});
router.delete('/:id/share/:userId', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id, userId: targetUserId } = req.params;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                authorId: userId
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        await prisma.noteShare.deleteMany({
            where: {
                noteId: id,
                userId: targetUserId
            }
        });
        return res.json({ message: 'Share removed successfully' });
    }
    catch (error) {
        console.error('Remove share error:', error);
        return res.status(500).json({ error: 'Failed to remove share' });
    }
});
router.put('/:id/share/:userId', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id, userId: targetUserId } = req.params;
        const { canEdit } = req.body;
        const userId = req.user.id;
        const note = await prisma.note.findFirst({
            where: {
                id,
                authorId: userId
            }
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        const share = await prisma.noteShare.updateMany({
            where: {
                noteId: id,
                userId: targetUserId
            },
            data: {
                canEdit
            }
        });
        return res.json(share);
    }
    catch (error) {
        console.error('Update share error:', error);
        return res.status(500).json({ error: 'Failed to update share permissions' });
    }
});
exports.default = router;
//# sourceMappingURL=notes.js.map