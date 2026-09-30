import { expect } from '@playwright/test';
import { When, Then } from './fixtures';
import { navigatieTestdata } from './db';

Then('brengt elke menu-link uit de database me naar de juiste sectie', async ({ page }) => {
  const links = navigatieTestdata();
  expect(links.length).toBeGreaterThan(0);
  for (const { link, sectie } of links) {
    await page.locator('.nav-links').getByRole('link', { name: link, exact: true }).click();
    await expect(page.locator(`section#${sectie}`), `link "${link}"`).toBeInViewport();
    await expect(page).toHaveURL(new RegExp(`#${sectie}$`));
  }
});

When('ik in het menu op {string} klik', async ({ page }, link: string) => {
  await page.locator('.nav-links').getByRole('link', { name: link, exact: true }).click();
});

When('ik op de knop {string} in de header klik', async ({ page }, knop: string) => {
  await page.locator('.nav-cta').getByRole('link', { name: knop }).click();
});

When('ik op de menuknop klik', async ({ page }) => {
  await page.locator('.nav-toggle').click();
});

When('ik in het mobiele menu op {string} klik', async ({ page }, link: string) => {
  await page.locator('.mobile-menu').getByRole('link', { name: link, exact: true }).click();
});

Then('is het mobiele menu open', async ({ page }) => {
  await expect(page.locator('.mobile-menu')).toBeVisible();
  await expect(page.locator('.nav-toggle')).toHaveAttribute('aria-expanded', 'true');
});

Then('is het mobiele menu gesloten', async ({ page }) => {
  await expect(page.locator('.mobile-menu')).toBeHidden();
  await expect(page.locator('.nav-toggle')).toHaveAttribute('aria-expanded', 'false');
});

Then('kan de pagina niet horizontaal scrollen', async ({ page }) => {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});
