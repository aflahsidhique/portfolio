import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

const output = new URL('../dist/index.html', import.meta.url);
const template = await readFile(output, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error('Prerender failed: missing empty React root.');
const html = render();
if (!html.includes('<main') || !html.includes('Aflah Sidhique')) throw new Error('Prerender failed: portfolio content is missing.');
await writeFile(output, template.replace(placeholder, () => `<div id="root">${html}</div>`), 'utf8');
console.log('Prerendered portfolio HTML; React will hydrate it in the browser.');
