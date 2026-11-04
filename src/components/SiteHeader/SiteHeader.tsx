import styled from "@emotion/styled";
import { Baby } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;
  flex: none;
`;

// Link is a component, not a tag, so Emotion would hand it the styling prop and
// it would land on the anchor as an attribute.
const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active: boolean }>`
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) => ($active ? color.ink : color.secondary)};
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: ${color.accent};
  }
`;

const PAGES = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

type Props = {
  /** Optional right-hand slot — the comparison page fills it with its search. */
  children?: React.ReactNode;
};

export const SiteHeader: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Header>
      <Logo to="/">
        <Baby size={26} strokeWidth={1.75} aria-hidden />
        <span>
          <b style={{ fontWeight: 800 }}>Compare</b>
          <span style={{ fontWeight: 400 }}>Strollers</span>
        </span>
      </Logo>

      {/* Every page the site has, one click from every other one — the footer
          alone meant scrolling a whole comparison to reach them. */}
      <Nav aria-label="Pages">
        {PAGES.map((page) => (
          <NavLink
            key={page.to}
            to={page.to}
            $active={pathname === page.to}
            aria-current={pathname === page.to ? "page" : undefined}
          >
            {page.label}
          </NavLink>
        ))}
      </Nav>

      {children}
    </Header>
  );
};
