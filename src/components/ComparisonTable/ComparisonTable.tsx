import { DeleteOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { AccordionTable } from "../AccordionTable/AccordionTable";
import {
  ScrollContainer,
  ComparisonContainer,
  ComparisonStickyHeader,
  SectionContainerHeader,
  Section,
  StyledTableFirstHeadCell,
  StyledTableFirstHeadCellTitleContainer,
  StyledTableCellContainer,
  StyledCardContent,
  StyledProductName,
  StyledProductDeleteIcon,
  SectionContainer,
  ProductContainer,
  Product,
  Image,
  ImageContainer,
  Figure,
  ProductName,
  ProductNameText,
  ProductDescription,
  ProductDescriptionList,
  ProductDescriptionListItem,
} from "./ComparisonTable.styled";
import { useStrollerComparison } from "./hooks/useStrollerComparison";
import { useContext } from "react";
import { strollersContext } from "../../context/context";

export const ComparisonTable: React.FC = () => {
  const { strollersIdsToCompare, handleDeleteStrollerIdFromCompare } =
    useContext(strollersContext);

  const { strollerData, accordionData, loading, error } = useStrollerComparison(
    strollersIdsToCompare
  );

  const numberOfStrollersToCompare = strollersIdsToCompare.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ScrollContainer>
      <ComparisonContainer>
        <ComparisonStickyHeader
          $numberOfStrollersToCompare={numberOfStrollersToCompare}
        >
          <SectionContainerHeader
            $numberOfStrollersToCompare={numberOfStrollersToCompare}
          >
            <Section sx={{ flexWrap: "nowrap" }}>
              <StyledTableFirstHeadCell>
                <StyledTableFirstHeadCellTitleContainer>
                  <Typography
                    component="h2"
                    sx={{ fontWeight: 500, fontSize: "1.5rem" }}
                  >
                    Strollers
                  </Typography>
                </StyledTableFirstHeadCellTitleContainer>
              </StyledTableFirstHeadCell>
              {strollerData.map((stroller) => {
                return (
                  <StyledTableCellContainer key={stroller?.strollerId}>
                    <StyledCardContent>
                      <StyledProductName>{stroller?.modelName}</StyledProductName>
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
          </SectionContainerHeader>
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
                          alt={`${stroller?.modelName} stroller`}
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
                          {stroller?.modelDescription}
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
                numberOfStrollersToCompare={numberOfStrollersToCompare}
              />
            );
          })}
      </ComparisonContainer>
    </ScrollContainer>
  );
};
