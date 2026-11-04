import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StrollerSummary,
  comparePath,
  searchStrollers,
} from "../../features/strollers/useStrollers";
import {
  Dropdown,
  Empty,
  Input,
  Pill,
  Result,
  ResultBrand,
  SearchBox,
  Wrapper,
} from "./CompareSearch.styled";

export const MAX_STROLLERS = 3;

type Props = {
  /** Currently compared ids, in column order — the URL is the source of truth. */
  ids: number[];
  strollers: StrollerSummary[];
};

export const CompareSearch: React.FC<Props> = ({ ids, strollers }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const blurTimer = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const full = ids.length >= MAX_STROLLERS;

  const results = searchStrollers(strollers, query).filter(
    (s) => !ids.includes(s.strollerId)
  );

  const add = (stroller: StrollerSummary) => {
    if (full) return;
    setQuery("");
    navigate(comparePath(...ids, stroller.strollerId));
    inputRef.current?.focus();
  };

  const submit = () => {
    if (results[0]) add(results[0]);
  };

  return (
    <Wrapper>
      <SearchBox>
        {/* At three strollers the field greys out rather than disappearing, so
            the header keeps its shape and the limit is visible, not announced. */}
        <Pill $disabled={full}>
          <Search
            size={17}
            strokeWidth={2}
            style={{ opacity: 0.6, flex: "none" }}
            aria-hidden
          />
          <Input
            ref={inputRef}
            value={query}
            disabled={full}
            placeholder={
              full ? "Remove one to swap" : "Type a stroller or a brand name"
            }
            aria-label="Add a stroller to the comparison"
            onChange={(e) => {
              setQuery(e.target.value);
              setFocused(true);
            }}
            onFocus={() => {
              window.clearTimeout(blurTimer.current);
              setFocused(true);
            }}
            onBlur={() => {
              blurTimer.current = window.setTimeout(
                () => setFocused(false),
                120
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") setFocused(false);
            }}
          />
        </Pill>

        {focused && !full && (
          <Dropdown>
            {results.map((stroller) => (
              <Result
                key={stroller.strollerId}
                onMouseDown={(e) => {
                  e.preventDefault();
                  add(stroller);
                }}
              >
                <span style={{ fontWeight: 600 }}>{stroller.modelName}</span>
                <ResultBrand>{stroller.brand}</ResultBrand>
              </Result>
            ))}
            {results.length === 0 && (
              <Empty>
                {query
                  ? `No strollers match “${query}”.`
                  : "That's every stroller we have."}
              </Empty>
            )}
          </Dropdown>
        )}
      </SearchBox>
    </Wrapper>
  );
};
