// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown({config: {debug: false }}), sitemap()],
  output: 'static',
  adapter: netlify(),
  site: 'https://www.invisibletext.me',
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'es', 'fr', 'de', 'pt', 'ru', 'ko', 'tr', 'nl', 'it', 'id', 'my'
    ],
    routing: {
      prefixDefaultLocale: false
    }
  },
  trailingSlash: 'never',

});
