import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap(), tailwind(), mdx()],
  output: 'server',
  adapter: vercel(),
  site: 'https://www.invisibletext.me',
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'es', 'fr', 'de', 'pt', 'ru', 'ko', 'tr', 'nl', 'it', 'id', 'my', 'fi', 'ja', 'hu', 'vi', 'th'
    ],
    routing: {
      prefixDefaultLocale: false
    }
  },
  trailingSlash: 'never'
});
