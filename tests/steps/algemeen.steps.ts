import { expect } from '@playwright/test';
import { Given, Then } from './fixtures';

Given('ik open de homepage', async ({ page }) => {
  await page.goto('/');
});

const sectieInBeeld = async ({ page }, sectie: string) => {
  await expect(page.locator(`section#${sectie}`)).toBeInViewport();
};
Then('is de sectie {string} in beeld', sectieInBeeld);
Then('de sectie {string} is in beeld', sectieInBeeld);

Then('de URL eindigt op {string}', async ({ page }, einde: string) => {
  const escaped = einde.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  await expect(page).toHaveURL(new RegExp(`${escaped}$`));
});

Then('zie ik de kop {string}', async ({ page }, tekst: string) => {
  await expect(page.getByRole('heading', { level: 1 })).toContainText(tekst);
});

Then('zie ik de knop {string}', async ({ page }, tekst: string) => {
  await expect(page.locator('.hero-actions').getByRole('link', { name: tekst })).toBeVisible();
});

Then('heeft de pagina de titel {string}', async ({ page }, titel: string) => {
  await expect(page).toHaveTitle(titel);
});
