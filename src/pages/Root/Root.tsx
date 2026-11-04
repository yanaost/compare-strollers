import { Global, ThemeProvider, css } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { color, font } from "../../styles/tokens";

const theme = createTheme({
  palette: {
    primary: {
      main: color.accent,
      light: color.accentOnDark,
    },
    secondary: {
      main: color.ink,
      light: color.band,
    },
    background: {
      default: color.bg,
    },
  },
  typography: {
    fontFamily: font.family,
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

const globalStyles = css`
  /* In-page anchors (the About contents rail) glide rather than jump. */
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    background: ${color.bg};
    color: ${color.ink};
    font-family: ${font.family};
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: ${color.accent};
  }

  ::selection {
    background: ${color.accent};
    color: #fff;
  }
`;

export const Root = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Global styles={globalStyles} />
    <Outlet />
  </ThemeProvider>
);
