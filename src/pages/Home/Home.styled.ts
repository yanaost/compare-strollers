import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { color, layout, radius, shadow } from "../../styles/tokens";

export const Hero = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
  align-items: stretch;
`;

export const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
  padding: clamp(40px, 6vw, 96px) ${layout.pagePadding};
  position: relative;
  z-index: 2;
`;

export const Eyebrow = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  font-weight: 800;
  font-size: clamp(48px, 5.6vw, 92px);
  line-height: 0.98;
  letter-spacing: -0.045em;
  margin: 0;
  text-wrap: balance;

  em {
    font-style: italic;
    font-weight: 800;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(17px, 1.4vw, 20px);
  line-height: 1.5;
  color: ${color.bodyMuted};
  margin: 0;
  max-width: 30ch;
`;

export const HeroImageSlot = styled.div`
  position: relative;
  min-height: clamp(440px, 52vw, 720px);
  overflow: hidden;
`;

export const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right 70%;
`;

export const HeroFade = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: 38%;
  background: linear-gradient(
    90deg,
    ${color.bg} 0%,
    rgba(244, 241, 236, 0.7) 35%,
    rgba(244, 241, 236, 0) 100%
  );
`;

export const TrustBand = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 170px), 1fr));
  row-gap: 24px;
  background: ${color.band};
  padding: 44px ${layout.pagePadding};
`;

export const TrustItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 8px 20px;
  border-left: 1px solid ${color.dividerStrong};

  svg {
    margin-bottom: 8px;
  }
`;

export const TrustTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export const TrustNote = styled.span`
  font-size: 14px;
  color: ${color.secondary};
`;

export const HowSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 32px 48px;
  align-items: center;
  padding: clamp(48px, 5vw, 72px) ${layout.pagePadding};
`;

export const HowHeading = styled.h2`
  font-weight: 800;
  font-size: clamp(32px, 3vw, 44px);
  letter-spacing: -0.04em;
  margin: 0;
  flex: none;
`;

export const Steps = styled.div`
  flex: 1 1 520px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 24px 32px;
`;

export const Step = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const StepNumber = styled.span`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid ${color.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
`;

export const StepBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 2px;
`;

export const StepTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const StepNote = styled.span`
  font-size: 14px;
  color: ${color.secondary};
`;

export const PopularSection = styled.section`
  padding: ${layout.sectionPadding} ${layout.pagePadding};
`;

export const PopularHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

export const PopularHeading = styled.h2`
  font-weight: 800;
  font-size: clamp(32px, 3.4vw, 52px);
  letter-spacing: -0.045em;
  margin: 0;
`;

export const PopularNote = styled.span`
  font-size: 15px;
  color: ${color.secondary};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 16px;
`;

export const Card = styled(Link)`
  color: ${color.ink};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  min-height: 220px;
  text-align: left;
  background: ${color.surface};
  border-radius: ${radius.card};
  padding: 28px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    color: ${color.ink};
    transform: translateY(-4px);
    box-shadow: ${shadow.cardHover};
  }
`;

export const CardTag = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${color.accent};
`;

export const CardTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.1;

  em {
    font-style: italic;
    font-weight: 600;
    color: ${color.tertiaryLight};
  }
`;

export const CardNote = styled.span`
  font-size: 14px;
  color: ${color.secondary};
  line-height: 1.45;
`;
