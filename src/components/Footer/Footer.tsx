import { Box, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

const FooterA = () => (
  <Box
    component="footer"
    sx={{
      borderTop: "1px solid",
      borderColor: "divider",
      py: 3,
      mt: 6,
      textAlign: "center",
    }}
  >
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Compare Strollers &copy; {currentYear}
    </Typography>
  </Box>
);

const FooterB = () => (
  <Box
    component="footer"
    sx={{
      borderTop: "1px solid",
      borderColor: "divider",
      py: 3,
      px: 4,
      mt: 6,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 1,
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
      Compare Strollers
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Made for parents who research everything
    </Typography>
  </Box>
);

const FooterC = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "primary.main",
      py: 2.5,
      px: 4,
      mt: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
      Compare Strollers
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
      &middot; &copy; {currentYear}
    </Typography>
  </Box>
);

export const FooterPreview = () => (
  <Box sx={{ mt: 8 }}>
    <Typography
      variant="caption"
      sx={{ display: "block", textAlign: "center", mb: 1, color: "text.secondary" }}
    >
      Option A — Simple centered
    </Typography>
    <FooterA />

    <Typography
      variant="caption"
      sx={{ display: "block", textAlign: "center", mt: 4, mb: 1, color: "text.secondary" }}
    >
      Option B — Two-column subtle
    </Typography>
    <FooterB />

    <Typography
      variant="caption"
      sx={{ display: "block", textAlign: "center", mt: 4, mb: 1, color: "text.secondary" }}
    >
      Option C — Green bar
    </Typography>
    <FooterC />
  </Box>
);

export { FooterA, FooterB, FooterC };
