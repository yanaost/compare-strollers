"use client";

import styled from "@emotion/styled";
import { color } from "../../styles/tokens";

// Matches the prose link treatment in TextPage's Article, so the way out of a
// dead end looks like every other link on the site.
export const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 18px;

  a {
    color: ${color.accent};
    font-weight: 600;
    border-bottom: 1.5px solid #e7c3b4;
  }
`;
