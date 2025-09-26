"use client";

import { createContext, useContext, ReactNode } from "react";

interface SocketContextType {
  socket: null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function useSocketContext() {
  return {
    socket: null,
    isConnected: false,
  };
}

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  // Disabled Socket.IO to avoid conflicts - return static values
  const value: SocketContextType = {
    socket: null,
    isConnected: false,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook for socket instance (returns null when disabled)
export function useSocket() {
  return null;
}