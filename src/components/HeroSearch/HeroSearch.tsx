import styled from "@emotion/styled";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StrollerSummary,
  comparePath,
  searchStrollers,
} from "../../features/strollers/useStrollers";
import { color, radius, shadow } from "../../styles/tokens";

const Wrapper = styled.div`
  position: relative;
  max-width: 440px;
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${color.surface};
  border-radius: ${radius.pill};
  padding: 8px 8px 8px 24px;
  box-shadow: ${shadow.search};
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 16px;
  padding: 12px 0;
  color: ${color.ink};

  &::placeholder {
    color: ${color.tertiaryLight};
  }
`;

const GoButton = styled.button`
  width: 52px;
  height: 52px;
  flex: none;
  border-radius: 50%;
  border: 0;
  background: ${color.ink};
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background 0.2s ease;

  &:hover {
    background: ${color.accent};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  background: ${color.surface};
  border-radius: ${radius.dropdown};
  padding: 8px;
  box-shadow: ${shadow.dropdown};
  display: flex;
  flex-direction: column;
  z-index: 5;
`;

const Result = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  color: ${color.ink};

  &:hover {
    background: ${color.bg};
  }
`;

const Empty = styled.span`
  padding: 12px 16px;
  font-size: 14px;
  color: ${color.secondary};
`;

type Props = {
  strollers: StrollerSummary[];
};

export const HeroSearch: React.FC<Props> = ({ strollers }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const blurTimer = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchStrollers(strollers, query);

  // The first pick hands straight off to the comparison page, which carries
  // its own search for adding the second and third.
  const pick = (stroller: StrollerSummary) =>
    navigate(comparePath(stroller.strollerId));

  // Enter and the arrow both take the top result, so neither ever feels dead.
  const submit = () => {
    if (results[0]) {
      pick(results[0]);
      return;
    }
    inputRef.current?.focus();
    setFocused(true);
  };

  return (
    <Wrapper>
      <Pill>
        <Search size={20} strokeWidth={2} style={{ opacity: 0.7 }} aria-hidden />

        <Input
          ref={inputRef}
          value={query}
          placeholder="Type a stroller or a brand name"
          aria-label="Search strollers by model or brand"
          onChange={(e) => {
            setQuery(e.target.value);
            setFocused(true);
          }}
          onFocus={() => {
            window.clearTimeout(blurTimer.current);
            setFocused(true);
          }}
          onBlur={() => {
            blurTimer.current = window.setTimeout(() => setFocused(false), 120);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />

        <GoButton
          onMouseDown={(e) => e.preventDefault()}
          onClick={submit}
          aria-label="Search"
        >
          →
        </GoButton>
      </Pill>

      {focused && (
        <Dropdown>
          {results.map((stroller) => (
            <Result
              key={stroller.strollerId}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(stroller);
              }}
            >
              <span style={{ fontWeight: 600 }}>{stroller.modelName}</span>
              <span style={{ fontSize: 13, color: color.secondary }}>
                {stroller.brand}
              </span>
            </Result>
          ))}
          {results.length === 0 && (
            <Empty>No strollers match “{query}”.</Empty>
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
};
