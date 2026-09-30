// Start de website en opent hem in een Playwright-browser als telefoon of laptop.
// Gebruik: node scripts/bekijk.mjs "Pixel 7"   (zonder apparaat: laptopscherm 1366x768)
// Sluit je de browser, dan stopt de website ook.
import { spawn } from 'node:child_process';
import httpServer from 'http-server';

const poort = 4173;
const url = `http://localhost:${poort}`;
const apparaat = process.argv[2];

const server = httpServer.createServer({ root: '.', cache: -1 });
server.server.on('error', (fout) => {
  // Draait de website al (bijvoorbeeld in een ander venster), dan gebruiken we die
  if (fout.code !== 'EADDRINUSE') throw fout;
  console.log(`Website draait al op ${url}`);
  openBrowser();
});
server.listen(poort, () => {
  console.log(`Website gestart op ${url}`);
  openBrowser();
});

// Pas openen als de website echt bereikbaar is, anders volgt ERR_CONNECTION_REFUSED
function openBrowser() {
  const scherm = apparaat ? `--device="${apparaat}"` : '--viewport-size="1366,768"';
  console.log(`Browser openen: ${apparaat ?? 'laptop 1366x768'}. Sluit de browser om te stoppen.`);

  const browser = spawn(`npx playwright open ${scherm} ${url}`, { shell: true, stdio: 'inherit' });
  browser.on('exit', (code) => {
    server.close();
    process.exit(code ?? 0);
  });
}
