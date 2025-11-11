import { AppBar, Box, Typography } from "@mui/material";
import { StrollerSearch } from "./StrollerSearch/StrollerSearch";
import {
  StyledH1,
  StyledH2,
  StyledHeading,
  StyledToolbar,
} from "./AppBarSearch.styled";

export const AppBarSearch: React.FC = () => {
  return (
    <Box component="header">
      <AppBar position="static" component="div">
        <StyledToolbar>
          <StyledHeading>
            <StyledH1>Compare Strollers</StyledH1>
          </StyledHeading>
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
