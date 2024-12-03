import { io, Socket } from 'socket.io-client';

interface NoteUpdate {
  type: 'note-update';
  noteId: string;
  changes: {
    content?: string;
    title?: string;
    updatedAt?: string;
  };
}

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        console.log('Connecting to socket at:', SOCKET_URL);
        
        this.socket = io(SOCKET_URL, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          withCredentials: true,
          auth: {
            token
          },
          extraHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        this.socket.on('connect', () => {
          console.log('Socket connected successfully');
          resolve(this.socket!);
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          reject(error);
        });

        this.socket.on('disconnect', (reason) => {
          console.log('Socket disconnected:', reason);
          if (reason === 'io server disconnect') {
            // Reconnect if server disconnected
            this.socket?.connect();
          }
        });

        this.socket.on('error', (error) => {
          console.error('Socket error:', error);
          if (error.message === 'Authentication error') {
            // Handle authentication error
            this.disconnect();
            reject(new Error('Authentication failed'));
          }
        });

      } catch (error) {
        console.error('Socket initialization error:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendNoteUpdate(update: NoteUpdate) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    try {
      // Ensure the data is serializable
      const serializedUpdate = {
        type: update.type,
        noteId: update.noteId,
        changes: {
          content: update.changes.content || '',
          title: update.changes.title || '',
          updatedAt: update.changes.updatedAt || new Date().toISOString()
        }
      };

      this.socket.emit('note-change', JSON.stringify(serializedUpdate));
    } catch (error) {
      console.error('Error sending note update:', error);
    }
  }

  onNoteUpdate(callback: (update: NoteUpdate) => void) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }

    this.socket.on('note-change', (data: string) => {
      try {
        const update = JSON.parse(data) as NoteUpdate;
        callback(update);
      } catch (error) {
        console.error('Error parsing note update:', error);
      }
    });
  }

  offNoteUpdate(callback: (update: NoteUpdate) => void) {
    if (!this.socket) return;
    this.socket.off('note-change', callback);
  }

  // Helper method to check if socket is connected
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Helper method to get current socket instance
  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = SocketService.getInstance();
export type { NoteUpdate }; 