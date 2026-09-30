import { expect } from '@playwright/test';
import { DataTable } from 'playwright-bdd';
import { When, Then } from './fixtures';

const heroFoto = '.hero-card .portrait img';

Then('is de foto van Sill-vyan geladen', async ({ page }) => {
  const foto = page.locator(heroFoto);
  await expect(foto).toBeVisible();
  await expect
    .poll(() => foto.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth))
    .toBeGreaterThan(0);
});

Then('vult de foto de kaart zonder uitgerekt te worden', async ({ page }) => {
  const foto = page.locator(heroFoto);
  const kaart = await page.locator('.hero-card .portrait').boundingBox();
  const img = await foto.boundingBox();
  expect(kaart).not.toBeNull();
  expect(img).not.toBeNull();
  // De foto moet precies de kaart vullen (bug: foto werd 1107px hoog en uitgerekt)
  expect(Math.abs(img!.width - kaart!.width)).toBeLessThanOrEqual(2);
  expect(Math.abs(img!.height - kaart!.height)).toBeLessThanOrEqual(2);
  await expect(foto).toHaveCSS('object-fit', 'cover');
});

When('ik naar de cijferbalk scroll', async ({ page }) => {
  await page.locator('.stats').scrollIntoViewIfNeeded();
});

Then('toont de cijferbalk de waarden:', async ({ page }, tabel: DataTable) => {
  await expect(page.locator('.stat strong')).toHaveText(tabel.raw()[0]);
});
