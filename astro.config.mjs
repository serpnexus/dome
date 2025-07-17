// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';


import mdx from '@astrojs/mdx';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown({config: {debug: false }}), sitemap(), mdx()],
  output: 'static',
  site: 'https://www.invisibletext.me',

  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'es', 'fr', 'de', 'pt', 'ru', 'ko', 'tr', 'nl', 'it', 'id', 'my', 'hu', 'vi', 'fi', 'ja', 'th'
    ],
    routing: {
      prefixDefaultLocale: false
    }
  },

  trailingSlash: 'never',
  adapter: vercel(),
});