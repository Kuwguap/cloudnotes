import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

// Helper function to sanitize locked notes
const sanitizeNote = (note: any, userId: string) => {
  if (note.isLocked && note.authorId !== userId) {
    // Return only essential fields, sanitize everything else
    return {
      id: note.id,
      title: note.title,
      authorId: note.authorId,
      folderId: note.folderId,
      isLocked: true,
      isArchived: note.isArchived,
      isPinned: note.isPinned,
      starred: note.starred,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      author: note.author,
      folder: note.folder,
      sharedWith: note.sharedWith,
      // Sanitize sensitive fields
      content: '',
      description: '',
      tags: [],
      category: '',
      color: '',
      lockHash: undefined,
      version: note.version,
    };
  }
  return note;
};

// Get all notes
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    console.log('Fetching notes for user:', req.user.id);
    const notes = await prisma.note.findMany({
      where: {
        OR: [
          { authorId: req.user.id },
          {
            sharedWith: {
              some: {
                userId: req.user.id,
              },
            },
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        folder: true,
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    console.log(`Found ${notes.length} notes`);
    
    // Sanitize locked notes
    const sanitizedNotes = notes.map(note => sanitizeNote(note, req.user.id));
    
    // Log sanitized response for debugging
    console.log('Sending sanitized notes:', 
      sanitizedNotes.map(n => ({ 
        id: n.id, 
        title: n.title, 
        isLocked: n.isLocked,
        contentLength: n.content?.length || 0,
        authorId: n.authorId,
        requestUserId: req.user.id,
        isOwner: n.authorId === req.user.id
      }))
    );
    
    res.json(sanitizedNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single note
router.get('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        folder: true,
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if user has access to the note
    const hasAccess = note.authorId === req.user.id || 
      note.sharedWith.some(share => share.user.id === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Sanitize if locked and user is not the owner
    const sanitizedNote = sanitizeNote(note, req.user.id);
    res.json(sanitizedNote);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Lock note
router.post('/:id/lock', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const { passcode } = req.body;

    console.log('Attempting to lock note:', id);

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const lockHash = await bcrypt.hash(passcode, 10);
    
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        isLocked: true,
        lockHash,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        folder: true,
      },
    });

    // Return sanitized note but preserve necessary fields
    const sanitizedNote = {
      ...updatedNote,
      content: updatedNote.isLocked ? '' : updatedNote.content,
      description: updatedNote.isLocked ? '' : updatedNote.description,
      tags: updatedNote.isLocked ? [] : updatedNote.tags,
      category: updatedNote.isLocked ? '' : updatedNote.category,
      color: updatedNote.isLocked ? '' : updatedNote.color,
      lockHash: undefined,
      id: updatedNote.id,
      title: updatedNote.title,
      isLocked: true,
      isPinned: updatedNote.isPinned,
      isArchived: updatedNote.isArchived,
      starred: updatedNote.starred,
      createdAt: updatedNote.createdAt,
      updatedAt: updatedNote.updatedAt,
      lastAccessed: updatedNote.lastAccessed,
      authorId: updatedNote.authorId,
      folderId: updatedNote.folderId,
      version: updatedNote.version,
      author: updatedNote.author,
      folder: updatedNote.folder
    };

    console.log('Note locked successfully:', id);
    res.json(sanitizedNote);
  } catch (error) {
    console.error('Error locking note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unlock note
router.post('/:id/unlock', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const { passcode } = req.body;

    console.log('Attempting to unlock note:', id);

    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        folder: true,
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (!note.isLocked) {
      return res.status(400).json({ error: 'Note is not locked' });
    }

    if (!note.lockHash) {
      return res.status(400).json({ error: 'Note has no lock hash' });
    }

    const isValidPasscode = await bcrypt.compare(passcode, note.lockHash);
    if (!isValidPasscode) {
      return res.status(403).json({ error: 'Invalid passcode' });
    }

    // Only unlock if user is the author
    if (note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Only the note owner can unlock notes' });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        isLocked: false,
        lockHash: null,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        folder: true,
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    console.log('Note unlocked successfully:', id);
    res.json(updatedNote);
  } catch (error) {
    console.error('Error unlocking note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create note
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { 
      title, 
      content, 
      category, 
      tags, 
      description, 
      folderId,
      isLocked,
      isArchived,
      isPinned,
      starred
    } = req.body;
    
    console.log('Creating note:', { title, folderId });

    // Verify folder access if folderId is provided
    if (folderId) {
      const folder = await prisma.folder.findUnique({
        where: { id: folderId },
      });
      
      if (!folder || folder.userId !== req.user.id) {
        return res.status(403).json({ error: 'Invalid folder access' });
      }
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        description,
        category,
        tags: tags || [],
        folderId,
        authorId: req.user.id,
        isLocked: false,
        isArchived: isArchived || false,
        isPinned: isPinned || false,
        starred: starred || false,
        version: 1
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        folder: true,
      },
    });
    
    console.log('Note created successfully:', note.id);
    res.json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update note
router.put('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log('Updating note:', id, 'with:', updates);

    // Check note existence and permissions
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        sharedWith: true
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if user has permission to edit
    const hasEditPermission = note.authorId === req.user.id || 
      note.sharedWith.some(share => share.userId === req.user.id && share.canEdit);

    if (!hasEditPermission) {
      return res.status(403).json({ error: 'Not authorized to edit this note' });
    }

    // If note is locked and user is not the owner, prevent any updates
    if (note.isLocked && note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Note is locked' });
    }

    // Prevent non-owners from modifying lock status
    if ('isLocked' in updates && note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Only the note owner can modify lock status' });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        folder: true,
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

    // Sanitize if locked and user is not the owner
    const sanitizedNote = sanitizeNote(updatedNote, req.user.id);
    console.log('Note updated successfully:', id);
    res.json(sanitizedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete note
router.delete('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    
    console.log('Attempting to delete note:', id);

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete related records first
    await prisma.$transaction([
      // Delete collaboration sessions
      prisma.collaborationSession.deleteMany({
        where: { noteId: id },
      }),
      // Delete note shares
      prisma.noteShare.deleteMany({
        where: { noteId: id },
      }),
      // Finally delete the note
      prisma.note.delete({
        where: { id },
      }),
    ]);

    console.log('Note and related records deleted successfully:', id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Share note
router.post('/:id/share', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const { email, canEdit } = req.body;

    console.log('Sharing note:', id, 'with:', email, 'canEdit:', canEdit);

    // Find the note and verify ownership
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        sharedWith: {
          include: {
            user: true
          }
        }
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Only the note owner can share it' });
    }

    // Find the user to share with
    const userToShare = await prisma.user.findUnique({
      where: { email }
    });

    if (!userToShare) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userToShare.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot share note with yourself' });
    }

    // Check if already shared with this user
    const existingShare = note.sharedWith.find(share => share.user.id === userToShare.id);
    if (existingShare) {
      // Update existing share permissions
      const updatedNote = await prisma.note.update({
        where: { id },
        data: {
          sharedWith: {
            update: {
              where: {
                id: existingShare.id
              },
              data: {
                canEdit
              }
            }
          }
        },
        include: {
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
      return res.json(updatedNote);
    }

    // Create new share
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        sharedWith: {
          create: {
            userId: userToShare.id,
            canEdit
          }
        }
      },
      include: {
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

    console.log('Note shared successfully');
    res.json(updatedNote);
  } catch (error) {
    console.error('Error sharing note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove share
router.delete('/:id/share/:userId', authenticateToken, async (req: any, res) => {
  try {
    const { id, userId } = req.params;

    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        sharedWith: true
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Only the note owner can remove shares' });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        sharedWith: {
          deleteMany: {
            userId
          }
        }
      },
      include: {
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

    res.json(updatedNote);
  } catch (error) {
    console.error('Error removing share:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update share permissions
router.put('/:id/share/:userId', authenticateToken, async (req: any, res) => {
  try {
    const { id, userId } = req.params;
    const { canEdit } = req.body;

    console.log('Updating share permissions:', { noteId: id, userId, canEdit });

    const note = await prisma.note.findUnique({
      where: { id },
      select: {
        authorId: true,
      },
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updatedShare = await prisma.noteShare.update({
      where: {
        noteId_userId: {
          noteId: id,
          userId,
        },
      },
      data: {
        canEdit,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    console.log('Share permissions updated:', updatedShare);
    res.json(updatedShare);
  } catch (error) {
    console.error('Error updating share permissions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 