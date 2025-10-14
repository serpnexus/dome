import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'pt': 'Portuguese',
        'ru': 'Russian',
        'ko': 'Korean',
        'tr': 'Turkish',
        'nl': 'Dutch',
        'it': 'Italian',
        'id': 'Indonesian',
        'my': 'Malay',
        'fi': 'Finnish',
        'ja': 'Japanese',
        'hu': 'Hungarian',
        'vi': 'Vietnamese',
        'th': 'Thai',
      }
    }
  }), tailwind(), mdx()],

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
  
  compressHtml: true,
});
