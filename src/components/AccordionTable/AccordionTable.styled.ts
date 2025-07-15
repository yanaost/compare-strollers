import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AccordionContainer = styled("div", { label: "AccordionContainer" })(
  () => ({
    paddingTop: 20,
  })
);

export const AccordionTitle = styled("h2")(() => ({
  fontSize: `calc(20px + 4*(100vw - 480px) / 760)`,
  "&::first-letter": {
    textTransform: "uppercase",
  },
}));

export const TableSectionContainer = styled(Box, { label: "TableSectionContainer" })(
  ({ theme }) => ({
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

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

export const SectionContainerShadow = styled("div")(() => ({
  display: "flex",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
  justifyContent: "space-between",
  height: "60px",
  alignItems: "center",
  width: "100%",
}));

export const StyledTableRow = styled("div")(({ theme }) => ({
  padding: "16px 0",
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

type StyledTableRowTitleProps = {
  $numberOfStrollersToCompare: number;
};

export const StyledTableRowTitle = styled("h3", {
  label: "StyledTableRowTitle",
  shouldForwardProp: (prop) => prop !== "$numberOfStrollersToCompare",
})<StyledTableRowTitleProps>(({ theme, $numberOfStrollersToCompare }) => ({
  marginBottom: 8,
  marginBlockStart: 0,
  fontSize: "1rem",
  lineHeight: 1.35,
  letterSpacing: ".01rem",
  flexGrow: 0,
  flexShrink: 0,
  paddingRight: 4,
  paddingLeft: 4,
  flexBasis: "100%",
  maxWidth: "100%",
  "&::first-letter": {
    textTransform: "uppercase",
  },

  [theme.breakpoints.up("sm")]: {
    paddingRight: 8,
    paddingLeft: 8,
  },

  [theme.breakpoints.up("lg")]: {
    marginTop: 32,
    paddingRight: 8,
    paddingLeft: 8,
    flexBasis: "26%",
    maxWidth: 100 / ($numberOfStrollersToCompare + 1) + "%",
  },
}));

export const Section = styled("section")(({ theme }) => ({
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
  },
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% + 16px)`,
    flexWrap: "nowrap",
  },
}));

type CollapseSectionProps = {
  $numberOfStrollersToCompare: number;
};

export const CollapseSection = styled("div", {
  label: "CollapseSection",
  shouldForwardProp: (prop) => prop !== "$numberOfStrollersToCompare",
})<CollapseSectionProps>(({ theme, $numberOfStrollersToCompare }) => ({
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
    width: `max(100%,${$numberOfStrollersToCompare * 25 + 25}%)`,
  },
}));

type StyledTableCellsContainerProps = {
  $numberOfStrollersToCompare: number;
};

export const StyledTableCellsContainer = styled("div", {
  label: "StyledTableCellsContainer",
  shouldForwardProp: (prop) => prop !== "$numberOfStrollersToCompare",
})<StyledTableCellsContainerProps>(
  ({ theme, $numberOfStrollersToCompare }) => ({
    display: "flex",
    flex: " 0 1 auto",

    flexWrap: "nowrap",
    width: `calc(100% + 8px)`,

    [theme.breakpoints.down("xs")]: {
      width:
        (100 / Math.max(100, $numberOfStrollersToCompare * 50)) * 100 + "%",
    },
    [theme.breakpoints.up("xs")]: {
      width:
        (100 / Math.max(100, $numberOfStrollersToCompare * 50)) * 100 + "%",
    },
    [theme.breakpoints.up("sm")]: {
      width:
        (100 / Math.max(100, $numberOfStrollersToCompare * 50)) * 100 + "%",
    },
    [theme.breakpoints.up("md")]: {
      width:
        (100 / Math.max(100, $numberOfStrollersToCompare * 33.33)) * 100 + "%",
    },
    [theme.breakpoints.up("lg")]: {
      width: 100 - 100 / ($numberOfStrollersToCompare + 1) + "%",
    },
  })
);

type StyledTableCellContainerProps = {
  $numberOfStrollersToCompare: number;
};

export const StyledTableCellContainer = styled("div", {
  label: "StyledTableCellContainer",
  shouldForwardProp: (prop) => prop !== "$numberOfStrollersToCompare",
})<StyledTableCellContainerProps>(({ theme, $numberOfStrollersToCompare }) => ({
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
    paddingTop: 32,
    paddingBottom: 32,
    flexBasis: "33.33%",
    maxWidth: "33.33%",
  },

  [theme.breakpoints.up("lg")]: {
    paddingRight: 8,
    paddingLeft: 8,

    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "33%",
    maxWidth: 100 / $numberOfStrollersToCompare + "%",
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.background.default,
  backgroundColor: theme.palette.secondary.main,
  transition: "all 100ms ease-in",
  "&:hover": {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main,
    transform: "scale(1.2)",
  },
}));
