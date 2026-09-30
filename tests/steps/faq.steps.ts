import { expect } from '@playwright/test';
import { When, Then } from './fixtures';
import { faqTestdata } from './db';

Then('geeft elke vraag uit de database het verwachte antwoord', async ({ page }) => {
  const vragen = faqTestdata();
  expect(vragen.length).toBeGreaterThan(0);
  for (const { vraag, antwoord_fragment } of vragen) {
    await page.locator('.faq summary', { hasText: vraag }).click();
    await expect(page.locator('.faq details p', { hasText: antwoord_fragment }), vraag).toBeVisible();
  }
});

When('ik op de vraag {string} klik', async ({ page }, vraag: string) => {
  await page.locator('.faq summary', { hasText: vraag }).click();
});

Then('zie ik het antwoord {string}', async ({ page }, tekst: string) => {
  await expect(page.locator('.faq details p', { hasText: tekst })).toBeVisible();
});

Then('zie ik het antwoord {string} niet meer', async ({ page }, tekst: string) => {
  await expect(page.locator('.faq details p', { hasText: tekst })).toBeHidden();
});

Then('zijn alle {int} vragen dicht', async ({ page }, aantal: number) => {
  const vragen = page.locator('.faq details');
  await expect(vragen).toHaveCount(aantal);
  await expect(page.locator('.faq details[open]')).toHaveCount(0);
});
