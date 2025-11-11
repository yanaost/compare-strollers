import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 200,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  alignItems: "center",
  maxWidth: `calc(1536px + 192px)`,
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "column",
    height: "auto",
  },
  [theme.breakpoints.up("xs")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 5,
    flexDirection: "column",
  },
  [theme.breakpoints.up("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 5,
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "space-around",
    gap: 40,
    flexDirection: "row",
  },
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  [theme.breakpoints.up("xl")]: {
    paddingLeft: 96,
    paddingRight: 96,
  },
}));

export const StyledH1 = styled("h1")(({ theme }) => ({
  fontFamily: '"Baloo 2", "Segoe UI", system-ui, -apple-system, sans-serif',
  fontWeight: 600,
  fontStyle: "normal",
  fontOpticalSizing: "auto",
  fontSize: theme.typography.pxToRem(48),
  whiteSpace: "nowrap",
  letterSpacing: "0.5px",
  margin: 0,

  [theme.breakpoints.up("xs")]: {
    fontSize: theme.typography.pxToRem(48),
    flexBasis: "30%"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: theme.typography.pxToRem(48),
    flexBasis: "33%"
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: theme.typography.pxToRem(52),
  },
}));

export const StyledHeading = styled("div", { label: "StyledH1" })(({theme}) => ({
  float: "left",
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    flexBasis: "30%"
  },
  [theme.breakpoints.up("md")]: {
    flexBasis: "33%"
  },
  [theme.breakpoints.up("xl")]: {
  },
}));

export const StyledH2 = styled("div", { label: "StyledH2" })(({theme}) => ({
    float: "left",
    width: "100%",
    [theme.breakpoints.up("xs")]: {
        flexBasis: "30%"
    },
    [theme.breakpoints.up("md")]: {
        flexBasis: "33%"
    },
    [theme.breakpoints.up("xl")]: {
    },
}));
