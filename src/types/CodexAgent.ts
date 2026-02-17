export type CodexMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export type CodexAgentState = {
  messages: CodexMessage[];
  isOpen: boolean;
  isLoading: boolean;
};

export type CodexAgentContextType = {
  messages: CodexMessage[];
  isOpen: boolean;
  isLoading: boolean;
  openAgent: () => void;
  closeAgent: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
};
