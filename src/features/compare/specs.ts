import { StrollersFeatures } from "../../types/StrollersFeatures";

// The comparison endpoint serialises each field's `key` as the numeric featureId,
// not the semantic key. These ids are pinned explicitly in the backend seeder
// (compare-strollers-backend/src/seeders/seed.js).
const FEATURE_ID = {
  weight: "4",
  foldedDimensions: "6",
  maxChild: "9",
  recline: "14",
  oneHandFold: "79",
  frontWheels: "60",
  basket: "96",
} as const;

const rawValue = (stroller: StrollersFeatures, featureId: string) => {
  for (const group of stroller.groups) {
    const field = group.fields.find((f) => f.key === featureId);
    if (field) return field.value;
  }
  return undefined;
};

const firstNumber = (value: string | undefined): number | null => {
  if (!value) return null;
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

// "52 cm x 44 cm x 18 cm" -> [52, 44, 18]; trailing notes such as
// "… x 32 cm frame only" are ignored.
const dimensions = (value: string | undefined): [number, number, number] | null => {
  if (!value) return null;
  const matches = value.match(/\d+(?:\.\d+)?/g);
  if (!matches || matches.length < 3) return null;
  return [Number(matches[0]), Number(matches[1]), Number(matches[2])];
};

// "Yes, infinite recline" | "Yes, 3 positions" | "No"
const reclinePositions = (value: string | undefined): number | null => {
  if (!value) return null;
  if (/^no\b/i.test(value)) return 0;
  if (/infinite/i.test(value)) return Number.POSITIVE_INFINITY;
  return firstNumber(value);
};

const yesNo = (value: string | undefined): number | null => {
  if (!value) return null;
  return /^yes\b/i.test(value) ? 1 : 0;
};

export type StrollerSpecs = {
  strollerId: number;
  modelName: string;
  brand: string;
  imagePath: string;
  weightKg: number | null;
  foldedDimsCm: [number, number, number] | null;
  foldedVolumeL: number | null;
  maxChildKg: number | null;
  basketKg: number | null;
  reclinePositions: number | null;
  oneHandFold: number | null;
  wheels: string | undefined;
};

export const toSpecs = (stroller: StrollersFeatures): StrollerSpecs => {
  const dims = dimensions(rawValue(stroller, FEATURE_ID.foldedDimensions));

  return {
    strollerId: stroller.strollerId,
    modelName: stroller.modelName,
    brand: stroller.brand,
    imagePath: stroller.imagePath,
    weightKg: firstNumber(rawValue(stroller, FEATURE_ID.weight)),
    foldedDimsCm: dims,
    foldedVolumeL: dims ? (dims[0] * dims[1] * dims[2]) / 1000 : null,
    maxChildKg: firstNumber(rawValue(stroller, FEATURE_ID.maxChild)),
    basketKg: firstNumber(rawValue(stroller, FEATURE_ID.basket)),
    reclinePositions: reclinePositions(rawValue(stroller, FEATURE_ID.recline)),
    oneHandFold: yesNo(rawValue(stroller, FEATURE_ID.oneHandFold)),
    wheels: rawValue(stroller, FEATURE_ID.frontWheels),
  };
};

const EM_DASH = "—";

type MetricRow = {
  label: string;
  get: (s: StrollerSpecs) => number | null;
  format: (value: number) => string;
  better: "low" | "high";
  bar?: boolean;
};

type TextRow = {
  label: string;
  text: (s: StrollerSpecs) => string | undefined;
};

type RowDefinition = MetricRow | TextRow;

const isTextRow = (row: RowDefinition): row is TextRow => "text" in row;

// Price is intentionally absent: the backend has no price field.
const ROWS: RowDefinition[] = [
  {
    label: "Weight",
    get: (s) => s.weightKg,
    format: (v) => `${v} kg`,
    better: "low",
    bar: true,
  },
  {
    label: "Folded volume",
    get: (s) => s.foldedVolumeL,
    format: (v) => `${Math.round(v)} L`,
    better: "low",
    bar: true,
  },
  {
    label: "Fold size",
    text: (s) => (s.foldedDimsCm ? `${s.foldedDimsCm.join(" × ")} cm` : undefined),
  },
  {
    label: "Max child",
    get: (s) => s.maxChildKg,
    format: (v) => `${v} kg`,
    better: "high",
    bar: true,
  },
  {
    label: "Basket load",
    get: (s) => s.basketKg,
    format: (v) => `${v} kg`,
    better: "high",
    bar: true,
  },
  {
    label: "Recline",
    get: (s) => s.reclinePositions,
    format: (v) => (v === Number.POSITIVE_INFINITY ? "Infinite" : `${v} positions`),
    better: "high",
  },
  {
    label: "One-hand fold",
    get: (s) => s.oneHandFold,
    format: (v) => (v ? "Yes" : "No"),
    better: "high",
  },
  {
    label: "Wheels",
    text: (s) => s.wheels,
  },
];

export type ComparisonCell = {
  text: string;
  /** Sole holder of the best value on this row. */
  wins: boolean;
  /** Beaten on this row — only ever set when some other column won it. */
  losing: boolean;
  percent: string;
};

export type ComparisonRow = {
  label: string;
  cells: ComparisonCell[];
  hasBar: boolean;
  identical: boolean;
};

export type Comparison = {
  rows: ComparisonRow[];
  /** Rows won, positionally aligned to the strollers passed in. */
  winCounts: number[];
  verdictLead: string;
  verdictTail: string;
};

const percent = (value: number | null, max: number) => {
  if (value === null || !Number.isFinite(value) || max <= 0) return "0%";
  return `${Math.min(100, (value / max) * 100)}%`;
};

const allSame = (values: unknown[]) =>
  values.every((value) => value === values[0]);

export const compare = (strollers: StrollerSpecs[]): Comparison => {
  const winCounts = strollers.map(() => 0);

  const rows: ComparisonRow[] = ROWS.map((row) => {
    if (isTextRow(row)) {
      const texts = strollers.map((s) => row.text(s));
      return {
        label: row.label,
        cells: texts.map((text) => ({
          text: text ?? EM_DASH,
          wins: false,
          losing: false,
          percent: "0%",
        })),
        hasBar: false,
        identical: allSame(texts),
      };
    }

    const values = strollers.map((s) => row.get(s));
    // A missing value can't win and can't be beaten, so a row only ranks when
    // every column has a number to offer.
    const comparable = values.every((value) => value !== null);
    const identical = allSame(values);

    const numbers = values.filter((v): v is number => v !== null);
    const best = comparable
      ? row.better === "low"
        ? Math.min(...numbers)
        : Math.max(...numbers)
      : null;

    // Only an outright best counts: if two strollers share it, nobody is
    // "Better" and nobody gets greyed out.
    const bestCount = values.filter((value) => value === best).length;
    const decisive = comparable && !identical && bestCount === 1;
    const winnerIndex = decisive
      ? values.findIndex((value) => value === best)
      : -1;
    if (winnerIndex >= 0) winCounts[winnerIndex] += 1;

    const finite = numbers.filter((v) => Number.isFinite(v));
    const max = finite.length ? Math.max(...finite) : 0;

    return {
      label: row.label,
      cells: values.map((value, index) => ({
        text: value === null ? EM_DASH : row.format(value),
        wins: index === winnerIndex,
        losing: winnerIndex >= 0 && index !== winnerIndex,
        percent: percent(value, max),
      })),
      hasBar: Boolean(row.bar) && comparable,
      identical,
    };
  });

  return { rows, winCounts, ...verdict(strollers, winCounts) };
};

// How much lighter the lightest stroller is than its closest rival, and which
// one that is. Null when any weight is missing or there is nothing to rank.
const lightest = (strollers: StrollerSpecs[]) => {
  const weighed = strollers.filter((s) => s.weightKg !== null);
  if (weighed.length < 2 || weighed.length !== strollers.length) return null;

  const sorted = [...weighed].sort((x, y) => x.weightKg! - y.weightKg!);
  return {
    stroller: sorted[0],
    margin: sorted[1].weightKg! - sorted[0].weightKg!,
  };
};

const verdict = (strollers: StrollerSpecs[], winCounts: number[]) => {
  // A single stroller is the landing state after the home-page search: the
  // specs are worth showing, but there is no contest to report.
  if (strollers.length < 2) {
    return {
      verdictLead: "One down, one to go.",
      verdictTail: "Search for a rival.",
    };
  }

  const ids = new Set(strollers.map((s) => s.strollerId));
  if (ids.size < strollers.length) {
    return {
      verdictLead: "Same stroller, listed twice.",
      verdictTail: "Pick a rival.",
    };
  }

  const decisiveRows = winCounts.reduce((total, count) => total + count, 0);
  const top = Math.max(...winCounts);
  const leaders = winCounts.filter((count) => count === top).length;

  // No decisive rows at all reads badly as "0 to 0", so say it in words.
  if (decisiveRows === 0) {
    return {
      verdictLead: "Too close to call.",
      verdictTail: "Your life decides.",
    };
  }

  if (leaders > 1) {
    return {
      verdictLead:
        strollers.length === 2
          ? `Evenly matched, ${top} to ${top}.`
          : `${leaders} of them tie at ${top}.`,
      verdictTail: "Your life decides.",
    };
  }

  const winner = strollers[winCounts.indexOf(top)];
  const verdictLead = `${winner.modelName} wins ${top} of ${decisiveRows}.`;
  const lead = lightest(strollers);

  if (!lead) return { verdictLead, verdictTail: "Specs tell the rest." };
  if (lead.margin < 0.5) {
    return {
      verdictLead,
      verdictTail:
        strollers.length === 2
          ? "Near-identical weight."
          : "The two lightest are neck and neck.",
    };
  }

  // Naming the winner twice in a row reads badly, so credit the weight
  // without repeating who it belongs to.
  const margin = lead.margin.toFixed(1);
  return {
    verdictLead,
    verdictTail:
      lead.stroller.strollerId === winner.strollerId
        ? `And the lightest, by ${margin} kg.`
        : `${lead.stroller.modelName} is ${margin} kg lighter.`,
  };
};
