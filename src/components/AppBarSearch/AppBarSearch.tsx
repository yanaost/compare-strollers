import { AppBar, Box, Typography } from "@mui/material";
import { StrollerSearch } from "./StrollerSearch/StrollerSearch";
import { StyledH1, StyledH2, StyledToolbar } from "./AppBarSearch.styled";

export const AppBarSearch: React.FC = () => {
  return (
    <Box component="header">
      <AppBar position="static" component="div">
        <StyledToolbar>
          <StyledH1>
            <Typography variant="h1">Compare strollers</Typography>
          </StyledH1>
          <StyledH2>
            <Typography variant="h2">
              Find the best stroller for you and your little explorer
            </Typography>
          </StyledH2>
          <StrollerSearch />
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
