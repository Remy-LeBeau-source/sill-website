import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const db = new DatabaseSync(path.join(__dirname, '..', 'data', 'testdata.db'), { readOnly: true });

export type ContactTestdata = {
  sleutel: string;
  omschrijving: string;
  naam: string;
  email: string;
  bericht: string;
  verwacht_geldig: number;
  ongeldig_veld: string | null;
};

export function contactTestdata(sleutel: string): ContactTestdata {
  const rij = db.prepare('SELECT * FROM contact_testdata WHERE sleutel = ?').get(sleutel);
  if (!rij) throw new Error(`Geen contact_testdata met sleutel "${sleutel}" — draai npm run db:setup`);
  return rij as ContactTestdata;
}

export function navigatieTestdata() {
  return db.prepare('SELECT link, sectie FROM navigatie_testdata').all() as { link: string; sectie: string }[];
}

export function faqTestdata() {
  return db.prepare('SELECT vraag, antwoord_fragment FROM faq_testdata').all() as {
    vraag: string;
    antwoord_fragment: string;
  }[];
}
