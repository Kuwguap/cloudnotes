import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get note by ID
router.get('/:id', authenticateToken, async (req: any, res) => {
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
  } catch (error) {
    console.error('Get note error:', error);
    return res.status(500).json({ error: 'Failed to get note' });
  }
});

// Lock note
router.post('/:id/lock', authenticateToken, async (req: any, res) => {
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

    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        isLocked: true,
        passcode: hashedPasscode
      }
    });

    return res.json(updatedNote);
  } catch (error) {
    console.error('Lock note error:', error);
    return res.status(500).json({ error: 'Failed to lock note' });
  }
});

// Unlock note
router.post('/:id/unlock', authenticateToken, async (req: any, res) => {
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

    const validPasscode = await bcrypt.compare(passcode, note.passcode);
    if (!validPasscode) {
      return res.status(401).json({ error: 'Invalid passcode' });
    }

    return res.json({ message: 'Note unlocked successfully' });
  } catch (error) {
    console.error('Unlock note error:', error);
    return res.status(500).json({ error: 'Failed to unlock note' });
  }
});

// Create note
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const {
      title,
      content,
      folderId,
      category
    } = req.body;
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
  } catch (error) {
    console.error('Create note error:', error);
    return res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update note
router.put('/:id', authenticateToken, async (req: any, res) => {
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
  } catch (error) {
    console.error('Update note error:', error);
    return res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete note
router.delete('/:id', authenticateToken, async (req: any, res) => {
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
  } catch (error) {
    console.error('Delete note error:', error);
    return res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Share note
router.post('/:id/share', authenticateToken, async (req: any, res) => {
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
  } catch (error) {
    console.error('Share note error:', error);
    return res.status(500).json({ error: 'Failed to share note' });
  }
});

// Remove share
router.delete('/:id/share/:userId', authenticateToken, async (req: any, res) => {
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
  } catch (error) {
    console.error('Remove share error:', error);
    return res.status(500).json({ error: 'Failed to remove share' });
  }
});

// Update share permissions
router.put('/:id/share/:userId', authenticateToken, async (req: any, res) => {
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
  } catch (error) {
    console.error('Update share error:', error);
    return res.status(500).json({ error: 'Failed to update share permissions' });
  }
});

export default router; 