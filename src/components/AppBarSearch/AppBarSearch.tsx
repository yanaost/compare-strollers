import {
  AppBar,
  Autocomplete,
  Box,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { allStrollers } from "../../data/allStrollers";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    width: "100%",
    marginLeft: "16px",
  },
  [theme.breakpoints.up("md")]: {
    flexBasis: "33%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.light,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 200,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  alignItems: "center",
  md: "center",
  maxWidth: `calc(1536px + 192px)`,

  [theme.breakpoints.up("xs")]: {
    paddingLeft: 16,
    paddingRight: 16,
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

type Props = {
  handleAddStrollerIdToCompare: (newStrollerId: number) => void;
};

export const AppBarSearch: React.FC<Props> = ({
  handleAddStrollerIdToCompare,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Box component="header">
      <AppBar position="static">
        <StyledToolbar sx={{}}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { md: "2rem", xl: "2.6rem" },
              whiteSpace: "nowrap",

              float: { xs: "left", sm: "left" },
              width: { xs: "100%", sm: "left" },
              flexBasis: { sm: "40%", md: "33%" },
            }}
          >
            Compare strollers
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.2rem",
                xl: "1.4rem",
              },
              flexBasis: { sm: "25%", md: "33%" },
              float: { xs: "left", sm: "left" },
              width: { xs: "100%" },
            }}
          >
            Find the best stroller for you and your little explorer
          </Typography>
          <Search>
            <SearchIconWrapper
              sx={{
                float: "left",
              }}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => `${option.brand} ${option.modelName}`}
              id="search-stroller"
              onChange={(_, newValue, reason) => {
                if (newValue !== null) {
                  handleAddStrollerIdToCompare(newValue.id);
                  setInputValue(newValue.modelName);
                }

                if (reason === "selectOption") {
                  setInputValue("");
                }
              }}
              key={null}
              inputValue={inputValue}
              onInputChange={(_, newInputValue, reason) => {
                if (reason === "input") {
                  setInputValue(newInputValue);
                }
              }}
              options={allStrollers}
              renderInput={(params) => (
                <StyledTextField
                  variant="standard"
                  {...params}
                  placeholder="Type a stroller or a brand name"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{null}</>,
                  }}
                />
              )}
            />
          </Search>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
