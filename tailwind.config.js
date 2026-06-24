/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:        '#0B1F3A',
        'ink-700':  '#16294A',
        'ink-soft': '#4A5A74',
        parchment:  '#F7F4ED',
        'parchment-2': '#EFEAE0',
        paper:      '#FFFFFF',
        line:       '#DCD5C6',
        brass:      '#A8793F',
        'brass-dark': '#8C6531',
        'brass-tint': '#F1E6D3',
        teal:       '#1B5E55',
        'teal-tint':'#E3EEEA',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans:  ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 1px 2px rgba(11,31,58,0.04), 0 8px 24px rgba(11,31,58,0.06)',
        panel: '0 24px 60px rgba(11,31,58,0.18)',
      },
      maxWidth: {
        site: '1100px',
      },
    },
  },
  plugins: [],
}
