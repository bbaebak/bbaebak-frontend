import type { Config } from 'tailwindcss';
import { colors } from './app/styles/theme/colors';
import { typography } from './app/styles/theme/typography';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: typography.sans,
      },
      fontSize: {
        semibold28: ['2.8rem', { fontWeight: 600 }],
        bold22: ['2.2rem', { fontWeight: 700 }],
        bold17: ['1.7rem', { fontWeight: 700 }],
        medium18: ['1.8rem', { fontWeight: 500 }],
        medium16: ['1.6rem', { fontWeight: 500 }],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
