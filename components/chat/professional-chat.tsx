"use client";

import { useState, useEffect, useRef } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { Message as MessageType } from "@/types/socket";
import moment from "moment";
import "moment/locale/es"; // Configurar moment en español

// Configurar moment para usar español
moment.locale("es");

interface ProfessionalChatProps {
  chatId: string;
  initialMessages: MessageType[];
  onSendMessage: (content: string) => Promise<{ message?: MessageType; error?: string }>;
  onMarkAsRead: () => Promise<void>;
  currentUserId: string; 
  currentUserName: string;
  title?: string;
  height?: string;
}

export function ProfessionalChat({
  chatId,
  initialMessages = [],
  onSendMessage,
  onMarkAsRead,
  currentUserId,
  currentUserName,
  title = "Chat",
  height = "500px",
}: ProfessionalChatProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Update messages when initialMessages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Mark messages as read when component mounts
  useEffect(() => {
    onMarkAsRead();
  }, [onMarkAsRead]);

  const handleSendMessage = async (innerHtml: string, textContent: string) => {
    if (!textContent.trim() || isSending) return;

    setIsSending(true);
    
    try {
      const result = await onSendMessage(textContent.trim());
      
      if (result.message) {
        // Add message to local state immediately for better UX
        setMessages(prev => [...prev, result.message!]);
      } else if (result.error) {
        console.error("Error sending message:", result.error);
        // TODO: Show error notification
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // TODO: Show error notification
    } finally {
      setIsSending(false);
    }
  };

  // Convert our messages to ChatScope format
  const formatMessages = () => {
    const formattedMessages: JSX.Element[] = [];
    let lastDate: string | null = null;

    messages.forEach((msg, index) => {
      const messageDate = moment(msg.createdAt).format("YYYY-MM-DD");
      
      // Add date separator if date changed
      if (lastDate !== messageDate) {
        formattedMessages.push(
          <MessageSeparator 
            key={`separator-${index}`} 
            content={moment(msg.createdAt).format("dddd, D [de] MMMM [de] YYYY")} 
          />
        );
        lastDate = messageDate;
      }

      const isCurrentUser = msg.userId === currentUserId;
      const prevMsg = messages[index - 1];
      const nextMsg = messages[index + 1];
      
      // Determine message position for grouping
      let position: "single" | "first" | "normal" | "last" = "single";
      if (prevMsg && nextMsg && prevMsg.userId === msg.userId && nextMsg.userId === msg.userId) {
        position = "normal";
      } else if (prevMsg && prevMsg.userId === msg.userId) {
        position = "last";
      } else if (nextMsg && nextMsg.userId === msg.userId) {
        position = "first";
      }
      
      formattedMessages.push(
        <Message
          key={msg.id}
          model={{
            message: msg.content,
            sentTime: moment(msg.createdAt).format("HH:mm"),
            sender: msg.userName || "Usuario",
            direction: isCurrentUser ? "outgoing" : "incoming",
            position,
          }}
        >
          {!isCurrentUser && position !== "normal" && position !== "first" && (
            <Avatar
              src={msg.userImage || ""}
              name={(msg.userName || "U").charAt(0).toUpperCase()}
              size="sm"
            />
          )}
        </Message>
      );
    });

    return formattedMessages;
  };

  return (
    <div style={{ position: "relative", height }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="Alguien está escribiendo..." /> : undefined}
          >
            {formatMessages()}
          </MessageList>
          <MessageInput
            placeholder="Escribe un mensaje..."
            onSend={handleSendMessage}
            disabled={isSending}
            attachButton={false}
            sendButton={true}
            fancyScroll={true}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}