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

export const StyledH1 = styled("div", { label: "StyledH1" })(({theme}) => ({
    whiteSpace: "nowrap",
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
