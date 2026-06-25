/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core navy
        ink:        '#0B1F3A', // primary navy — header, hero, dark sections
        'ink-700':   '#16294A', // lighter navy — gradients, footer
        'ink-soft':  '#4A5A74', // slate body text

        // Brass / bronze accent
        brass:        '#A8793F',
        'brass-dark': '#8C6531', // eyebrow labels, links
        'brass-tint': '#F1E6D3', // light gold chip / highlight bg

        // Teal accent
        teal:        '#1B5E55',
        'teal-tint': '#E3EEEA',

        // Parchment / cream backgrounds
        parchment:   '#F7F4ED',
        'parchment-2': '#EFEAE0',

        // Borders & surfaces
        line:  '#DCD5C6',
        paper: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1100px',
      },
      boxShadow: {
        card:  '0px 8px 24px rgba(11, 31, 58, 0.06), 0px 1px 2px rgba(11, 31, 58, 0.04)',
        panel: '0px 24px 60px rgba(11, 31, 58, 0.18)',
      },
      borderRadius: {
        card: '0px',
      },
    },
  },
  plugins: [],
}
