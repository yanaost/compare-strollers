import { ButtonBase, ButtonBaseProps, Typography, TypographyProps } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

export const Section = styled("section")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(8, 2, 10),
  backgroundColor: theme.palette.background.paper,
}));

export const SectionContent = styled("div")(({ theme }) => ({
  maxWidth: 1040,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4.5),
}));

export const SectionHeading = styled("div")(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const CardsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: theme.spacing(3),
}));

export const CardButton = styled(ButtonBase)<ButtonBaseProps & { component?: React.ElementType; to?: string }>(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "left",
  textDecoration: "none",
  color: "inherit",
  padding: theme.spacing(3.25, 3.5),
  borderRadius: 20,
  backgroundColor: theme.palette.background.default,
  boxShadow: "0 6px 18px rgba(15, 35, 45, 0.06)",
  transition:
    "background-color 180ms ease-out, box-shadow 180ms ease-out, transform 180ms ease-out",
  border: "none",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.common.white,
      0.9
    )}, ${alpha(theme.palette.common.white, 0.75)})`,
    opacity: 0,
    transition: "opacity 200ms ease-out",
    pointerEvents: "none",
  },

  "& > *": {
    position: "relative",
    zIndex: 1,
  },

  "&:hover": {
    transform: "translateY(-2px)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 14px 36px rgba(15, 35, 45, 0.12)",
  },

  "&:hover::before": {
    opacity: 1,
  },

  "&:focus-visible": {
    outline: `2px solid ${alpha(theme.palette.primary.main, 0.65)}`,
    outlineOffset: 3,
  },

  "&:disabled": {
    opacity: 0.75,
    transform: "none",
  },
}));

export const CardBody = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const CardTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: -0.2,
  fontSize: theme.typography.pxToRem(17),
  color: theme.palette.text.primary,
}));
