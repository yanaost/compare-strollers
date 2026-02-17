import { Box, Container, Typography } from "@mui/material";
import { AppBarSearch } from "../../components/AppBarSearch";
import { Footer } from "../../components/Footer";

export const About = () => (
  <>
    <AppBarSearch />
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        About
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Compare Strollers helps parents make confident decisions by putting
          stroller specs side by side. No affiliate links, no hidden rankings
          — just clear, honest comparisons.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          We gather specifications from manufacturer websites and official
          retailers so you can compare weight, fold dimensions, features, and
          more in one place.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Whether you're looking for the lightest travel stroller or the most
          versatile all-terrain option, we're here to help you find the right
          fit for your family.
        </Typography>
      </Box>
    </Container>
    <Footer />
  </>
);
