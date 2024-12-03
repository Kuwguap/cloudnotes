import { io, Socket } from 'socket.io-client';

const SOCKET_URL = window.env.VITE_SOCKET_URL;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000;

export interface NoteUpdate {
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
  private reconnectAttempts = 0;

  connect() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping socket connection');
        return null;
      }

      // If socket exists and is connected, return it
      if (this.socket?.connected) {
        return this.socket;
      }

      // If socket exists but is disconnected, clean it up
      if (this.socket) {
        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.socket = null;
      }

      console.log('Connecting to socket...', SOCKET_URL);
      this.socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: RECONNECT_DELAY,
        timeout: 10000
      });

      this.socket.on('connect', () => {
        console.log('Socket connected successfully');
        this.reconnectAttempts = 0;
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.reconnectAttempts++;
        
        if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
          console.log('Max reconnection attempts reached, stopping reconnection');
          this.socket?.disconnect();
          this.socket = null;
        } else {
          console.log(`Reconnecting... Attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
          setTimeout(() => {
            if (this.socket) {
              this.socket.connect();
            }
          }, RECONNECT_DELAY);
        }
      });

      return this.socket;
    } catch (error) {
      console.error('Error connecting to socket:', error);
      return null;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.reconnectAttempts = 0;
    }
  }

  isConnected() {
    return !!this.socket?.connected;
  }

  sendNoteUpdate(update: NoteUpdate) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('note:update', update);
  }

  onNoteUpdate(callback: (update: NoteUpdate) => void) {
    this.socket?.on('note:update', callback);
  }

  offNoteUpdate(callback: (update: NoteUpdate) => void) {
    this.socket?.off('note:update', callback);
  }
}

export const socketService = new SocketService(); 