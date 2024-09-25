import { Box, Collapse, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DeleteOutline, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { allStrollers } from "../../data/allStrollers";

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

const StyledTableFirstHeadCell = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  flexGrow: 0,
  flexShrink: 0,
  paddingRight: 4,
  paddingLeft: 4,
  flexBasis: "25%",
  maxWidth: "25%",
  [theme.breakpoints.up("lg")]: {
    display: "block",
  },
}));

const StyledTableFirstHeadCellTitleContainer = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
  minHeight: 50,
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

const StyledTableCell = styled("div")(({ theme }) => ({
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
    paddingTop: 32,
    paddingBottom: 32,
    paddingRight: 8,
    paddingLeft: 8,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "33%",
    maxWidth: "33%",
  },
}));

const StyledCardContent = styled("div")(() => ({
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
}));

const StyledProductName = styled(Typography)(() => ({
  margin: 0,
  float: "left",
}));

const StyledProductDeleteIcon = styled(IconButton)(() => ({
  padding: 0,
  float: "right",
}));

const ComparisonContainer = styled(Box)(() => ({}));

const ComparisonStickyHeader = styled(Box)(() => ({
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
}));

const SectionContainer = styled(Box)(({ theme }) => ({
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
}));

const SectionContainerShadow = styled("div")(() => ({
  display: "flex",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
  justifyContent: "space-between",
  height: "60px",
  alignItems: "center",
  width: "100%",
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

const StyledTableRowWrapContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexBasis: "100%",
  flexWrap: "nowrap",

  [theme.breakpoints.up("lg")]: {
    flexBasis: "75%",
    maxWidth: "75%",
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("md")]: {
    marginBottom: 16,
  },
}));

const Image = styled("img")(() => ({
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

const Figure = styled("figure")(() => ({
  backgroundSize: "contain",
  objectFit: "contain",
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  margin: 0,
}));

const Product = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const ProductContainer = styled("div")(({ theme }) => ({
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
}));

const ProductName = styled("div")(() => ({
  marginBottom: 16,
  marginTop: 8,
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 700,
}));

const ProductNameText = styled("h3")(() => ({
  margin: 0,
  fontSize: 18,
}));

const ProductDescription = styled("div")(({ theme }) => ({
  height: 54,
  paddingLeft: 24,
  marginBottom: 16,
  [theme.breakpoints.up("md")]: {
    marginBottom: 24,
  },
}));

const ProductDescriptionList = styled("ul")(() => ({
  margin: 0,
  padding: 0,
  paddingBottom: 4,
  borderBottom: "1px solid #e5e5e5",
}));

const ProductDescriptionListItem = styled("li")(() => ({
  margin: 0,
  padding: 0,
}));

const AccordionContainer = styled("div")(() => ({
  paddingTop: 20,
}));

const AccordionTitle = styled("h2")(() => ({
  fontSize: `calc(20px + 4*(100vw - 480px) / 760)`,
}));

type Props = {
  strollersIdsToCompare: number[];
  handleDeleteStrollerIdFromCompare: (strollerId: number) => void;
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const ComparisonTable: React.FC<Props> = ({
  strollersIdsToCompare,
  handleDeleteStrollerIdFromCompare,
}) => {
  const getStrollersDataToShow = (ids: number[]) => {
    const dataToShow = ids.map((id) =>
      allStrollers.find((stroller) => stroller.id === id)
    );

    return dataToShow;
  };

  const strollersDataToShow = getStrollersDataToShow(strollersIdsToCompare);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <ComparisonContainer>
      <ComparisonStickyHeader>
        <SectionContainer>
          <Section sx={{ flexWrap: "nowrap" }}>
            <StyledTableFirstHeadCell>
              <StyledTableFirstHeadCellTitleContainer>
                <Typography component="h2" sx={{ fontWeight: 500 }}>
                  Strollers
                </Typography>
              </StyledTableFirstHeadCellTitleContainer>
            </StyledTableFirstHeadCell>
            {strollersDataToShow.map((stroller) => {
              return (
                <StyledTableCellContainer>
                  <StyledCardContent>
                    <StyledProductName>{`${stroller?.brand} ${stroller?.modelName}`}</StyledProductName>
                    <StyledProductDeleteIcon
                      size="small"
                      onClick={() =>
                        handleDeleteStrollerIdFromCompare(stroller!.id)
                      }
                    >
                      <DeleteOutline fontSize="small" />
                    </StyledProductDeleteIcon>
                  </StyledCardContent>
                </StyledTableCellContainer>
              );
            })}
          </Section>
        </SectionContainer>
      </ComparisonStickyHeader>
      <SectionContainer>
        <Section sx={{ flexWrap: "nowrap" }}>
          {strollersDataToShow.map((stroller) => {
            return (
              <ProductContainer>
                <Product>
                  <ImageContainer>
                    <Figure>
                      <Image
                        alt={`${stroller?.brand} ${stroller?.modelName} stroller`}
                        src={stroller?.imagePath}
                      />
                    </Figure>
                  </ImageContainer>
                  <ProductName>
                    <ProductNameText>{stroller?.modelName}</ProductNameText>
                  </ProductName>
                  <ProductDescription>
                    <ProductDescriptionList>
                      <ProductDescriptionListItem>
                        The most comfortable city pram with an innovative
                        compact fold
                      </ProductDescriptionListItem>
                    </ProductDescriptionList>
                  </ProductDescription>
                </Product>
              </ProductContainer>
            );
          })}
        </Section>
      </SectionContainer>

      <AccordionContainer sx={{ marginTop: "20px" }}>
        <SectionContainer
          display="flex"
          justifyContent="space-between"
          height="60px"
          alignItems="center"
        >
          <SectionContainerShadow>
            <AccordionTitle>The Basics</AccordionTitle>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {!isOpen ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </SectionContainerShadow>
        </SectionContainer>
        <Collapse in={!!isOpen}>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <SectionContainer>
                <Section sx={{ "&&": { padding: "0px" } }}>
                  <StyledTableRowTitle sx={{ fontWeight: 600 }}>
                    {row.name}
                  </StyledTableRowTitle>
                  <StyledTableRowWrapContent>
                    <StyledTableCell>{row.calories}</StyledTableCell>
                    <StyledTableCell>{row.fat}</StyledTableCell>
                    <StyledTableCell>{row.carbs}</StyledTableCell>
                  </StyledTableRowWrapContent>
                </Section>
              </SectionContainer>
            </StyledTableRow>
          ))}
        </Collapse>
      </AccordionContainer>

      <AccordionContainer>
        <SectionContainer
          display="flex"
          justifyContent="space-between"
          height="60px"
          alignItems="center"
        >
          <SectionContainerShadow>
            <AccordionTitle>The Seat</AccordionTitle>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </SectionContainerShadow>
        </SectionContainer>
        <Collapse>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <SectionContainer>
                <Section>
                  <StyledTableRowTitle sx={{ fontWeight: 600 }}>
                    {row.name}
                  </StyledTableRowTitle>
                  <StyledTableCellContainer>
                    {row.calories}
                  </StyledTableCellContainer>
                  <StyledTableCellContainer>{row.fat}</StyledTableCellContainer>
                  <StyledTableCellContainer>
                    {row.carbs}
                  </StyledTableCellContainer>
                </Section>
              </SectionContainer>
            </StyledTableRow>
          ))}
        </Collapse>
      </AccordionContainer>
    </ComparisonContainer>
  );
};
