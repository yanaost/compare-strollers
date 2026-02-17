import { useState, useCallback, useContext } from "react";
import { CodexMessage, CodexAgentContextType } from "../../../types/CodexAgent";
import { strollersContext } from "../../../context/context";

const WELCOME_MESSAGE: CodexMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm Codex, your stroller comparison assistant. I can help you:\n\n• Find strollers based on your needs\n• Compare features between models\n• Answer questions about stroller specifications\n• Provide recommendations\n\nWhat are you looking for in a stroller?",
  timestamp: new Date(),
};

export const useCodexAgent = (): CodexAgentContextType => {
  const [messages, setMessages] = useState<CodexMessage[]>([WELCOME_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleAddStrollerIdToCompare } = useContext(strollersContext);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response generation
    // In a real implementation, this would call an AI API
    const lowerMessage = userMessage.toLowerCase();

    // Simple rule-based responses for demonstration
    if (lowerMessage.includes("lightweight") || lowerMessage.includes("light")) {
      return "I can help you find lightweight strollers! Let me search for models that are easy to carry. Would you like me to search for strollers under a specific weight?";
    }

    if (lowerMessage.includes("compact") || lowerMessage.includes("small")) {
      return "Looking for compact strollers? I can help you find space-saving models perfect for travel or small spaces. What's your priority - fold size or overall dimensions?";
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("cheap") || lowerMessage.includes("affordable")) {
      return "I understand you're looking for budget-friendly options. There are great strollers available at various price points. What's your budget range?";
    }

    if (lowerMessage.includes("travel") || lowerMessage.includes("airplane")) {
      return "Travel-friendly strollers are essential! I can help you find models that fold compactly and meet airline carry-on requirements. Are you looking for something that fits in overhead bins?";
    }

    if (lowerMessage.includes("compare") || lowerMessage.includes("difference")) {
      return "I can help you compare strollers! Use the search bar above to add strollers to your comparison, or tell me which models you're interested in and I can help you understand their differences.";
    }

    if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
      return "I'd be happy to recommend strollers! To give you the best suggestions, could you tell me:\n• Your budget range\n• Primary use case (city walks, jogging, travel, etc.)\n• Any must-have features\n• Number of children";
    }

    if (lowerMessage.includes("feature") || lowerMessage.includes("spec")) {
      return "I can help explain stroller features! The comparison table shows detailed specifications organized by categories like dimensions, seat features, safety, and storage. What specific feature are you curious about?";
    }

    // Default helpful response
    return `I understand you're looking for: "${userMessage}". 

To help you better, I can:
• Search for strollers matching your criteria
• Explain specific features
• Help you compare models
• Provide recommendations

Try asking me about:
- Lightweight or compact strollers
- Travel-friendly options
- Specific features you need
- Budget considerations

Or use the search bar above to find specific stroller models!`;
  };

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      const userMessage: CodexMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Check if the message contains stroller names/IDs to add to comparison
        const strollerIdMatch = message.match(/stroller[_\s]?id[:\s]+(\d+)/i);
        if (strollerIdMatch) {
          const strollerId = parseInt(strollerIdMatch[1], 10);
          handleAddStrollerIdToCompare(strollerId);
        }

        const response = await generateResponse(message);
        const assistantMessage: CodexMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Failed to generate response:", error);
        const errorMessage: CodexMessage = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again or use the search bar to find strollers directly.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [handleAddStrollerIdToCompare]
  );

  const openAgent = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeAgent = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  return {
    messages,
    isOpen,
    isLoading,
    openAgent,
    closeAgent,
    sendMessage,
    clearMessages,
  };
};
