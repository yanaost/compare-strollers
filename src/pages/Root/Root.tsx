import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388E3C",
      light: "#757575",
    },
  },
  typography: {
    h1: { fontSize: "2.6rem" },
    h2: { fontSize: "1.2rem" },
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

export const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};
