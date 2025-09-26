import { Server as SocketIOServer } from "socket.io";

export interface ServerToClientEvents {
  "new-message": (message: Message) => void;
  "user-typing": (data: { userId: string; userName: string; isTyping: boolean }) => void;
  "messages-read": (data: { userId: string; messageIds: string[] }) => void;
  "message-error": (error: { error: string }) => void;
}

export interface ClientToServerEvents {
  "join-room": (roomId: string) => void;
  "leave-room": (roomId: string) => void;
  "send-message": (data: { roomId: string; message: Message }) => void;
  "typing": (data: { roomId: string; userId: string; userName: string; isTyping: boolean }) => void;
  "mark-messages-read": (data: { roomId: string; userId: string; messageIds: string[] }) => void;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userImage?: string | null;
  createdAt: Date;
  chatId: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  name: string;
  type: "PROJECT" | "TASK_GROUP";
  projectId?: string;
  taskGroupId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageRead {
  id: string;
  messageId: string;
  userId: string;
  readAt: Date;
}