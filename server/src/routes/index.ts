import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Login route
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Create folder
router.post('/folders', authenticateToken, async (req: any, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const folder = await prisma.folder.create({
      data: {
        name,
        authorId: userId
      }
    });

    return res.json(folder);
  } catch (error) {
    console.error('Create folder error:', error);
    return res.status(500).json({ error: 'Failed to create folder' });
  }
});

// Delete folder
router.delete('/folders/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const folder = await prisma.folder.findFirst({
      where: {
        id,
        authorId: userId
      }
    });

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    await prisma.folder.delete({
      where: { id }
    });

    return res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Delete folder error:', error);
    return res.status(500).json({ error: 'Failed to delete folder' });
  }
});

// Search users
router.get('/users/search', authenticateToken, async (req: any, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } }
        ],
        NOT: { id: userId }
      },
      select: {
        id: true,
        email: true,
        name: true
      },
      take: 5
    });

    return res.json(users);
  } catch (error) {
    console.error('User search error:', error);
    return res.status(500).json({ error: 'Failed to search users' });
  }
});

export default router; 