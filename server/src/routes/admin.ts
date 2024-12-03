import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get system stats
router.get('/stats', authenticateToken, isAdmin, async (_req, res) => {
  try {
    const [
      totalUsers,
      totalNotes,
      totalSharedNotes,
      categoryStats
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Total notes
      prisma.note.count(),
      
      // Total shared notes
      prisma.note.count({
        where: {
          sharedWith: {
            some: {}
          }
        }
      }),
      
      // Notes by category
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
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({ error: 'Failed to get admin statistics' });
  }
});

export default router; 