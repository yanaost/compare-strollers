import { Box, Fab, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CodexFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
  backgroundColor: "#EFCDBB",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "#E8C0A8",
  },
}));

export const CodexPanel = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(10),
  right: theme.spacing(3),
  width: "400px",
  maxWidth: "calc(100vw - 24px)",
  height: "600px",
  maxHeight: "calc(100vh - 120px)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[10],
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    maxHeight: "100%",
    bottom: 0,
    right: 0,
    borderRadius: 0,
  },
}));

export const CodexHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EFCDBB",
}));

export const CodexMessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const CodexInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  gap: theme.spacing(1),
}));

export const MessageBubble = styled(Box)<{ isUser: boolean }>(
  ({ theme, isUser }) => ({
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(2),
    maxWidth: "80%",
    alignSelf: isUser ? "flex-end" : "flex-start",
    backgroundColor: isUser ? "#EFCDBB" : theme.palette.grey[200],
    color: theme.palette.text.primary,
    wordWrap: "break-word",
  })
);
