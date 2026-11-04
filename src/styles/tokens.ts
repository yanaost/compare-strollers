export const color = {
  bg: "#F4F1EC",
  band: "#EDE9E2",
  surface: "#FFFFFF",

  ink: "#16181A",
  bodyMuted: "#55524D",
  secondary: "#6B665F",
  tertiary: "#8A847C",
  tertiaryLight: "#9A948C",

  accent: "#A84E2E",
  accentTint: "#F6E7E0",
  accentOnDark: "#D98A6A",

  divider: "#ECE7E0",
  dividerStrong: "#DAD4CA",
  dividerSoft: "#E4DED5",

  barTrack: "#EFEAE3",
  barNeutral: "#C9C3BA",
  losing: "#A39D95",

  footerBg: "#16181A",
  footerText: "#F4F1EC",
  footerMuted: "#A7A29B",
  footerRule: "#33363A",
} as const;

export const font = {
  family: "'Plus Jakarta Sans', sans-serif",
} as const;

export const layout = {
  pagePadding: "clamp(20px, 4.5vw, 72px)",
  sectionPadding: "clamp(48px, 6vw, 96px)",
} as const;

export const radius = {
  pill: "999px",
  card: "24px",
  image: "20px",
  select: "14px",
  dropdown: "20px",
} as const;

export const shadow = {
  search:
    "0 1px 0 rgba(22,24,26,.06), 0 12px 32px -12px rgba(22,24,26,.18)",
  cardHover: "0 20px 40px -20px rgba(22,24,26,.25)",
  dropdown: "0 20px 48px -16px rgba(22,24,26,.25)",
} as const;
