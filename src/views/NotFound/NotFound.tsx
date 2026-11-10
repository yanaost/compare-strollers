import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { Eyebrow, Intro, IntroCopy, Lede, Title } from "../../components/TextPage";
import { Links } from "./NotFound.styled";

/**
 * The 404 body.
 *
 * Built from the text-page template's intro band rather than TextPage itself:
 * that component's sticky contents rail wants sections to list, and a 404 has
 * none. Header, footer and type still come from the shared components, so this
 * stays in step with /about and /contact.
 *
 * Only ever means "this path is not a page". A selection with no published
 * comparison goes to /compare?ids=…, which is a real route, so this never has
 * to explain stroller selection.
 */
export const NotFound = () => (
  <>
    <SiteHeader />

    <Intro>
      <IntroCopy>
        <Eyebrow>404</Eyebrow>
        <Title>
          That page <em>took a wrong turn.</em>
        </Title>
        <Lede>
          The link may be out of date, or the comparison may never have been
          published. Everything we do compare is a click away.
        </Lede>
        <Links aria-label="Ways back">
          <Link href="/">Back to the home page</Link>
          <Link href="/#popular">Popular comparisons</Link>
        </Links>
      </IntroCopy>
    </Intro>

    <SiteFooter ctaLabel="Start comparing →" ctaTo="/" />
  </>
);
