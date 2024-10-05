/** @type {import('tailwindcss').Config} */
export default {
    content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          transparent1: '#EEF5FF',
          background: '#F0EEED',
          background3: '#EEF5FF',
          primary: '#070F2B',
          baseBlack: '#000000',
          baseWhite: '#FFFFFF',
          neutrals100: '#e3e3e3',
          neutrals200: '#cccbcb',
          neutrals300: '#b5b3b3',
          neutrals400: '#9F9C9C',
          neutrals500: '#898384',
          neutrals600: '#726C6C',
          neutrals700: '#5A5555',
          neutrals800: '#433E3F',
          neutrals900: '#2B2829',
          neutrals1000: '#151314',
          secondary100: '#f0f0f0',
          secondary200: '#dae1e7',
          secondary300: '#ced7de',
          secondary400: '#c2cdd6',
          secondary500: '#b6c3cd',
          secondary600: '#92a5b5',
          secondary700: '#7991a4',
          secondary800: '#637d92',
          secondary900: '#4a5e6d',
          secondary1000: '#323f49',
          success100: '#a4f4e7',
          success200: '#15b097',
          success300: '#0b7b69',
          warning100: '#f4c790',
          warning200: '#eda145',
          warning300: '#cc7914',
          error100: '#e4626f',
          error200: '#c03744',
          error300: '#8c1823',
          orange: '#FF4141',
          black1: '#000000',
          black2: 'rgba(0, 0, 0, 0.6)',
          grey1: '#C9C9C9',
          grey2: '#5C5C5C',
          grey3: '#C7C7C7',
          grey4: '#7A7A7A',
          grey5: '#787878',
          grey6: '#E2E2E2',
          grey7: '#454545',
          secondary: '#AAB9C5'
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif']
        },
        boxShadow: {
          navbar: '0px 1px 3px -2px rgba(0, 0, 0, 1)',
          prodImage: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
        },
        animation: {
          'spin-slow': 'spin 1.5s linear infinite',
          slideInToLeft: 'slideInToLeft 1.5s ease-out forwards',
          slideInFromTop: 'slideInFromTop 0.5s ease-out forwards',
          slideOutFromBottom: 'slideOutFromBottom 0.5s ease-out forwards',
          fadeInAnimation: 'fadeInAnimation 1s ease-out forwards'
        },
        keyframes: {
          slideInToLeft: {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
          },
          slideInFromTop: {
            '0%': { transform: 'translateY(-10%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          slideOutFromBottom: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(-10%)', opacity: '0' }
          },
          fadeInAnimation: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          }
        },
        screens: {
          xsm: '450px',
          sm: '610px',
          xmd: '700px',
          xlg: '1210px'
        }
      }
    },
    plugins: []
  };
  