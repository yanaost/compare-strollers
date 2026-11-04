import styled from "@emotion/styled";
import { Baby } from "lucide-react";
import { Link } from "react-router-dom";
import { color, layout } from "../../styles/tokens";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 22px ${layout.pagePadding};

  /* The compare page puts a search and its chips in the right-hand slot; on a
     phone that needs its own line rather than a squeezed share of this one. */
  @media (max-width: 767px) {
    flex-wrap: wrap;
    gap: 14px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  letter-spacing: -0.03em;
  line-height: 1;
  color: ${color.ink};
  text-decoration: none;

  &:hover {
    color: ${color.accent};
  }
`;

type Props = {
  /** Optional right-hand slot — the comparison page fills it with its search. */
  children?: React.ReactNode;
};

export const SiteHeader: React.FC<Props> = ({ children }) => (
  <Header>
    <Logo to="/">
      <Baby size={26} strokeWidth={1.75} aria-hidden />
      <span>
        <b style={{ fontWeight: 800 }}>Compare</b>
        <span style={{ fontWeight: 400 }}>Strollers</span>
      </span>
    </Logo>
    {children}
  </Header>
);
