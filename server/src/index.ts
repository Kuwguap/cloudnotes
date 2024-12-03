import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import routes from './routes';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'CloudNotes API is running' });
});

// Use routes
app.use('/api', routes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:3001'}`);
});

// Add after socket.io setup
interface ConnectedUser {
  userId: string;
  socketId: string;
  noteId?: string;
}

const connectedUsers = new Map<string, ConnectedUser>();

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.data.user.id);

  socket.on('join:note', async ({ noteId, userId }) => {
    try {
      // Verify user has access to the note
      const note = await prisma.note.findFirst({
        where: {
          id: noteId,
          OR: [
            { authorId: userId },
            {
              sharedWith: {
                some: {
                  userId: userId
                }
              }
            }
          ]
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

      if (!note) {
        socket.emit('error', { message: 'Not authorized to access this note' });
        return;
      }

      // Store user connection info
      connectedUsers.set(socket.id, {
        userId,
        socketId: socket.id,
        noteId
      });

      // Join the note's room
      socket.join(`note:${noteId}`);

      // Get user details
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true }
      });

      if (user) {
        // Notify others in the room
        socket.to(`note:${noteId}`).emit('collaborator:joined', {
          noteId,
          user
        });

        // Get current collaborators
        const collaborators = Array.from(connectedUsers.values())
          .filter(u => u.noteId === noteId && u.userId !== userId)
          .map(async (u) => {
            const userData = await prisma.user.findUnique({
              where: { id: u.userId },
              select: { id: true, name: true, email: true }
            });
            return userData;
          });

        const resolvedCollaborators = await Promise.all(collaborators);
        socket.emit('collaborators:list', {
          noteId,
          collaborators: resolvedCollaborators.filter(Boolean)
        });
      }
    } catch (error) {
      console.error('Error in join:note:', error);
      socket.emit('error', { message: 'Failed to join note session' });
    }
  });

  socket.on('leave:note', ({ noteId }) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.to(`note:${noteId}`).emit('collaborator:left', {
        noteId,
        userId: user.userId
      });
      socket.leave(`note:${noteId}`);
      user.noteId = undefined;
    }
  });

  socket.on('note:change', async ({ noteId, changes }) => {
    try {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      // Verify user still has access and can edit
      const note = await prisma.note.findFirst({
        where: {
          id: noteId,
          OR: [
            { authorId: user.userId },
            {
              sharedWith: {
                some: {
                  userId: user.userId,
                  canEdit: true
                }
              }
            }
          ]
        }
      });

      if (!note) {
        socket.emit('error', { message: 'Not authorized to edit this note' });
        return;
      }

      // If note is locked and user is not the owner, prevent changes
      if (note.isLocked && note.authorId !== user.userId) {
        socket.emit('error', { message: 'Note is locked' });
        return;
      }

      // Broadcast changes to all users in the note's room except sender
      socket.to(`note:${noteId}`).emit('note:change', {
        noteId,
        changes,
        userId: user.userId
      });

      // Update the note in the database
      await prisma.note.update({
        where: { id: noteId },
        data: {
          ...changes,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Error in note:change:', error);
      socket.emit('error', { message: 'Failed to process note changes' });
    }
  });

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user && user.noteId) {
      socket.to(`note:${user.noteId}`).emit('collaborator:left', {
        noteId: user.noteId,
        userId: user.userId
      });
    }
    connectedUsers.delete(socket.id);
    console.log('User disconnected:', socket.data.user.id);
  });
}); 