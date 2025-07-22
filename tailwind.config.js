/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary color system (100-500 range for consistency)
        background: {
          100: '#fefcf3',        // Very light cream
          200: '#fdf9e7',        // Light cream
          300: '#fbf5db',        // Medium light cream
          400: '#faf7e8',        // Main cream yellow (background)
          500: '#f7f2d4',        // Darker cream
        },
        text: {
          100: '#94a3b8',        // Light blue-gray
          200: '#64748b',        // Medium light blue-gray
          300: '#475569',        // Medium blue-gray
          400: '#334155',        // Dark blue-gray
          500: '#1d3557',        // Main dark blue (primary text)
        },
        warning: {
          100: '#fee2e2',        // Light red
          200: '#fecaca',        // Medium light red
          300: '#fca5a5',        // Medium red
          400: '#f87171',        // Medium dark red
          500: '#e63946',        // Main red (warning)
        },
        success: {
          100: '#dcfce7',        // Light green
          200: '#bbf7d0',        // Medium light green
          300: '#86efac',        // Medium green
          400: '#4ade80',        // Medium dark green
          500: '#3bb273',        // Main green (success)
        },
        info: {
          100: '#e0f2fe',        // Light blue
          200: '#bae6fd',        // Medium light blue
          300: '#7dd3fc',        // Medium blue
          400: '#38bdf8',        // Medium dark blue
          500: '#457b9d',        // Main blue (info)
        },
      },
      fontFamily: {
        sans: ['var(--font-telex)', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable class-based dark mode
}
