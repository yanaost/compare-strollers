/**
 * Bakes the whole dataset into the repo at build time.
 *
 * This replaces the Express API. The three endpoints it served
 * (/test-all, /search, /comparison-data) were read-only queries over data that
 * only changes when someone edits the seeder and reseeds, so there is no reason
 * to keep a Node process alive to answer them. The build runs the queries once
 * and writes src/data/dataset.json; nothing queries Postgres at runtime.
 *
 * Read-only by design: plain SELECTs over `pg`, no Sequelize models and no
 * sync() anywhere near it. Importing the backend's models would risk the
 * seeder, which destroys and truncates every table — see CLAUDE.md.
 *
 * Needs DATABASE_URL. On Render, set it on the static site's build environment.
 */
import { writeFile } from "node:fs/promises";
import pg from "pg";

// Two files on purpose. index.json is small and safe to import anywhere;
// specs.json is ~400KB and must only be reached from a server component or a
// dynamic import, or it lands in every page's bundle.
const OUT_INDEX = "src/data/index.json";
const OUT_SPECS = "src/data/specs.json";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✖ DATABASE_URL is not set. This script reads the database directly.");
  process.exit(1);
}

const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(url);

const client = new pg.Client({
  connectionString: url,
  // Render's managed Postgres terminates TLS with a cert the local chain does
  // not know. Still encrypted, just unverified; a local socket needs neither.
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

const STROLLERS = `
  SELECT "strollerId", "modelName", "modelDescription", "tagline",
         "alternativeModelNames", "brand", "imagePath"
  FROM stroller
  ORDER BY "strollerId"
`;

// Ordered by the join-table primary key, which is the order the seeder inserted
// them — the same order the Express endpoint happened to return, so the grouping
// and row order on the page do not shift.
const COMPARISONS = `
  SELECT slug, title, "strollerIds"
  FROM comparison
  ORDER BY position, "comparisonId"
`;

const VALUES = `
  SELECT v."strollerId",
         f."featureId",
         f.title        AS "featureTitle",
         g."featureGroupId",
         g.title        AS "groupTitle",
         v.value
  FROM strollerfeaturevalue v
  JOIN feature      f ON f."featureId"      = v."featureId"
  JOIN featuregroup g ON g."featureGroupId" = f."featureGroupId"
  ORDER BY v."strollerFeatureValueId"
`;

/** Same pivot the controller did: flat value rows → { groups: [{ group, fields }] }. */
const pivot = (stroller, rows) => {
  const groups = new Map();

  for (const row of rows) {
    const key = String(row.featureGroupId);
    if (!groups.has(key)) {
      groups.set(key, { group: { key, title: row.groupTitle }, fields: [] });
    }
    groups.get(key).fields.push({
      key: String(row.featureId),
      title: row.featureTitle,
      value: row.value,
    });
  }

  return { ...stroller, groups: [...groups.values()] };
};

const main = async () => {
  await client.connect();
  try {
    const [{ rows: strollers }, { rows: values }, { rows: comparisons }] =
      await Promise.all([
        client.query(STROLLERS),
        client.query(VALUES),
        client.query(COMPARISONS),
      ]);

    if (strollers.length === 0) throw new Error("stroller table is empty");
    if (values.length === 0) throw new Error("strollerfeaturevalue table is empty");
    if (comparisons.length === 0) {
      throw new Error(
        "comparison table is empty — every static page comes from a row in it"
      );
    }

    const byStroller = new Map(strollers.map(({ strollerId }) => [strollerId, []]));
    for (const row of values) byStroller.get(row.strollerId)?.push(row);

    const dataset = strollers.map((stroller) =>
      pivot(stroller, byStroller.get(stroller.strollerId) ?? [])
    );

    // A comparison naming a stroller that no longer exists would generate a
    // page with a blank column. Better to fail the build than to publish one.
    const knownIds = new Set(strollers.map(({ strollerId }) => strollerId));
    const broken = comparisons.filter(({ slug, strollerIds }) =>
      strollerIds.some((id) => !knownIds.has(id))
        ? console.error(`  ${slug} → unknown stroller ids`) ?? true
        : false
    );
    if (broken.length > 0) {
      throw new Error(`${broken.length} comparison row(s) reference missing strollers`);
    }

    const withoutSpecs = dataset.filter(({ groups }) => groups.length === 0);
    if (withoutSpecs.length > 0) {
      console.warn(
        `⚠ ${withoutSpecs.length} stroller(s) have no feature values: ` +
          withoutSpecs.map(({ modelName }) => modelName).join(", ")
      );
    }

    const generatedAt = new Date().toISOString();

    await writeFile(
      OUT_INDEX,
      JSON.stringify(
        {
          generatedAt,
          comparisons,
          strollers: dataset.map(
            ({
              strollerId,
              modelName,
              brand,
              imagePath,
              tagline,
              alternativeModelNames,
            }) => ({
              strollerId,
              modelName,
              brand,
              imagePath,
              tagline,
              alternativeModelNames,
            })
          ),
        },
        null,
        2
      ) + "\n"
    );

    await writeFile(
      OUT_SPECS,
      JSON.stringify(
        Object.fromEntries(dataset.map((s) => [s.strollerId, s])),
        null,
        2
      ) + "\n"
    );

    console.log(
      `✔ ${dataset.length} strollers, ${values.length} feature values, ` +
        `${comparisons.length} comparison pages → ${OUT_INDEX} + ${OUT_SPECS}`
    );
  } finally {
    await client.end();
  }
};

main().catch((error) => {
  console.error(`✖ ${error.message}`);
  process.exit(1);
});
