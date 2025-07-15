import { styled, TextField } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      marginLeft: "16px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      marginLeft: "16px",
    },
    [theme.breakpoints.up("md")]: {
      flexBasis: "33%",
    },
  }));
  
  export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(1, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    float: "left",
    color: theme.palette.primary.light,
  }));
  
  export const StyledTextField = styled(TextField)(({ theme }) => ({
    color: theme.palette.primary.light,
    borderWidth: 5,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "101%",
  
    "& .MuiInputBase-root": {
      width: "100%",
      border: 0,
      borderImageWidth: 0,
    },
    "& .MuiInput": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("md")]: {
        width: "40ch",
      },
    },
    "& .MuiInput-root": {
      "&:before, :after, :hover:not(.Mui-disabled):before": {
        borderBottom: 0,
      },
    },
  }));
