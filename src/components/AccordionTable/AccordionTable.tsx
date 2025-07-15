import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { AccordionsData } from "../../types/AccordionData";
import {
  AccordionContainer,
  TableSectionContainer,
  SectionContainerShadow,
  AccordionTitle,
  StyledIconButton,
  CollapseSection,
  StyledTableRow,
  Section,
  StyledTableRowTitle,
  StyledTableCellsContainer,
  StyledTableCellContainer,
} from "./AccordionTable.styled";

type Props = {
  strollersDataToShow: AccordionsData;
  numberOfStrollersToCompare: number;
};

export const AccordionTable: React.FC<Props> = ({
  strollersDataToShow,
  numberOfStrollersToCompare,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionContainer>
      <TableSectionContainer>
        <SectionContainerShadow>
          <AccordionTitle>{strollersDataToShow.title}</AccordionTitle>
          <StyledIconButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ExpandMore /> : <ExpandLess />}
          </StyledIconButton>
        </SectionContainerShadow>
      </TableSectionContainer>
      <Collapse in={isOpen}>
        <CollapseSection
          $numberOfStrollersToCompare={numberOfStrollersToCompare}
        >
          {strollersDataToShow.rows &&
            strollersDataToShow.rows.map((row) => (
              <StyledTableRow key={row.key}>
                <TableSectionContainer>
                  <Section>
                    <StyledTableRowTitle
                      $numberOfStrollersToCompare={numberOfStrollersToCompare}
                    >
                      {row.title}
                    </StyledTableRowTitle>
                    <StyledTableCellsContainer
                      $numberOfStrollersToCompare={numberOfStrollersToCompare}
                    >
                      {row.values.map((cell, index) => (
                        <StyledTableCellContainer
                          key={index}
                          $numberOfStrollersToCompare={
                            numberOfStrollersToCompare
                          }
                        >
                          {cell}
                        </StyledTableCellContainer>
                      ))}
                    </StyledTableCellsContainer>
                  </Section>
                </TableSectionContainer>
              </StyledTableRow>
            ))}
        </CollapseSection>
      </Collapse>
    </AccordionContainer>
  );
};
