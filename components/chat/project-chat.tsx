"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ChatBubbleLeftIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
  MinusIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { send_message_to_project_chat, mark_project_chat_as_read, get_project_chat_messages } from "@/actions/chat";
import { Message } from "@/types/socket";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble, TypingIndicator, LoadingSpinner, EmptyState } from "./chat-components";

interface ProjectChatProps {
  projectId: string;
  currentUserId: string;
  currentUserName: string;
}

export function ProjectChat({
  projectId,
  currentUserId,
  currentUserName,
}: ProjectChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const loadMessages = async () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    try {
      // Obtener mensajes usando server action
      const result = await get_project_chat_messages(projectId);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      if (result.chat && result.messages) {
        setChatId(result.chat.id);
        setMessages(result.messages);
        setLastSeen(new Date());
        setConnectionStatus('connected');
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar mensajes cuando se abra el chat
  useEffect(() => {
    if (isOpen && !chatId) {
      loadMessages();
    }
  }, [isOpen, chatId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    setConnectionStatus('connecting');
    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      const result = await send_message_to_project_chat(projectId, messageContent);
      if (result.message) {
        setMessages(prev => [...prev, result.message!]);
        setUnreadCount(0);
        setConnectionStatus('connected');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setNewMessage(messageContent); // Restore message on error
      setConnectionStatus('disconnected');
      setTimeout(() => setConnectionStatus('connected'), 3000);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    // Simular indicador de escritura
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleMarkAsRead = async () => {
    await mark_project_chat_as_read(projectId);
    setUnreadCount(0);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString("es-ES", { 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    } else {
      return messageDate.toLocaleDateString("es-ES", { 
        day: "numeric", 
        month: "short" 
      });
    }
  };

  // Floating Action Button
  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => {
            setIsOpen(true);
            handleMarkAsRead();
          }}
          className="relative rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 border-2 border-white/20 backdrop-blur-sm"
          size="icon"
        >
          <ChatBubbleLeftIcon className="w-7 h-7 text-white" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-1.5 border-2 border-white shadow-lg"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </motion.div>
          )}
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] shadow-2xl rounded-2xl overflow-hidden bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-700 backdrop-blur-xl"
        style={{ 
          height: isMinimized ? "60px" : "auto",
          maxHeight: "calc(100vh - 8rem)"
        }}
      >
        {/* Modern Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <UserGroupIcon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate">Chat del Proyecto</h3>
              <p className="text-xs text-white/80 truncate">
                {messages.length === 0 ? "Sin mensajes" : `${messages.length} mensajes`}
                {connectionStatus !== 'connected' && (
                  <span className="ml-2">• {connectionStatus === 'connecting' ? 'Conectando...' : 'Sin conexión'}</span>
                )}
              </p>
            </div>
          </div>
          <div className="relative flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-white hover:bg-white/20 border-0 w-8 h-8 p-0"
              aria-label={isMinimized ? "Expandir chat" : "Minimizar chat"}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white hover:bg-white/20 border-0 w-8 h-8 p-0"
              aria-label="Cerrar chat"
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col"
            >
              {isLoading ? (
                <div className="p-4" style={{ height: "200px" }}>
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {/* Messages Area */}
                  <div className="overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20" style={{ 
                    minHeight: messages.length === 0 ? "200px" : "auto",
                    maxHeight: "400px"
                  }}>
                    {messages.length === 0 ? (
                      <EmptyState userName={currentUserName} />
                    ) : (
                      messages.map((message, index) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isCurrentUser={message.userId === currentUserId}
                          formatTime={formatTime}
                          index={index}
                        />
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                    {/* Connection Status */}
                    <AnimatePresence>
                      {connectionStatus !== 'connected' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-lg text-xs ${
                            connectionStatus === 'connecting' 
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            connectionStatus === 'connecting' ? "bg-yellow-500 animate-pulse" : "bg-red-500"
                          }`} />
                          <span>
                            {connectionStatus === 'connecting' ? "Enviando mensaje..." : "Error de conexión"}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    <AnimatePresence>
                      {isTyping && <TypingIndicator />}
                    </AnimatePresence>

                    <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newMessage}
                          onChange={handleInputChange}
                          placeholder="Escribe un mensaje..."
                          maxLength={500}
                          className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                          disabled={isSending || connectionStatus === 'disconnected'}
                        />
                        {newMessage.length > 0 && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                            {newMessage.length}/500
                          </div>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: newMessage.trim() && !isSending ? 1.05 : 1 }}
                        whileTap={{ scale: newMessage.trim() && !isSending ? 0.95 : 1 }}
                        type="submit"
                        disabled={!newMessage.trim() || isSending || connectionStatus === 'disconnected'}
                        className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center w-12 h-12 ${
                          !newMessage.trim() || isSending || connectionStatus === 'disconnected'
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {isSending ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : connectionStatus === 'connected' ? (
                          <PaperAirplaneIcon className="w-5 h-5" />
                        ) : (
                          <XMarkIcon className="w-5 h-5" />
                        )}
                      </motion.button>
                    </form>
                    
                    {/* Character count and last seen */}
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                      <span>
                        {messages.length > 0 && lastSeen && (
                          <>Última actividad: {formatTime(lastSeen)}</>
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3" />
                        {connectionStatus === 'connected' ? 'En línea' : 'Sin conexión'}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}