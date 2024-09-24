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
  marginRight: theme.spacing(5),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "100%",
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
        <Toolbar
          sx={{
            height: "200px",
            paddingTop: "24px",
            paddingBottom: "24px",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: { md: "space-around" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              marginLeft: (theme) => theme.spacing(2),
              marginRight: (theme) => theme.spacing(5),
              flexBasis: "0%",
              float: { xs: "left", sm: "left" },
              width: { xs: "100%", sm: "left" },
            }}
          >
            Compare strollers
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              flexBasis: "40%",
              float: { xs: "left", sm: "left" },
              width: { xs: "100%" },
              marginLeft: { sm: -2 },
            }}
          >
            Find the best stroller for you and your little explorer
          </Typography>
          <Search>
            <SearchIconWrapper
              sx={{
                float: { xs: "left", sm: "left" },
              }}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => `${option.brand} ${option.modelName}`}
              id="search-stroller"
              onChange={(_, newValue) => {
                if (newValue !== null) {
                  handleAddStrollerIdToCompare(newValue.id);
                }
              }}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
