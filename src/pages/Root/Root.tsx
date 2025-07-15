import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388E3C",
      light: "#757575",
    },
    secondary: {
      main: "#CDDC39",
      light: "#C8E6C9",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  breakpoints: {
    values: {
      xs: 390,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1240,
    },
  },
});

theme.typography.h1 = {
  fontSize: "2rem",
  fontWeight: 400,
  [theme.breakpoints.up("xs")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2.6rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.2rem",
  fontWeight: 400,
  [theme.breakpoints.up("xs")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.4rem",
  },
};

export const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};
