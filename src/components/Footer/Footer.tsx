import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const footerLinkSx = {
  color: "rgba(255,255,255,0.75)",
  textDecoration: "none",
  "&:hover": { color: "white" },
};

export const Footer = () => (
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
      gap: 2,
      flexWrap: "wrap",
    }}
  >
    <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
      Compare Strollers
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
      &middot;
    </Typography>
    <Typography
      component={Link}
      to="/about"
      variant="body2"
      sx={footerLinkSx}
    >
      About
    </Typography>
    <Typography
      component={Link}
      to="/contact"
      variant="body2"
      sx={footerLinkSx}
    >
      Contact
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
      &middot;
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
      &copy; {currentYear}
    </Typography>
  </Box>
);
