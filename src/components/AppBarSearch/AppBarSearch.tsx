import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StrollerSearch } from "./StrollerSearch";

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
  return (
    <Box component="header">
      <AppBar position="static" component="div">
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
          <StrollerSearch
            handleAddStrollerIdToCompare={handleAddStrollerIdToCompare}
          />
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
