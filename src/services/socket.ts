import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000;

let socket: Socket | null = null;
let reconnectAttempts = 0;

export const connectSocket = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, skipping socket connection');
      return null;
    }

    // If socket exists and is connected, return it
    if (socket?.connected) {
      return socket;
    }

    // If socket exists but is disconnected, clean it up
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }

    console.log('Connecting to socket...', SOCKET_URL);
    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
      reconnectionDelay: RECONNECT_DELAY,
      timeout: 10000
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
      reconnectAttempts = 0;
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      reconnectAttempts++;
      
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log('Max reconnection attempts reached, stopping reconnection');
        socket?.disconnect();
        socket = null;
      } else {
        console.log(`Reconnecting... Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
        setTimeout(() => {
          if (socket) {
            socket.connect();
          }
        }, RECONNECT_DELAY);
      }
    });

    return socket;
  } catch (error) {
    console.error('Error connecting to socket:', error);
    return null;
  }
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