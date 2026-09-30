// Bouwt tests/data/testdata.db opnieuw op uit schema.sql + seed.sql
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'tests', 'data');
const db = new DatabaseSync(join(dataDir, 'testdata.db'));

db.exec(readFileSync(join(dataDir, 'schema.sql'), 'utf8'));
db.exec(readFileSync(join(dataDir, 'seed.sql'), 'utf8'));

for (const tabel of ['contact_testdata', 'navigatie_testdata', 'faq_testdata']) {
  const { aantal } = db.prepare(`SELECT COUNT(*) AS aantal FROM ${tabel}`).get();
  console.log(`${tabel}: ${aantal} rijen`);
}
db.close();
