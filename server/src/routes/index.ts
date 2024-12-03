import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import notesRouter from './notes';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Auth routes
router.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Folders routes
router.get('/folders', authenticateToken, async (req: any, res) => {
  try {
    console.log('Fetching folders for user:', req.user.id);
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
        isArchived: false,
      },
      include: {
        notes: {
          where: { isArchived: false },
          select: { id: true },
        },
        subfolders: {
          where: { isArchived: false },
        },
      },
    });
    console.log(`Found ${folders.length} folders`);
    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/folders', authenticateToken, async (req: any, res) => {
  try {
    const { 
      name, 
      description, 
      color, 
      icon, 
      parentId,
      isLocked,
      isArchived
    } = req.body;

    // Verify parent folder access if parentId is provided
    if (parentId) {
      const parentFolder = await prisma.folder.findUnique({
        where: { id: parentId },
      });
      
      if (!parentFolder || parentFolder.userId !== req.user.id) {
        return res.status(403).json({ error: 'Invalid parent folder access' });
      }
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        description,
        color,
        icon,
        parentId,
        userId: req.user.id,
        isLocked: isLocked || false,
        isArchived: isArchived || false
      },
      include: {
        notes: true,
        subfolders: true,
      },
    });
    console.log('Created folder:', folder);
    res.json(folder);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete folder
router.delete('/folders/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    
    console.log('Attempting to delete folder:', id);

    const folder = await prisma.folder.findUnique({
      where: { id },
      include: {
        notes: true,
        subfolders: true,
      },
    });

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    if (folder.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete related records first
    await prisma.$transaction([
      // Delete notes in the folder
      prisma.note.deleteMany({
        where: { folderId: id },
      }),
      // Delete subfolders recursively
      prisma.folder.deleteMany({
        where: { parentId: id },
      }),
      // Finally delete the folder itself
      prisma.folder.delete({
        where: { id },
      }),
    ]);

    console.log('Folder and related records deleted successfully:', id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Use notes routes
router.use('/notes', notesRouter);

// User search route
router.get('/users/search', authenticateToken, async (req: any, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: q, mode: 'insensitive' } },
          { name: { contains: q, mode: 'insensitive' } },
        ],
        NOT: {
          id: req.user.id, // Exclude current user
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
      take: 5, // Limit results
    });

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 