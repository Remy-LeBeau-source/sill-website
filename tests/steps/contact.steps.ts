import { expect, Page } from '@playwright/test';
import { Given, When, Then } from './fixtures';
import { contactTestdata } from './db';

// Het formulier roept window.openMail(url) aan; in de test vangen we die url op
Given('het openen van het mailprogramma wordt onderschept', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as any;
    w.__mails = [];
    w.openMail = (url: string) => w.__mails.push(url);
  });
});

const mails = (page: Page) => page.evaluate(() => (window as any).__mails as string[]);

const laatsteMail = async (page: Page) => {
  await expect.poll(async () => (await mails(page)).length).toBe(1);
  return new URL((await mails(page))[0]);
};

const formulier = (page: Page) => page.locator('.contact-form');

When('ik scroll naar het contactformulier', async ({ page }) => {
  await formulier(page).scrollIntoViewIfNeeded();
});

When('ik {string} invul bij {string}', async ({ page }, waarde: string, veld: string) => {
  await formulier(page).getByLabel(veld, { exact: true }).fill(waarde);
});

When('ik het formulier verstuur', async ({ page }) => {
  await formulier(page).getByRole('button').click();
});

Then('wordt er geen mail geopend', async ({ page }) => {
  expect(await mails(page)).toHaveLength(0);
  await expect(page.locator('.form-note')).toBeHidden();
});

Then('is het veld {string} ongeldig', async ({ page }, veld: string) => {
  const geldig = await formulier(page)
    .getByLabel(veld, { exact: true })
    .evaluate((el: HTMLInputElement) => el.checkValidity());
  expect(geldig).toBe(false);
});

Then('wordt er een mail geopend naar {string}', async ({ page }, adres: string) => {
  const mail = await laatsteMail(page);
  expect(mail.protocol).toBe('mailto:');
  expect(mail.pathname).toBe(adres);
});

Then('heeft de mail het onderwerp {string}', async ({ page }, onderwerp: string) => {
  const mail = await laatsteMail(page);
  expect(mail.searchParams.get('subject')).toBe(onderwerp);
});

Then('bevat de mailtekst {string}', async ({ page }, tekst: string) => {
  const mail = await laatsteMail(page);
  expect(mail.searchParams.get('body')).toContain(tekst);
});

Then('zie ik de bevestiging {string}', async ({ page }, tekst: string) => {
  await expect(page.locator('.form-note')).toBeVisible();
  await expect(page.locator('.form-note')).toContainText(tekst);
});

When('ik het formulier invul met testdata {string}', async ({ page }, sleutel: string) => {
  const data = contactTestdata(sleutel);
  await formulier(page).getByLabel('Naam', { exact: true }).fill(data.naam);
  await formulier(page).getByLabel('E-mail', { exact: true }).fill(data.email);
  await formulier(page).getByLabel('Waar kan ik je mee helpen?', { exact: true }).fill(data.bericht);
});

Then('klopt de uitkomst met de verwachting voor testdata {string}', async ({ page }, sleutel: string) => {
  const data = contactTestdata(sleutel);
  if (data.verwacht_geldig) {
    const mail = await laatsteMail(page);
    expect(mail.searchParams.get('subject')).toBe(`Kennismaking aanvraag — ${data.naam}`);
    const body = mail.searchParams.get('body')!;
    expect(body).toContain(`Naam: ${data.naam}`);
    expect(body).toContain(`E-mail: ${data.email}`);
    expect(body).toContain(data.bericht);
    await expect(page.locator('.form-note')).toBeVisible();
  } else {
    expect(await mails(page)).toHaveLength(0);
    const geldig = await formulier(page)
      .getByLabel(data.ongeldig_veld!, { exact: true })
      .evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(geldig).toBe(false);
  }
});
