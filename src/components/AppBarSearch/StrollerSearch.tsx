import { Autocomplete, debounce, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import { allStrollers } from "../../data/allStrollers";
import { useCallback, useState } from "react";
import { StrollersFeatures } from "../../types/StrollersFeatures";

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

type Props = {
  handleAddStrollerIdToCompare: (newStrollerId: number) => void;
};

export const StrollerSearch: React.FC<Props> = ({
  handleAddStrollerIdToCompare,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<StrollersFeatures[]>([]); //from C
  const [loading, setLoading] = useState(false); // from C

  const getStrollersFromServerByQuery = async (query: string) => {
    console.log("query--", query);
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/api/strollers/search?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }
      const results = response.json();
      setOptions(await results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      console.log("DEBOUCER!!");
      if (query.length > 0) {
        getStrollersFromServerByQuery(query);
      }
    }, 300),
    []
  );

  return (
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
            console.log("click pram from search", newValue, reason);
            handleAddStrollerIdToCompare(newValue.strollerId); /// waiting for the id of choosen pram
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
            debouncedSearch(newInputValue);
          }
        }}
        options={options} //??? all possible stroller should come here eventually after each type
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
  );
};
