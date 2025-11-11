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
            <StyledH1>
              Compare{" "}
              <Box component="span" sx={{ color: "#EFCDBB" }}>
                Strollers
              </Box>
            </StyledH1>
          </StyledHeading>
          <StyledH2>
            <Typography
              variant="h2"
              sx={{
                fontFamily:
                  '"Baloo 2", "Segoe UI", system-ui, -apple-system, sans-serif',
                color: "white",
                opacity: 0.9,
                fontWeight: 300,
              }}
            >
              Find the best stroller for you and your little explorer
            </Typography>
          </StyledH2>
          <StrollerSearch />
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
