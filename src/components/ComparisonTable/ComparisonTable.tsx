import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DeleteOutline } from "@mui/icons-material";
import { AccordionTable } from "../AccordionTable/AccordionTable";
import { useEffect, useState } from "react";
import { StrollersFeatures } from "../../types/StrollersFeatures";
import { AccordionsData } from "../../types/AccordionData";

const StyledTableFirstHeadCell = styled(Box, {
  label: "StyledTableFirstHeadCell",
})(({ theme }) => ({
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

const StyledTableFirstHeadCellTitleContainer = styled(Box, {
  label: "StyledTableFirstHeadCellTitleContainer",
})(() => ({
  alignItems: "center",
  display: "flex",
  minHeight: 50,
}));

const StyledTableCellContainer = styled("div", {
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

const StyledCardContent = styled("div", { label: "StyledCardContent" })(() => ({
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

const StyledProductName = styled(Typography, { label: "StyledProductName" })(
  () => ({
    margin: 0,
    float: "left",
  })
);

const StyledProductDeleteIcon = styled(IconButton, {
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

const ComparisonContainer = styled("div", { label: "ComparisonContainer" })(
  () => ({})
);

const ComparisonStickyHeader = styled(Box, { label: "ComparisonStickyHeader" })(
  () => ({
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
  })
);

const ComparisonStickyHeaderWhenScrollContainer = styled("div", {
  label: "ComparisonStickyHeaderWhenScrollContainer",
})(() => ({
  position: "absolute",
  left: 0,
  right: 0,
}));

const ComparisonStickyHeaderWhenScroll = styled("div", {
  label: "ComparisonStickyHeaderWhenScroll",
})(() => ({
  paddingBottom: 24,
  position: "sticky",
  top: "0",
  zIndex: 100,
  width: "100%",
  backgroundColor: "white",
  boxShadow: "0 4px 12px 0 #b3b3b3",
  animationName: "sticky-header-animation-removing-top",
  animationDuration: "250ms",
  animationFillMode: "forwards",
  transition: "opacity .2s ease, transform .2s ease",
}));

const SectionContainer = styled(Box, { label: "SectionContainer" })(
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

const Section = styled("section", { label: "Section" })(({ theme }) => ({
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

const ImageContainer = styled("div", { label: "ImageContainer" })(
  ({ theme }) => ({
    position: "relative",
    [theme.breakpoints.up("md")]: {
      marginBottom: 16,
    },
  })
);

const Image = styled("img", { label: "Image" })(() => ({
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

const Figure = styled("figure", { label: "Figure" })(() => ({
  backgroundSize: "contain",
  objectFit: "contain",
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  margin: 0,
}));

const Product = styled("div", { label: "Product" })(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const ProductContainer = styled("div", { label: "ProductContainer" })(
  ({ theme }) => ({
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: 4,
    paddingLeft: 4,
    flexBasis: "50%",
    maxWidth: "50%",
    // width: 275,

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
      // width: 275,
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

const ProductName = styled("div", { label: "ProductName" })(() => ({
  marginBottom: 16,
  marginTop: 16,
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 700,
}));

const ProductNameText = styled("h3", { label: "ProductNameText" })(() => ({
  margin: 0,
  fontSize: 18,
}));

const ProductDescription = styled("div", { label: "ProductDescription" })(
  ({ theme }) => ({
    height: 54,
    paddingLeft: 24,
    marginBottom: 16,
    [theme.breakpoints.up("md")]: {
      marginBottom: 24,
    },
  })
);

const ProductDescriptionList = styled("ul", {
  label: "ProductDescriptionList",
})(() => ({
  margin: 0,
  padding: 0,
  paddingBottom: 24,
  borderBottom: "1px solid #e5e5e5",
}));

const ProductDescriptionListItem = styled("li", {
  label: "ProductDescriptionListItem",
})(() => ({
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
  const [strollerData, setStrollerData] = useState<StrollersFeatures[]>([]);
  const [accordionData, setAccordionData] = useState<AccordionsData[]>([]);

  const fetchStrollersData = async (selectedIds: number[]) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/strollers/comparison-data?ids=${selectedIds.join(
          ","
        )}`
      );
      const data: StrollersFeatures[] = await response.json();
      // Update your state with the fetched data
      setStrollerData(data);
    } catch (error) {
      console.error("Error fetching stroller data:", error);
    }
  };

  // Call this function whenever selectedIds changes
  useEffect(() => {
    if (strollersIdsToCompare.length > 0) {
      fetchStrollersData(strollersIdsToCompare);
    }
  }, [strollersIdsToCompare]);

  const modifyStrollersDataForAccordions = (ids: number[]) => {
    const filteredData = ids.map((id) =>
      strollerData.find((stroller) => stroller.strollerId === id)
    );

    const accordionsData: AccordionsData[] = [];
    const accordionGroupKeys: string[] = [];

    // check for empty array
    strollerData.forEach((stroller, index) => {
      stroller!.groups.forEach((group) => {
        if (index === 0 || !accordionGroupKeys.includes(group.group.key)) {
          accordionsData.push(group.group);
          accordionGroupKeys.push(group.group.key);
        }
      });
    });

    accordionsData.forEach((accordionGroup) => {
      accordionGroup.rows = [];

      filteredData.forEach((stroller, strollerIndex) => {
        const currentStrollerGroup = stroller!.groups.find(
          (strollerGroup) => strollerGroup.group.key === accordionGroup.key
        );

        currentStrollerGroup?.fields.forEach((field) => {
          const existingRow = accordionGroup.rows!.find(
            (row) => row.key === field.key
          );

          if (existingRow) {
            if (existingRow.values.length < strollerIndex) {
              const missingValuesArray = new Array(
                strollerIndex - existingRow.values.length
              ).fill("");
              existingRow.values.push(...missingValuesArray);
            }

            existingRow.values.push(field.value);
          } else {
            const valuesArray = new Array(strollerIndex).fill("");
            valuesArray.push(field.value);

            accordionGroup.rows!.push({
              title: field.title,
              key: field.key,
              values: valuesArray,
            });
          }
        });
      });
    });

    console.log("accordionsData", accordionsData);

    return accordionsData;
  };

  useEffect(() => {
    if (strollerData.length > 0) {
      const accordionData = modifyStrollersDataForAccordions(
        strollersIdsToCompare
      );
      setAccordionData(accordionData);
    }
  }, [strollerData]);

  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrollEnabled(window.scrollY > 350);
    });
  }, []);

  return (
    <>
      <ComparisonStickyHeaderWhenScrollContainer
        sx={{
          top: isScrollEnabled ? -878 : 0,
          bottom: isScrollEnabled ? 0 : "none",
        }}
      >
        <ComparisonStickyHeaderWhenScroll
          sx={{
            opacity: isScrollEnabled ? 1 : 0,
            transform: isScrollEnabled ? `translateY(0)` : `translateY(-300%)`,
          }}
        >
          <SectionContainer>
            <Section sx={{ flexWrap: "nowrap" }}>
              <StyledTableFirstHeadCell>
                <StyledTableFirstHeadCellTitleContainer>
                  <Typography component="h2" sx={{ fontWeight: 500 }}>
                    Strollers
                  </Typography>
                </StyledTableFirstHeadCellTitleContainer>
              </StyledTableFirstHeadCell>
              {strollerData.map((stroller) => {
                return (
                  <StyledTableCellContainer key={stroller?.strollerId}>
                    <StyledCardContent>
                      <StyledProductName>{`${stroller?.brand} ${stroller?.modelName}`}</StyledProductName>
                      <StyledProductDeleteIcon
                        size="small"
                        onClick={() =>
                          handleDeleteStrollerIdFromCompare(
                            stroller!.strollerId
                          )
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
        </ComparisonStickyHeaderWhenScroll>
      </ComparisonStickyHeaderWhenScrollContainer>

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
              {strollerData.map((stroller) => {
                return (
                  <StyledTableCellContainer key={stroller?.strollerId}>
                    <StyledCardContent>
                      <StyledProductName>{`${stroller?.brand} ${stroller?.modelName}`}</StyledProductName>
                      <StyledProductDeleteIcon
                        size="small"
                        onClick={() =>
                          handleDeleteStrollerIdFromCompare(
                            stroller!.strollerId
                          )
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

        <SectionContainer sx={{ marginBottom: "32px" }}>
          <Section sx={{ flexWrap: "nowrap" }}>
            {strollerData.map((stroller) => {
              return (
                <ProductContainer key={stroller?.strollerId}>
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

        {accordionData.length > 0 &&
          accordionData.map((accordionData) => {
            return (
              <AccordionTable
                key={accordionData.key}
                strollersDataToShow={accordionData}
              />
            );
          })}
      </ComparisonContainer>
    </>
  );
};
