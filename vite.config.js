import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFile } from 'node:fs/promises';
import { createSeoFiles, getSiteUrl, renderSeoHead } from './scripts/seo.mjs';

export default defineConfig(async ({ mode, isSsrBuild }) => {
  const url = getSiteUrl(mode);
  if (!isSsrBuild) {
    await Promise.all(Object.entries(createSeoFiles(url)).map(([name, content]) =>
      writeFile(new URL(`./public/${name}`, import.meta.url), content, 'utf8')));
  }
  return {
    plugins: [react(), {
      name: 'portfolio-seo',
      transformIndexHtml: { order: 'pre', handler: html => html.replace('<!-- seo:head -->', () => renderSeoHead(url)) },
    }],
    build: { copyPublicDir: !isSsrBuild, rollupOptions: { output: isSsrBuild ? {} : { manualChunks: { three: ['three'], motion: ['gsap', 'lenis'] } } } },
  };
});
