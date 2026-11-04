import styled from "@emotion/styled";
import { color, radius, shadow } from "../../styles/tokens";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;

  /* The field needs ~200px to stay usable, which the logo will not leave it on
     a phone — below this width it takes a line of its own. */
  @media (max-width: 767px) {
    flex-basis: 100%;
    justify-content: flex-start;
  }
`;

export const SearchBox = styled.div`
  position: relative;
  min-width: 0;

  /* On its own line it may as well take the whole of it. */
  @media (max-width: 767px) {
    flex: 1;
  }
`;

export const Pill = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $disabled }) => ($disabled ? color.bg : color.surface)};
  border: 1.5px solid
    ${({ $disabled }) => ($disabled ? color.divider : color.dividerStrong)};
  border-radius: ${radius.pill};
  padding: 8px 16px;
  width: clamp(200px, 26vw, 300px);
  box-sizing: border-box;
  color: ${({ $disabled }) => ($disabled ? color.tertiaryLight : color.ink)};

  &:focus-within {
    border-color: ${({ $disabled }) =>
      $disabled ? color.divider : color.ink};
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 15px;
  padding: 6px 0;
  color: inherit;
  text-overflow: ellipsis;

  &::placeholder {
    color: ${color.tertiaryLight};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

// Right-aligned under the input it belongs to, but clamped so it never runs
// off the viewport on a phone.
export const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: min(320px, calc(100vw - 32px));
  background: ${color.surface};
  border-radius: ${radius.dropdown};
  padding: 8px;
  box-shadow: ${shadow.dropdown};
  display: flex;
  flex-direction: column;
  max-height: 320px;
  overflow-y: auto;
  z-index: 30;

  @media (max-width: 767px) {
    left: 0;
    right: auto;
  }
`;

export const Result = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 12px;
  padding: 11px 14px;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  color: ${color.ink};

  &:hover {
    background: ${color.bg};
  }
`;

export const ResultBrand = styled.span`
  font-size: 13px;
  color: ${color.secondary};
  flex: none;
`;

export const Empty = styled.span`
  padding: 12px 14px;
  font-size: 14px;
  color: ${color.secondary};
`;
