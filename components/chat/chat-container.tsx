"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaperAirplaneIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useSocket } from "@/context/SocketProvider";
import { Message } from "@/types/socket";
import moment from "moment";

interface ChatContainerProps {
  chatId: string;
  roomId: string;
  initialMessages: Message[];
  onSendMessage: (content: string) => Promise<{ message?: Message; error?: string }>;
  onMarkAsRead: () => Promise<void>;
  currentUserId: string;
  currentUserName: string;
}

export function ChatContainer({
  chatId,
  roomId,
  initialMessages,
  onSendMessage,
  onMarkAsRead,
  currentUserId,
  currentUserName,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const socket = useSocket();

  // Scroll automático al final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Unirse a la sala al montar el componente
  useEffect(() => {
    if (socket && typeof socket.emit === 'function') {
      socket.emit("join-room", roomId);

      // Listeners para eventos del socket
      const handleNewMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
      };

      const handleUserTyping = ({ userId, userName, isTyping: typing }: {
        userId: string;
        userName: string;
        isTyping: boolean;
      }) => {
        if (userId !== currentUserId) {
          setTypingUsers((prev) => {
            if (typing) {
              return [...prev.filter(id => id !== userId), userName];
            } else {
              return prev.filter(name => name !== userName);
            }
          });
        }
      };

      socket.on("new-message", handleNewMessage);
      socket.on("user-typing", handleUserTyping);

      // Marcar mensajes como leídos cuando se abra el chat
      onMarkAsRead();

      return () => {
        socket.off("new-message", handleNewMessage);
        socket.off("user-typing", handleUserTyping);
        socket.emit("leave-room", roomId);
      };
    } else {
      // Si no hay socket, solo marcar como leído
      onMarkAsRead();
    }
  }, [socket, roomId, currentUserId, onMarkAsRead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    
    try {
      const result = await onSendMessage(newMessage.trim());
      
      if (result.message) {
        // Emitir el mensaje via WebSocket si está disponible
        if (socket && typeof socket.emit === 'function') {
          socket.emit("send-message", {
            roomId,
            message: result.message,
          });
        }
        
        // Agregar mensaje localmente si no hay WebSocket
        if (!socket) {
          setMessages((prev) => [...prev, result.message!]);
        }
        
        setNewMessage("");
        inputRef.current?.focus();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (socket && typeof socket.emit === 'function' && !isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        roomId,
        userId: currentUserId,
        userName: currentUserName,
        isTyping: true,
      });
    }

    // Limpiar timeout anterior
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Establecer nuevo timeout para dejar de escribir
    typingTimeoutRef.current = setTimeout(() => {
      if (socket && typeof socket.emit === 'function' && isTyping) {
        setIsTyping(false);
        socket.emit("typing", {
          roomId,
          userId: currentUserId,
          userName: currentUserName,
          isTyping: false,
        });
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay mensajes aún. ¡Sé el primero en escribir!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.userId === currentUserId ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={message.userImage || ""} />
                <AvatarFallback>
                  {(message.userName || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex-1 max-w-xs ${
                  message.userId === currentUserId ? "text-right" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.userId === currentUserId
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  }`}
                >
                  <p className="text-sm break-words">{message.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>{message.userName}</span>
                  <span>•</span>
                  <span>{moment(message.createdAt).format("HH:mm")}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Indicador de escribiendo */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <span>{typingUsers.join(", ")} está{typingUsers.length > 1 ? "n" : ""} escribiendo...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input para nuevo mensaje - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleTyping}
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 resize-none"
              disabled={isSending}
            />
          </div>
          <Button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}