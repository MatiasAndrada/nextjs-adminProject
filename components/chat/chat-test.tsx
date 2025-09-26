"use client";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export function ChatTest() {
  const handleSend = (message: string) => {
    console.log("Message sent:", message);
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "100%" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: "Hola! Este es un mensaje de prueba.",
                sentTime: "15 mins ago",
                sender: "Joe",
                direction: "incoming",
                position: "single",
              }}
            />
            <Message
              model={{
                message: "¡Respuesta de prueba!",
                sentTime: "just now",
                sender: "Yo",
                direction: "outgoing", 
                position: "single",
              }}
            />
          </MessageList>
          <MessageInput
            placeholder="Escribe un mensaje de prueba..."
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}