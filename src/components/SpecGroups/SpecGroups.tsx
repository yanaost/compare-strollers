import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { AccordionsData } from "../../types/AccordionData";
import {
  Chevron,
  ExpandAllButton,
  GroupBody,
  GroupCard,
  GroupHeader,
  GroupMeta,
  GroupRows,
  GroupTitle,
  SpecLabel,
  SpecRow,
  SpecValue,
  SpecsCopy,
  SpecsEmpty,
  SpecsEyebrow,
  SpecsHeader,
  SpecsHeading,
  SpecsNote,
  SpecsSection,
} from "./SpecGroups.styled";

const EM_DASH = "—";

const cell = (values: unknown[], index: number) => {
  const value = values[index];
  return value === undefined || value === null ? "" : String(value).trim();
};

// A row counts as identical when every stroller column reads the same, with a
// missing value treated as empty rather than as its own distinct answer.
const isIdentical = (values: unknown[], columnCount: number) => {
  const first = cell(values, 0);
  for (let index = 1; index < columnCount; index += 1) {
    if (cell(values, index) !== first) return false;
  }
  return true;
};

type Props = {
  groups: AccordionsData[];
  columnCount: number;
  differencesOnly?: boolean;
};

export const SpecGroups: React.FC<Props> = ({
  groups,
  columnCount,
  differencesOnly = false,
}) => {
  const [closed, setClosed] = useState<Set<string>>(new Set());

  const totalCount = useMemo(
    () => groups.reduce((total, group) => total + (group.rows?.length ?? 0), 0),
    [groups]
  );

  const shownGroups = useMemo(() => {
    if (!differencesOnly) return groups;
    return groups
      .map((group) => ({
        ...group,
        rows: (group.rows ?? []).filter(
          (row) => !isIdentical(row.values, columnCount)
        ),
      }))
      .filter((group) => group.rows.length > 0);
  }, [groups, differencesOnly, columnCount]);

  const shownCount = useMemo(
    () =>
      shownGroups.reduce((total, group) => total + (group.rows?.length ?? 0), 0),
    [shownGroups]
  );

  const allOpen = closed.size === 0;

  const toggle = (key: string) =>
    setClosed((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const toggleAll = () =>
    setClosed(
      allOpen ? new Set(shownGroups.map((group) => group.key)) : new Set()
    );

  if (groups.length === 0) return null;

  return (
    <SpecsSection id="full-specs">
      <SpecsHeader>
        <SpecsCopy>
          <SpecsEyebrow>Every detail</SpecsEyebrow>
          <SpecsHeading>Full specifications</SpecsHeading>
          <SpecsNote>
            {differencesOnly
              ? `${shownCount} of ${totalCount} features differ — identical rows are hidden.`
              : `All ${totalCount} listed features, grouped the way manufacturers publish them.`}
          </SpecsNote>
        </SpecsCopy>
        {shownGroups.length > 0 && (
          <ExpandAllButton onClick={toggleAll}>
            {allOpen ? "Collapse all" : "Expand all"}
          </ExpandAllButton>
        )}
      </SpecsHeader>

      {shownGroups.length === 0 && (
        <SpecsEmpty>
          Identical on every listed feature. Go push them both.
        </SpecsEmpty>
      )}

      {shownGroups.map((group) => {
        const open = !closed.has(group.key);
        const rows = group.rows ?? [];

        return (
          <GroupCard key={group.key}>
            <GroupHeader onClick={() => toggle(group.key)} aria-expanded={open}>
              <GroupTitle>{group.title}</GroupTitle>
              <GroupMeta>
                {rows.length}
                <Chevron $open={open}>
                  <ChevronDown size={18} />
                </Chevron>
              </GroupMeta>
            </GroupHeader>

            <GroupBody $open={open}>
              <div>
                <GroupRows>
                  {rows.map((row) => (
                    <SpecRow key={row.key} $count={columnCount}>
                      <SpecLabel>{row.title}</SpecLabel>
                      {/* values[] is positional and may be short when a
                          stroller is missing the feature entirely. */}
                      {Array.from({ length: columnCount }, (_, index) => {
                        const value = row.values[index];
                        const empty = value === undefined || value === "";
                        return (
                          <SpecValue key={index} $muted={empty}>
                            {empty ? EM_DASH : value}
                          </SpecValue>
                        );
                      })}
                    </SpecRow>
                  ))}
                </GroupRows>
              </div>
            </GroupBody>
          </GroupCard>
        );
      })}
    </SpecsSection>
  );
};
