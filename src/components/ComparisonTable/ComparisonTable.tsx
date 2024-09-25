import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DeleteOutline } from "@mui/icons-material";
import { allStrollers } from "../../data/allStrollers";
// import { AccordionTable } from "../AccordionTable/AccordionTable";

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

type Props = {
  strollersIdsToCompare: number[];
  handleDeleteStrollerIdFromCompare: (strollerId: number) => void;
};

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

  //prepare data for accordion
  //from this format: [
  //     {group: {key: "basics", title: "the basics"}, fields: [{key, title, value}, {key, title, value}]}
  // ]

  // final result ==>>>
  //[
  //  {
  // rowTitle: {}
  // rows: [{ "stroller weight", "7.9", "8.9", "20"},{ "stroller weight", "7.9", "8.9", "20"},]
  //  },
  //
  //]

  console.log("strollersDataToShow", strollersDataToShow);

  const modifyStrollersDataForAccordions = (ids: number[]) => {
    let filteredData = ids.map((id) =>
      allStrollers.find((stroller) => stroller.id === id)
    );

    return filteredData;
  };

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

      {/* sx={{ marginTop: "20px" }} */}

      {/* {strollersDataToShow.length > 0 && <AccordionTable />} */}
    </ComparisonContainer>
  );
};
