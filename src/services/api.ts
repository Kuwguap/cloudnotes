import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { Note } from '../types';

const isProd = import.meta.env.PROD;
const baseURL = isProd 
  ? 'https://cloudnotes-production.up.railway.app/api'
  : 'http://localhost:5000/api';

const wsURL = isProd
  ? 'wss://cloudnotes-production.up.railway.app'
  : 'ws://localhost:5000';

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API Request:', {
    method: config.method,
    url: config.url,
    data: config.data,
    headers: config.headers,
  });
  return config;
}, (error) => {
  console.error('API Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log('Authentication error, clearing tokens');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  }
);

let socket: Socket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 2000;

export const connectSocket = () => {
  if (socket?.connected) return socket;

  socket = io(wsURL, {
    transports: ['websocket'],
    withCredentials: true,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    reconnectionDelay: RECONNECT_DELAY,
    autoConnect: true
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
    reconnectAttempts = 0;
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    reconnectAttempts++;
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
      socket?.disconnect();
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    reconnectAttempts = 0;
  }
};

// Auth API
export const register = (data: { email: string; password: string; name: string }) =>
  api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

// Add sanitization helper
const sanitizeLockedNote = (note: any, userId: string) => {
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
      version: note.version,
    };
  }
  return note;
};

// Get current user ID
const getCurrentUserId = (): string | null => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id;
    }
  } catch (error) {
    console.error('Error getting current user:', error);
  }
  return null;
};

// Notes API
export const getNotes = async (params?: { folderId?: string; id?: string }) => {
  try {
    console.log('Fetching notes...');
    const response = await api.get('/notes', { params });
    const userId = getCurrentUserId();
    
    if (userId) {
      // Double-check sanitization on client side
      response.data = Array.isArray(response.data) 
        ? response.data.map(note => sanitizeLockedNote(note, userId))
        : sanitizeLockedNote(response.data, userId);
    }
    
    console.log('Notes fetched successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (data: {
  title: string;
  content?: string;
  description?: string;
  category?: string;
  tags?: string[];
  folderId?: string;
  isLocked?: boolean;
  isArchived?: boolean;
  isPinned?: boolean;
  starred?: boolean;
}) => {
  try {
    const response = await api.post('/notes', data);
    const userId = getCurrentUserId();
    if (userId) {
      response.data = sanitizeLockedNote(response.data, userId);
    }
    return response;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (noteId: string, data: Partial<Note>) => {
  return api.put(`/notes/${noteId}`, data);
};

export const shareNote = async (id: string, data: { email: string; canEdit: boolean }) => {
  console.log('API: Sharing note:', id, 'with:', data);
  try {
    const response = await api.post(`/notes/${id}/share`, data);
    console.log('API: Share response:', response.data);
    return response;
  } catch (error) {
    console.error('API: Error sharing note:', error);
    throw error;
  }
};

export const deleteNote = (id: string) => api.delete(`/notes/${id}`);

export const removeShare = (noteId: string, userId: string) =>
  api.delete(`/notes/${noteId}/share/${userId}`);

// Real-time collaboration
export const joinNoteSession = (noteId: string, userId: string) => {
  if (socket) {
    socket.emit('join:note', { noteId, userId });
  }
};

export const leaveNoteSession = (noteId: string) => {
  if (socket) {
    socket.emit('leave:note', { noteId });
  }
};

export const sendNoteChange = (noteId: string, changes: any) => {
  if (socket) {
    socket.emit('note:change', { noteId, changes });
  }
};

// User Preferences API
export const getUserPreferences = () => api.get('/preferences');

export const updateUserPreferences = (data: {
  theme?: string;
  fontSize?: number;
  defaultView?: string;
  sidebarOpen?: boolean;
}) => api.put('/preferences', data);

// Folders API
export const getFolders = async () => {
  try {
    console.log('Fetching folders...');
    const response = await api.get('/folders');
    console.log('Folders fetched successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }
};

export const createFolder = (data: {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  isLocked?: boolean;
  isArchived?: boolean;
}) => api.post('/folders', data);

export const updateFolder = (
  id: string,
  data: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
    isArchived?: boolean;
  }
) => api.put(`/folders/${id}`, data);

export const deleteFolder = async (folderId: string) => {
  return api.delete(`/folders/${folderId}`);
};

// Add lock/unlock functions for notes
export const lockNote = async (id: string, passcode: string) => {
  try {
    const response = await api.post(`/notes/${id}/lock`, { passcode });
    const userId = getCurrentUserId();
    if (userId) {
      response.data = sanitizeLockedNote(response.data, userId);
    }
    return response;
  } catch (error) {
    console.error('Error locking note:', error);
    throw error;
  }
};

export const unlockNote = async (id: string, passcode: string) => {
  try {
    const response = await api.post(`/notes/${id}/unlock`, { passcode });
    const userId = getCurrentUserId();
    if (userId) {
      response.data = sanitizeLockedNote(response.data, userId);
    }
    return response;
  } catch (error) {
    console.error('Error unlocking note:', error);
    throw error;
  }
};

// Add lock/unlock functions for folders
export const lockFolder = (id: string, passcode: string) =>
  api.post(`/folders/${id}/lock`, { passcode });

export const unlockFolder = (id: string, passcode: string) =>
  api.post(`/folders/${id}/unlock`, { passcode });

// User API
export const searchUsers = async (query: string) => {
  console.log('API searchUsers: Starting search with query:', query);
  try {
    const url = `/users/search?q=${encodeURIComponent(query)}`;
    console.log('API searchUsers: Making request to:', url);
    const response = await api.get(url);
    console.log('API searchUsers: Received response:', response.data);
    return response;
  } catch (error: any) {
    console.error('API searchUsers: Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateSharePermissions = async (noteId: string, userId: string, canEdit: boolean) => {
  console.log('API: Updating share permissions:', { noteId, userId, canEdit });
  try {
    const response = await api.put(`/notes/${noteId}/share/${userId}`, { canEdit });
    console.log('API: Share permissions updated:', response.data);
    return response;
  } catch (error) {
    console.error('API: Error updating share permissions:', error);
    throw error;
  }
};

export default api; 