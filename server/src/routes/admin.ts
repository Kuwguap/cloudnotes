import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const ADMIN_EMAIL = 'richierodney434@gmail.com';

// Middleware to check if user is admin
const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (user?.email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Not authorized for admin access' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get admin statistics
router.get('/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalNotes,
      totalFolders,
      totalShares,
      notesCreatedToday,
      activeUsers,
      topSharedNotes,
      userStats,
      noteStats,
      folderStats,
      recentActivity
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Total notes
      prisma.note.count(),
      
      // Total folders
      prisma.folder.count(),
      
      // Total shares
      prisma.noteShare.count(),
      
      // Notes created today
      prisma.note.count({
        where: {
          createdAt: {
            gte: startOfDay
          }
        }
      }),
      
      // Active users today
      prisma.note.groupBy({
        by: ['authorId'],
        where: {
          updatedAt: {
            gte: startOfDay
          }
        }
      }).then(users => users.length),
      
      // Top shared notes
      prisma.note.findMany({
        select: {
          id: true,
          title: true,
          author: {
            select: {
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              sharedWith: true
            }
          }
        },
        orderBy: {
          sharedWith: {
            _count: 'desc'
          }
        },
        take: 5
      }),

      // User statistics
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          _count: {
            select: {
              notes: true,
              folders: true,
              sharedNotes: true
            }
          },
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }),

      // Note statistics
      prisma.$transaction([
        // Notes per category
        prisma.note.groupBy({
          by: ['category'],
          _count: true,
          where: {
            category: { not: null }
          }
        }),
        // Locked notes count
        prisma.note.count({
          where: { isLocked: true }
        }),
        // Starred notes count
        prisma.note.count({
          where: { starred: true }
        }),
        // Notes created this week
        prisma.note.count({
          where: {
            createdAt: {
              gte: startOfWeek
            }
          }
        })
      ]),

      // Folder statistics
      prisma.$transaction([
        // Folders with most notes
        prisma.folder.findMany({
          select: {
            id: true,
            name: true,
            _count: {
              select: { notes: true }
            }
          },
          orderBy: {
            notes: {
              _count: 'desc'
            }
          },
          take: 5
        }),
        // Locked folders count
        prisma.folder.count({
          where: { isLocked: true }
        })
      ]),

      // Recent activity
      prisma.note.findMany({
        select: {
          id: true,
          title: true,
          updatedAt: true,
          author: {
            select: {
              name: true,
              email: true
            }
          },
          sharedWith: {
            select: {
              createdAt: true,
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
          }
        },
        where: {
          OR: [
            { updatedAt: { gte: startOfDay } },
            { sharedWith: { some: { createdAt: { gte: startOfDay } } } }
          ]
        },
        orderBy: {
          updatedAt: 'desc'
        },
        take: 10
      })
    ]);

    const [categoryStats, lockedNotesCount, starredNotesCount, notesThisWeek] = noteStats;
    const [topFolders, lockedFoldersCount] = folderStats;

    const stats = {
      overview: {
        totalUsers,
        totalNotes,
        totalFolders,
        totalShares,
        notesCreatedToday,
        activeUsers,
        notesThisWeek
      },
      noteDetails: {
        categoryBreakdown: categoryStats,
        lockedCount: lockedNotesCount,
        starredCount: starredNotesCount,
        topShared: topSharedNotes.map(note => ({
          id: note.id,
          title: note.title,
          author: note.author,
          shareCount: note._count.sharedWith
        }))
      },
      userDetails: {
        recentUsers: userStats.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          notesCount: user._count.notes,
          foldersCount: user._count.folders,
          sharesCount: user._count.sharedNotes,
          joinedAt: user.createdAt
        }))
      },
      folderDetails: {
        topFolders: topFolders.map(folder => ({
          id: folder.id,
          name: folder.name,
          noteCount: folder._count.notes
        })),
        lockedCount: lockedFoldersCount
      },
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        title: activity.title,
        updatedAt: activity.updatedAt,
        author: activity.author,
        lastSharedWith: activity.sharedWith[0]?.user || null,
        lastSharedAt: activity.sharedWith[0]?.createdAt || null
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 