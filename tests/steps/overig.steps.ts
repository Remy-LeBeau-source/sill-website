import { expect } from '@playwright/test';
import { Then } from './fixtures';

Then('zie ik {int} pakketten', async ({ page }, aantal: number) => {
  await expect(page.locator('#pakketten .plan')).toHaveCount(aantal);
});

Then('is het pakket {string} uitgelicht als {string}', async ({ page }, naam: string, label: string) => {
  const uitgelicht = page.locator('#pakketten .plan-featured');
  await expect(uitgelicht).toHaveCount(1);
  await expect(uitgelicht.locator('h3')).toHaveText(naam);
  await expect(uitgelicht.locator('.badge')).toHaveText(label);
});

Then('toont de footer het huidige jaartal', async ({ page }) => {
  await expect(page.locator('#year')).toHaveText(String(new Date().getFullYear()));
});
