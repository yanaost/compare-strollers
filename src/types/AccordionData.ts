// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AccordionDataRow = { title: string; key: string; values: any[] };

export type AccordionsData = {
  key: string;
  title: string;
  rows?: AccordionDataRow[];
};