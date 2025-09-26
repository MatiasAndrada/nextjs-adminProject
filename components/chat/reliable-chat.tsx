"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaperAirplaneIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Message as MessageType } from "@/types/socket";
import moment from "moment";

interface ReliableChatProps {
  chatId: string;
  initialMessages: MessageType[];
  onSendMessage: (content: string) => Promise<{ message?: MessageType; error?: string }>;
  onMarkAsRead: () => Promise<void>;
  currentUserId: string;
  currentUserName: string;
  height?: string;
}

export function ReliableChat({
  chatId,
  initialMessages = [],
  onSendMessage,
  onMarkAsRead,
  currentUserId,
  currentUserName,
  height = "500px",
}: ReliableChatProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update messages when initialMessages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input and mark as read on mount
  useEffect(() => {
    console.log("🎯 ReliableChat mounted with:", { 
      chatId, 
      messagesCount: messages.length,
      height 
    });
    inputRef.current?.focus();
    onMarkAsRead();
  }, [onMarkAsRead]);

  // Debug render
  console.log("🔄 ReliableChat rendering:", { 
    chatId, 
    messagesCount: messages.length, 
    newMessage,
    isSending
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Attempting to send message:", newMessage);
    
    if (!newMessage.trim() || isSending) {
      console.log("❌ Message blocked:", { isEmpty: !newMessage.trim(), isSending });
      return;
    }

    setIsSending(true);
    console.log("📤 Sending message...");
    
    try {
      const result = await onSendMessage(newMessage.trim());
      console.log("📥 Send result:", result);
      
      if (result.message) {
        // Add message to local state immediately for better UX
        setMessages(prev => [...prev, result.message!]);
        setNewMessage("");
        inputRef.current?.focus();
        console.log("✅ Message sent successfully");
      } else if (result.error) {
        console.error("❌ Error sending message:", result.error);
      }
    } catch (error) {
      console.error("💥 Exception sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div 
      className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg"
      style={{ height, width: "100%" }}
    >
      {/* Messages Area */}
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
                <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - ALWAYS VISIBLE */}
      <div className="flex-shrink-0 p-4 border-t-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20">
        <div className="mb-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
          💬 Escribe tu mensaje aquí:
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-900 border-2 border-blue-300 dark:border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-200 text-base"
            disabled={isSending}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            size="lg"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <PaperAirplaneIcon className="w-5 h-5" />
                <span className="font-medium">Enviar</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}