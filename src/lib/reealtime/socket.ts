import io from 'socket.io-client';
import type { Socket as SocketType } from 'socket.io-client'; 

let socket: typeof SocketType; 

export const initializeSocket = (token: string) => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
    auth: { token }
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  return socket;
};