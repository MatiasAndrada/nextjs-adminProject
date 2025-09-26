"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaperAirplaneIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Message } from "@/types/socket";
import moment from "moment";

interface SimpleChatContainerProps {
  chatId: string;
  initialMessages: Message[];
  onSendMessage: (content: string) => Promise<{ message?: Message; error?: string }>;
  onMarkAsRead: () => Promise<void>;
  currentUserId: string;
  currentUserName: string;
}

export function SimpleChatContainer({
  chatId,
  initialMessages = [],
  onSendMessage,
  onMarkAsRead,
  currentUserId,
  currentUserName,
}: SimpleChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Mark messages as read when component mounts
  useEffect(() => {
    onMarkAsRead();
  }, [onMarkAsRead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    
    try {
      const result = await onSendMessage(newMessage.trim());
      
      if (result.message) {
        // Add message to local state immediately for better UX
        setMessages(prev => [...prev, result.message!]);
        setNewMessage("");
        inputRef.current?.focus();
      } else if (result.error) {
        console.error("Error sending message:", result.error);
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // TODO: Show error toast
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
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
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {message.userName}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {moment(message.createdAt).format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          ))
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
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200"
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