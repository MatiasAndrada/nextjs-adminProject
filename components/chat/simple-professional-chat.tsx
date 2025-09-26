"use client";

import { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { Message as MessageType } from "@/types/socket";
import moment from "moment";

interface SimpleProfessionalChatProps {
  chatId: string;
  initialMessages: MessageType[];
  onSendMessage: (content: string) => Promise<{ message?: MessageType; error?: string }>;
  onMarkAsRead: () => Promise<void>;
  currentUserId: string;
  currentUserName: string;
  height?: string;
}

export function SimpleProfessionalChat({
  chatId,
  initialMessages = [],
  onSendMessage,
  onMarkAsRead,
  currentUserId,
  currentUserName,
  height = "500px",
}: SimpleProfessionalChatProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    onMarkAsRead();
  }, [onMarkAsRead]);

  const handleSendMessage = async (innerHtml: string, textContent: string) => {
    if (!textContent.trim() || isSending) return;

    setIsSending(true);
    
    try {
      const result = await onSendMessage(textContent.trim());
      
      if (result.message) {
        setMessages(prev => [...prev, result.message!]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const formatMessages = () => {
    return messages.map((msg) => {
      const isCurrentUser = msg.userId === currentUserId;
      
      return (
        <Message
          key={msg.id}
          model={{
            message: msg.content,
            sentTime: moment(msg.createdAt).format("HH:mm"),
            sender: msg.userName || "Usuario",
            direction: isCurrentUser ? "outgoing" : "incoming",
            position: "single",
          }}
        />
      );
    });
  };

  return (
    <div style={{ position: "relative", height, width: "100%" }}>
      <MainContainer style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
        <ChatContainer>
          <MessageList scrollBehavior="smooth">
            {messages.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "20px", 
                color: "#666",
                fontStyle: "italic" 
              }}>
                No hay mensajes aún. ¡Sé el primero en escribir!
              </div>
            ) : (
              formatMessages()
            )}
          </MessageList>
          <MessageInput
            placeholder="Escribe un mensaje..."
            onSend={handleSendMessage}
            disabled={isSending}
            attachButton={false}
            sendButton={true}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}