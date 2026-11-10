export { TextPage } from "./TextPage";
export type { TextSection } from "./TextPage";

// The intro band, for pages that want the template's header and type but not
// its contents rail — a 404 has nothing to list.
export { Eyebrow, Intro, IntroCopy, Lede, Title } from "./TextPage.styled";

// Article building blocks, for the prose each page passes as children.
export {
  Attribution,
  Bullet,
  Caption,
  Figure,
  FigureSlot,
  List,
  ListItem,
  Quote,
  SectionHeading,
} from "./TextPage.styled";
