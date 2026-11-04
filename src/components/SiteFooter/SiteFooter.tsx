import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { color, layout, radius } from "../../styles/tokens";

const Footer = styled.footer`
  background: ${color.footerBg};
  color: ${color.footerText};
  padding: clamp(48px, 5vw, 72px) ${layout.pagePadding} 28px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  flex-wrap: wrap;
`;

const Headline = styled.p`
  font-weight: 800;
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1;
  letter-spacing: -0.045em;
  margin: 0;
  max-width: 14ch;

  em {
    font-style: italic;
    color: ${color.accentOnDark};
  }
`;

const Cta = styled(Link)`
  background: ${color.footerText};
  color: ${color.ink};
  border-radius: ${radius.pill};
  padding: 16px 26px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s ease;

  &:hover {
    background: ${color.accentOnDark};
    color: ${color.ink};
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 56px;
  padding-top: 20px;
  border-top: 1px solid ${color.footerRule};
  font-size: 14px;
  color: ${color.footerMuted};
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: ${color.footerMuted};
    text-decoration: none;

    &:hover {
      color: ${color.footerText};
    }
  }
`;

type Props = {
  ctaLabel: string;
  ctaTo: string;
};

export const SiteFooter: React.FC<Props> = ({ ctaLabel, ctaTo }) => (
  <Footer>
    <Top>
      <Headline>
        Better strolls <em>start here.</em>
      </Headline>
      <Cta to={ctaTo}>{ctaLabel}</Cta>
    </Top>
    <Bottom>
      <span>© {new Date().getFullYear()} CompareStrollers. No sponsored rankings.</span>
      <BottomLinks>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </BottomLinks>
    </Bottom>
  </Footer>
);
