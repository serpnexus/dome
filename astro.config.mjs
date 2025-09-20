import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          'en': 'en',
          'es': 'es',
          'fr': 'fr',
          'de': 'de',
          'pt': 'pt',
          'ru': 'ru',
          'ko': 'ko',
          'tr': 'tr',
          'nl': 'nl',
          'it': 'it',
          'id': 'id',
          'my': 'my',
          'fi': 'fi',
          'ja': 'ja',
          'hu': 'hu',
          'vi': 'vi',
          'th': 'th',
        }
      }
    }), 
    tailwind(), 
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
        debug: false
      }
    })
  ],

  output: 'server',
  adapter: vercel(),
  site: 'https://www.invisibletext.me',

  i18n: {
    locales: [
      'en', 'es', 'fr', 'de', 'pt', 'ru', 'ko', 'tr', 'nl', 'it', 'id', 'my', 'fi', 'ja', 'hu', 'vi', 'th'
    ],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },

  trailingSlash: 'never',
  compressHtml: false,
  adapter: vercel(),
});