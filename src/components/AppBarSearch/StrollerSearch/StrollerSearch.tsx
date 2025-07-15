import { Autocomplete, debounce } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useCallback, useState } from "react";
import { StrollersFeatures } from "../../../types/StrollersFeatures";
import {
  Search,
  SearchIconWrapper,
  StyledTextField,
} from "./StrollerSearch.styled";
import { HourglassEmpty } from "@mui/icons-material";

type Props = {
  handleAddStrollerIdToCompare: (newStrollerId: number) => void;
};

export const StrollerSearch: React.FC<Props> = ({
  handleAddStrollerIdToCompare,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<StrollersFeatures[]>([]);
  const [loading, setLoading] = useState(false);

  const getStrollersFromServerByQuery = async (query: string) => {
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

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length > 0) {
        getStrollersFromServerByQuery(query);
      }
    }, 300),
    []
  );

  return (
    <Search>
      <SearchIconWrapper sx={{}}>
        {loading ? <HourglassEmpty /> : <SearchIcon />}
      </SearchIconWrapper>
      <Autocomplete
        open={inputValue.length > 0}
        noOptionsText=""
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => `${option.brand} ${option.modelName}`}
        id="search-stroller"
        onChange={(_, newValue, reason) => {
          if (newValue !== null) {
            handleAddStrollerIdToCompare(newValue.strollerId);
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
        options={options}
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
