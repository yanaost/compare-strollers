import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  CodexFab,
  CodexPanel,
  CodexHeader,
  CodexMessagesContainer,
  CodexInputContainer,
  MessageBubble,
} from "./CodexAgent.styled";
import { useCodexAgent } from "./hooks/useCodexAgent";

export const CodexAgent: React.FC = () => {
  const {
    messages,
    isOpen,
    isLoading,
    openAgent,
    closeAgent,
    sendMessage,
  } = useCodexAgent();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      await sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <CodexFab onClick={openAgent} aria-label="Open Codex Agent">
        <SmartToyIcon />
      </CodexFab>
    );
  }

  return (
    <>
      <CodexPanel elevation={8}>
        <CodexHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SmartToyIcon />
            <Typography variant="h6" component="h2">
              Codex Agent
            </Typography>
          </Box>
          <IconButton
            onClick={closeAgent}
            size="small"
            aria-label="Close Codex Agent"
          >
            <CloseIcon />
          </IconButton>
        </CodexHeader>

        <CodexMessagesContainer>
          {messages.map((message) => (
            <MessageBubble key={message.id} isUser={message.role === "user"}>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {message.content}
              </Typography>
            </MessageBubble>
          ))}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <MessageBubble isUser={false}>
                <CircularProgress size={16} />
              </MessageBubble>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </CodexMessagesContainer>

        <CodexInputContainer>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask me about strollers..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
          />
          <IconButton
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            color="primary"
            aria-label="Send message"
          >
            <SendIcon />
          </IconButton>
        </CodexInputContainer>
      </CodexPanel>
    </>
  );
};
