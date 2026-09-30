// Draait alle tests en bouwt daarna het Allure-rapport, ook als er tests falen.
// Het living doc (living-doc/index.html) maakt Playwright zelf tijdens de testrun.
import { spawnSync } from 'node:child_process';

const npm = (script) => spawnSync(`npm run ${script}`, { stdio: 'inherit', shell: true }).status;

const testStatus = npm('test');
npm('allure:generate');

console.log('\nRapporten klaar:');
console.log('  npm run allure:open   Allure-rapport');
console.log('  npm run livingdoc     living doc');
console.log('  npm run report        Playwright-rapport');

process.exit(testStatus ?? 1);
