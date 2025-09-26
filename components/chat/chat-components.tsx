"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/types/socket";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  formatTime: (date: Date) => string;
  index: number;
}

export function MessageBubble({ message, isCurrentUser, formatTime, index }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
    >
      <Avatar className="w-8 h-8 flex-shrink-0 ring-2 ring-white dark:ring-gray-800 shadow-sm">
        <AvatarFallback 
          className={`text-xs font-medium ${
            isCurrentUser 
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white" 
              : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200"
          }`}
        >
          {(message.userName || "U").charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={`flex-1 max-w-[280px] ${isCurrentUser ? "text-right" : ""}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-3 rounded-2xl shadow-sm transition-all duration-200 ${
            isCurrentUser
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md"
              : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-100 dark:border-gray-600"
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        </motion.div>
        <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400 ${isCurrentUser ? "justify-end" : ""}`}>
          <span className="font-medium">{message.userName}</span>
          <span>•</span>
          <span>{formatTime(message.createdAt)}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-gray-400"
    >
      <div className="flex gap-1">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay }}
            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
          />
        ))}
      </div>
      <span>Alguien está escribiendo...</span>
    </motion.div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 h-full">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 dark:text-gray-400 text-sm font-medium"
        >
          Cargando conversación...
        </motion.p>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  userName: string;
}

export function EmptyState({ userName }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-16 h-16 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          💬
        </motion.div>
      </motion.div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
        ¡Hola, {userName}!
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
        Sé el primero en escribir un mensaje para comenzar la conversación.
      </p>
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-3 text-lg"
      >
        ✨
      </motion.div>
    </motion.div>
  );
}