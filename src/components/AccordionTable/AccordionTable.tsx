import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Box, Collapse, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { AccordionsData } from "../../types/AccordionData";

const AccordionContainer = styled("div")(() => ({
  paddingTop: 20,
}));

const AccordionTitle = styled("h2")(() => ({
  fontSize: `calc(20px + 4*(100vw - 480px) / 760)`,
  "&::first-letter": {
    textTransform: "uppercase",
  },
}));

const TableSectionContainer = styled(Box)(({ theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  width: "100%",
  maxWidth: `calc(1536px + 192px)`,
  display: "flex",
  justifyContent: "space-between",
  height: "60px",
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
}));

const SectionContainerShadow = styled("div")(() => ({
  display: "flex",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
  justifyContent: "space-between",
  height: "60px",
  alignItems: "center",
  width: "100%",
}));

const StyledTableRow = styled("div")(({ theme }) => ({
  padding: "16px 0",
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableRowTitle = styled("h3")(({ theme }) => ({
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
    flexBasis: "25%",
    maxWidth: "25%",
  },
}));

const Section = styled("section")(({ theme }) => ({
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

const StyledTableCellContainer = styled("div")(({ theme }) => ({
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

type Props = {
  strollersDataToShow: AccordionsData;
};

export const AccordionTable: React.FC<Props> = ({ strollersDataToShow }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionContainer>
      <TableSectionContainer>
        <SectionContainerShadow>
          <AccordionTitle>{strollersDataToShow.title}</AccordionTitle>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ExpandMore fontSize="large" />
            ) : (
              <ExpandLess fontSize="large" />
            )}
          </IconButton>
        </SectionContainerShadow>
      </TableSectionContainer>
      <Collapse in={isOpen}>
        {strollersDataToShow.rows &&
          strollersDataToShow.rows.map((row) => (
            <StyledTableRow key={row.key}>
              <TableSectionContainer>
                <Section>
                  <StyledTableRowTitle>{row.title}</StyledTableRowTitle>
                  {row.values.map((cell, index) => (
                    <StyledTableCellContainer key={index}>
                      {cell}
                    </StyledTableCellContainer>
                  ))}
                </Section>
              </TableSectionContainer>
            </StyledTableRow>
          ))}
      </Collapse>
    </AccordionContainer>
  );
};
