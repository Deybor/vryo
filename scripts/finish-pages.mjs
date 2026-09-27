import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
const root = 'dist/client';
for (const route of ['work', 'studio', 'enquire', ...['the-fold','the-vessel','the-joint','the-tolerance','the-drape'].map(s => `work/${s}`)]) {
  mkdirSync(`${root}/${route}`, {recursive:true});
  copyFileSync(`${root}/index.html`, `${root}/${route}/index.html`);
}
copyFileSync(`${root}/index.html`, `${root}/404.html`);
writeFileSync(`${root}/.nojekyll`, '');
