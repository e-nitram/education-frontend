/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['IBM Plex Serif', 'serif'],
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      screens: {
        sm: '0px',
        md: '550px',
        lg: '1365px',
        xl: '1919px',
      },
      colors: {
        primary: '#2541b2',
        secondary: '#f4b51e',
        white: '#ffffff',
        red: '#FF0000',
        light: '#f5f5f5',
        lotion: '#fafafa',
        dark: '#161616',
        gcu: '#4A3187',
        slu: '#095D50',
      },
      fontSize: {
        10: '10px',
        12: '12px',
        xs: '14px',
        sm: '16px',
        18: '18px',
        md: '22px',
        26: '26px',
        lg: '36px',
        42: '42px',
        48: '48px',
        xl: '60px',
        '2xl': '96px',
      },
      boxShadow: {
        inset: 'inset 0px 3px 6px #00000029',
        outset: '0px 3px 20px #00000029',
        button: '3px 3px 15px #00000033',
        box: '0px 6px 16px #00000029',
        offer: '0px 0px 26px #00000029',
        offerbutton: '3px 3px 42px #FFFFFF77',
      },
      fontWeight: {
        medium: 500,
      }
    },
  },
  plugins: [],
};
