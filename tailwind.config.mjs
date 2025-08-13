/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1744',
          800: '#0f1e50',
          700: '#152a5c',
          600: '#1b3668',
          500: '#0f2657',
          400: '#0f2657',
        },
        yellow: {
          500: '#d9c43d',
          400: 'hsl(54, 100%, 73%)',
          200: '#ffe88c',
          100: '#fff387',
          50: '#fffac2',
        },
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: 'hwb(220 12% 85%)',
        },
      },
      fontFamily: {
        'atkinson': ['Atkinson', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '1200': '1200px',
      }
    },
  },
  plugins: [],
}
