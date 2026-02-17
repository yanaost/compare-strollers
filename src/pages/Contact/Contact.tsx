import { Box, Container, Link as MuiLink, Typography } from "@mui/material";
import { AppBarSearch } from "../../components/AppBarSearch";
import { Footer } from "../../components/Footer";

export const Contact = () => (
  <>
    <AppBarSearch />
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Contact
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Have a question, suggestion, or found incorrect data? We'd love to
          hear from you.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Email us at{" "}
          <MuiLink href="mailto:hello@comparestrollers.com">
            hello@comparestrollers.com
          </MuiLink>
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          We aim to respond within 48 hours.
        </Typography>
      </Box>
    </Container>
    <Footer />
  </>
);
