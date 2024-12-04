import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all folders
router.get('/', authenticateToken, async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

export default router; 