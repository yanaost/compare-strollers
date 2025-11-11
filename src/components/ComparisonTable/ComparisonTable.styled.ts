import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTableFirstHeadCell = styled(Box, {
  label: "StyledTableFirstHeadCell",
})(({ theme }) => ({
  display: "none",
  flexGrow: 0,
  flexShrink: 0,
  paddingRight: 4,
  paddingLeft: 4,
  flexBasis: "25%",
  maxWidth: "25%",
  [theme.breakpoints.up("sm")]: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  [theme.breakpoints.up("lg")]: {
    display: "block",
  },
}));

export const StyledTableFirstHeadCellTitleContainer = styled(Box, {
  label: "StyledTableFirstHeadCellTitleContainer",
})(() => ({
  alignItems: "center",
  display: "flex",
  minHeight: 50,
}));

export const StyledTableCellContainer = styled("div", {
  label: "StyledTableCellContainer",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flexGrow: 0,
  flexShrink: 0,
  paddingRight: 4,
  paddingLeft: 4,
  flexBasis: "50%",
  maxWidth: "50%",

  [theme.breakpoints.up("sm")]: {
    paddingRight: 8,
    paddingLeft: 8,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "50%",
    maxWidth: "50%",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: "unset",
    paddingBottom: "unset",
    flexBasis: "33.33%",
    maxWidth: "33.33%",
  },

  [theme.breakpoints.up("lg")]: {
    paddingRight: 8,
    paddingLeft: 8,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "25%",
    maxWidth: "25%",
  },
}));

export const StyledCardContent = styled("div", { label: "StyledCardContent" })(() => ({
  position: "relative",
  outline: "none",
  width: "100%",
  height: 50,
  paddingTop: 14,
  paddingBottom: 14,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 6,
  border: "1px solid #e5e5e5",
  backgroundColor: "#fff",
  lineHeight: 1.35,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const StyledProductName = styled(Typography, { label: "StyledProductName" })(
  () => ({
    margin: 0,
    float: "left",
  })
);

export const StyledProductDeleteIcon = styled(IconButton, {
  label: "StyledProductDeleteIcon",
})(({ theme }) => ({
  padding: 0,
  float: "right",
  color: theme.palette.secondary.main,
  transition: "all 100ms ease-in",
  "&:hover": {
    backgroundColor: theme.palette.background.default,
    transform: "scale(1.1)",
  },
}));

export const ComparisonContainer = styled("div", { label: "ComparisonContainer" })(
  () => ({})
);

type StickyHeaderProps = {
  $numberOfStrollersToCompare: number;
};

export const ComparisonStickyHeader = styled(Box, {
  label: "ComparisonStickyHeader",
  shouldForwardProp: (prop) => prop !== "$numberOfStrollersToCompare",
})<StickyHeaderProps>(({ theme, $numberOfStrollersToCompare }) => ({
  position: "sticky",
  paddingBottom: 24,
  top: "0",
  zIndex: 100,
  width: "100%",
  backgroundColor: "white",
  boxShadow: "0 4px 12px 0 #b3b3b3",
  animationName: "sticky-header-animation-removing-top",
  animationDuration: "250ms",
  animationFillMode: "forwards",
  [theme.breakpoints.down("xs")]: {
    width: `max(100%,${$numberOfStrollersToCompare * 50}%)`,
  },
  [theme.breakpoints.up("xs")]: {
    width: `max(100%,${$numberOfStrollersToCompare * 50}%)`,
  },
  [theme.breakpoints.up("sm")]: {
    width: `max(100%,${$numberOfStrollersToCompare * 50}%)`,
  },
  [theme.breakpoints.up("md")]: {
    width: `max(100%,${$numberOfStrollersToCompare * 33.33}%)`,
  },
  [theme.breakpoints.up("lg")]: {
    width: `max(100%,${($numberOfStrollersToCompare + 1) * 25}%)`,
  },
}));

export const SectionContainer = styled(Box, { label: "SectionContainer" })(
  ({ theme }) => ({
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    maxWidth: `calc(1536px + 192px)`,
    [theme.breakpoints.up("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: 96,
      paddingRight: 96,
    },
  })
);

type SectionContainerHeaderProps = {
  $numberOfStrollersToCompare: number;
};

export const SectionContainerHeader = styled(Box, {
  label: "SectionContainerHeader",
  shouldForwardProp: (prop) => prop !== "$numberOfStrollersToCompare",
})<SectionContainerHeaderProps>(({ theme, $numberOfStrollersToCompare }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  width: "100%",
  maxWidth: `calc(1536px + 192px)`,
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 16,
    paddingRight: 16,
    width: (100 / Math.max(100, $numberOfStrollersToCompare * 50)) * 100 + "%",
  },
  [theme.breakpoints.up("xs")]: {
    paddingLeft: 16,
    paddingRight: 16,
    width: (100 / Math.max(100, $numberOfStrollersToCompare * 50)) * 100 + "%",
  },
  [theme.breakpoints.up("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
    width: (100 / Math.max(100, $numberOfStrollersToCompare * 50)) * 100 + "%",
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: 40,
    paddingRight: 40,
    width:
      (100 / Math.max(100, $numberOfStrollersToCompare * 33.33)) * 100 + "%",
  },
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 40,
    paddingRight: 40,
    width:
      (100 / Math.max(100, ($numberOfStrollersToCompare + 1) * 25)) * 100 + "%",
  },
  [theme.breakpoints.up("xl")]: {
    paddingLeft: 96,
    paddingRight: 96,
  },
}));

export const Section = styled("section", { label: "Section" })(({ theme }) => ({
  display: "flex",
  flex: " 0 1 auto",
  flexDirection: "row",
  flexWrap: "wrap",
  width: `calc(100% + 8px)`,
  paddingTop: 16,
  [theme.breakpoints.up("sm")]: {
    marginRight: -8,
    marginLeft: -8,
  },
  [theme.breakpoints.up("md")]: {
    width: `calc(100% + 16px)`,
    marginRight: -8,
    marginLeft: -8,
    paddingTop: 24,
  },
}));

export const ImageContainer = styled("div", { label: "ImageContainer" })(
  ({ theme }) => ({
    position: "relative",
    [theme.breakpoints.up("md")]: {
      marginBottom: 16,
    },
  })
);

export const Image = styled("img", { label: "Image" })(() => ({
  borderImageOutset: 0,
  borderImageRepeat: "stretch",
  borderImageSlice: "100%",
  borderImageSource: "none",
  borderImageWidth: 1,
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "100%",
  backgroundSize: "contain",
}));

export const Figure = styled("figure", { label: "Figure" })(() => ({
  backgroundSize: "contain",
  objectFit: "contain",
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  margin: 0,
}));

export const Product = styled("div", { label: "Product" })(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export const ProductContainer = styled("div", { label: "ProductContainer" })(
  ({ theme }) => ({
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: 4,
    paddingLeft: 4,
    flexBasis: "50%",
    maxWidth: "50%",
    [theme.breakpoints.up("sm")]: {
      paddingRight: 8,
      paddingLeft: 8,
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: 8,
      paddingLeft: 8,
      paddingTop: "unset",
      paddingBottom: "unset",
      flexBasis: "33.33%",
      maxWidth: "33.33%",
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: "unset",
      paddingBottom: "unset",
      paddingRight: 8,
      paddingLeft: 8,
      position: "relative",
      right: "-25%",
      flexBasis: "25%",
      maxWidth: "25%",
    },
  })
);

export const ProductName = styled("div", { label: "ProductName" })(() => ({
  marginBottom: 16,
  marginTop: 16,
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 700,
}));

export const ProductNameText = styled("h3", { label: "ProductNameText" })(() => ({
  margin: 0,
  fontSize: 18,
}));

export const ProductDescription = styled("div", { label: "ProductDescription" })(
  ({ theme }) => ({
    paddingLeft: 24,
    marginBottom: 16,
    [theme.breakpoints.up("md")]: {
      marginBottom: 24,
    },
  })
);

export const ProductDescriptionList = styled("ul", {
  label: "ProductDescriptionList",
})(() => ({
  margin: 0,
  padding: 0,
  paddingBottom: 24,
  borderBottom: "1px solid #e5e5e5",
}));

export const ProductDescriptionListItem = styled("li", {
  label: "ProductDescriptionListItem",
})(() => ({
  margin: 0,
  padding: 0,
}));

export const ScrollContainer = styled("div")(() => ({
  height: "100vh",
  overflow: "auto",
}));
