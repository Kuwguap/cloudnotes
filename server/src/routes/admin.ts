import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();
const prisma = new PrismaClient();

// Get stats
router.get('/stats', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const [totalNotes, totalUsers, categoryStats] = await Promise.all([
      prisma.note.count(),
      prisma.user.count(),
      prisma.note.groupBy({
        by: ['category'],
        _count: true,
        where: {
          category: { not: null }
        },
        orderBy: {
          category: 'asc'
        }
      })
    ]);

    res.json({
      totalNotes,
      totalUsers,
      categoryStats
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({ error: 'Failed to get admin stats' });
  }
});

export default router; 