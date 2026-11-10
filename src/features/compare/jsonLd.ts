/**
 * schema.org markup for a comparison page.
 *
 * Runs in the page's server component, where the full spec records are already
 * loaded, so this is build-time only and costs the browser nothing beyond the
 * bytes of the emitted script.
 */
import { SITE, absoluteUrl } from "../../config/site";
import { toSpecs, type StrollerSpecs } from "./specs";
import type { StrollersFeatures } from "../../types/StrollersFeatures";

type PropertyValue = {
  "@type": "PropertyValue";
  name: string;
  value: string | number;
  unitCode?: string;
};

// UN/CEFACT codes, which is what schema.org's unitCode expects.
const KILOGRAM = "KGM";
const LITRE = "LTR";

/**
 * A spec row, or nothing.
 *
 * `toSpecs` returns null for anything it could not parse out of the string
 * feature grid, and `"value": null` fails validation — so a missing spec has to
 * drop the property rather than emit an empty one.
 */
const prop = (
  name: string,
  value: number | null,
  unitCode?: string
): PropertyValue[] =>
  value === null || !Number.isFinite(value)
    ? []
    : [{ "@type": "PropertyValue", name, value, unitCode }];

/** Same, for the rows whose value is a word rather than a number. */
const textProp = (name: string, value: string | undefined): PropertyValue[] =>
  value ? [{ "@type": "PropertyValue", name, value }] : [];

/**
 * Recline is the awkward one: "Yes, infinite recline" parses to
 * Number.POSITIVE_INFINITY, which JSON.stringify writes as `null` — the exact
 * thing the filtering above exists to prevent. Say it in a word instead.
 */
const recline = (positions: number | null): PropertyValue[] => {
  if (positions === null) return [];
  if (positions === Number.POSITIVE_INFINITY)
    return [{ "@type": "PropertyValue", name: "Recline", value: "Infinite" }];
  return [{ "@type": "PropertyValue", name: "Recline", value: positions }];
};

const yesNo = (name: string, flag: number | null): PropertyValue[] =>
  flag === null
    ? []
    : [{ "@type": "PropertyValue", name, value: flag ? "Yes" : "No" }];

const properties = (specs: StrollerSpecs): PropertyValue[] => [
  ...prop("Weight", specs.weightKg, KILOGRAM),
  // 52 × 44 × 18 cm comes out as 41.184 L; three decimals implies a precision
  // the source centimetres do not have.
  ...prop(
    "Folded volume",
    specs.foldedVolumeL === null ? null : Math.round(specs.foldedVolumeL * 10) / 10,
    LITRE
  ),
  ...textProp(
    "Folded dimensions",
    specs.foldedDimsCm ? `${specs.foldedDimsCm.join(" × ")} cm` : undefined
  ),
  ...prop("Max child weight", specs.maxChildKg, KILOGRAM),
  ...prop("Basket load", specs.basketKg, KILOGRAM),
  ...recline(specs.reclinePositions),
  ...yesNo("One-hand fold", specs.oneHandFold),
  ...textProp("Front wheels", specs.wheels),
];

/**
 * No `offers`, deliberately.
 *
 * There is no price field anywhere in the backend, and a Product without
 * offers is valid. A placeholder or guessed price would be a manual-action
 * risk, not merely bad data.
 */
const product = (stroller: StrollersFeatures) => {
  const specs = toSpecs(stroller);

  return {
    "@type": "Product",
    name: stroller.modelName,
    brand: { "@type": "Brand", name: stroller.brand },
    image: absoluteUrl(stroller.imagePath),
    ...(stroller.modelDescription
      ? { description: stroller.modelDescription }
      : {}),
    additionalProperty: properties(specs),
  };
};

/**
 * The page's nodes: the strollers as a list, plus a breadcrumb.
 *
 * Returned as an array so both go in one script tag. Pages carry two or three
 * strollers, so positions come from the array rather than being assumed.
 */
export const comparisonJsonLd = (
  slug: string,
  title: string,
  strollers: StrollersFeatures[]
) => {
  const url = `${SITE}/compare/${slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      url,
      numberOfItems: strollers.length,
      itemListElement: strollers.map((stroller, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: product(stroller),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: title, item: url },
      ],
    },
  ];
};

/**
 * Serialised for dangerouslySetInnerHTML.
 *
 * The escape matters: a model name containing "</script>" would otherwise end
 * the block early. Nothing in the dataset does today, but the data is editable
 * from the backend seeder and this is the cheap half of the trade.
 */
export const jsonLdScript = (nodes: unknown) =>
  JSON.stringify(nodes).replace(/</g, "\\u003c");
