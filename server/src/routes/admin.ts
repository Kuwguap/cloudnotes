import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get admin stats
router.get('/stats', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalNotes,
      totalFolders,
      recentUsers,
      recentNotes
    ] = await Promise.all([
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
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

export default router; 