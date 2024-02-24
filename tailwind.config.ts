import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px'
      },
      gridTemplateAreas: {
        'project-item-shrunk': [
          'image title company . button'
        ],
        'xs-project-item-shrunk': [
          'title company button'
        ],
        'project-item-expanded': [
          'image title company . button',
          'image description description description description',
          'image skills access access access'
        ]
      },
      gridTemplateColumns: {
        'project-item-shrunk': '60px 1fr auto 2rem min-content',
        'xs-project-item-shrunk': '1fr auto min-content',
        'project-item-expanded': 'auto 1fr auto 2rem min-content'
      },
      gridTemplateRows: {
        'project-item-shrunk': '4rem',
        'project-item-expanded': '4rem 3rem 3rem'
      },
      colors: {
        gray: {
          200: '#D5DAE1',
        },
        black: {
          DEFAULT: '#000',
          500: '#1D2235',
        },
        blue: {
          500: '#2b77e7',
        },
      },
      fontFamily: {
        worksans: ['Work Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
      typography: {
        DEFAULT: {
          css: {
            img: { margin: 0 },
            h3: { fontWeight: '400' },
            h4: { fontWeight: '200' },
            maxWidth: 'unset',
            code: {
              '&::before': {
                content: '"" !important',
              },
              '&::after': {
                content: '"" !important',
              },
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@savvywombat/tailwindcss-grid-areas')
  ],
}
export default config
