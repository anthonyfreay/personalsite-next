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
        'brand-light': '#F5F5F5',
        'brand-dark': '#090909',
        'brand-text': '#0e0e0e',
        'accent-1': '#54c6eb',
        'accent-2': '#2ecc71',
        'accent-3': '#e87461',
      },
      fontFamily: {
        sans: ['helvetica-neue-lt-pro', 'Arial', 'sans-serif'],
      },
      spacing: {
        '1.25': '0.3125rem',
        '2.5': '0.625rem',
        '3.75': '0.9375rem',
        '5px': '0.3125rem',
        '7.5': '1.875rem',
        '10px': '0.625rem',
        '15px': '0.9375rem',
        '20px': '1.25rem',
        '25px': '1.5625rem',
      },
      width: {
        '160px': '10rem',
        '300px': '18.75rem',
        '400px': '25rem',
      },
      height: {
        '50px': '3.125rem',
        '300px': '18.75rem',
        '400px': '25rem',
      },
      maxWidth: {
        '70%': '70%',
        '400px': '25rem',
        '700px': '43.75rem',
      },
      backgroundColor: {
        'overlay': 'rgba(14, 14, 14, 0.5)',
      },
      padding: {
        '5px': '0.3125rem',
        '10px': '0.625rem',
        '15px': '0.9375rem',
        '20px': '1.25rem',
        '25': '6.25rem',
      },
      margin: {
        '5px': '0.3125rem',
        '10px': '0.625rem',
        '15px': '0.9375rem',
        '20px': '1.25rem',
        '25px': '1.5625rem',
      },
      fontSize: {
        '14px': '0.875rem',
        '20px': '1.25rem',
        '64px': '4rem',
      },
    },
  },
  plugins: [],
};
