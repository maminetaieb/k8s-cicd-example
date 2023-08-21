const { colors, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: false,
  //darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      transparent: '#00000000',
      background: {
        DEFAULT: '#F3F3F3',
        dark: '#010101',
      },
      primary: {
        DEFAULT: 'rgb(25, 100, 160)',
        hover: 'rgb(21, 93, 155)',
      },
      secondary: {
        DEFAULT: 'rgb(33, 133, 213)',
        hover: 'rgb(27, 127, 207)',
      },

      success: 'rgb(66, 186, 150)',

      error: 'rgb(223, 71, 89)',
      'error-hover': 'rgb(215, 67, 80)',
    },

    fontFamily: {
      ...fontFamily,
      sans: ['Poppins', 'Roboto', 'Helvetica', 'sans-serif'],
    },

    extend: {
      spacing: {
        sidebar: '4rem',
        navbar: '3rem',
        'login-container': '30rem',
      },
      colors: {
        scrollbar: 'rgba(96, 96, 96, 0.35)',
        login: {
          'background-start': 'rgba(27, 103, 162, 1)',
          'background-via': 'rgba(29, 107, 166, 1)',
          'background-end': 'rgba(33, 111, 172, 1)',
          container: 'rgba(48, 56, 65, 0.48)',
          field: 'rgba(33, 133, 213, 0.27)',
          'field-active': 'rgba(33, 133, 213, 0.5)',
          button: 'rgb(33, 133, 213)',
          error: 'rgba(255, 255, 0, 1)',
        },
        'page-background': {
          DEFAULT: 'rgb(254, 254, 254)',
          dark: '#010101',
        },
        'page-text': {
          DEFAULT: '#010101',
          dark: '#F3F3F3',
        },
        navbars: {
          topbar: 'rgb(33, 133, 213)',
          sidebar: 'rgb(25, 100, 160)',
          'button-active': 'rgba(0, 0, 0, 0.4)',
          'button-hover': 'rgba(0, 0, 0, 0.15)',
          seperator: 'rgba(96, 208, 255, 0.39)',
          'seperator-active': 'rgba(96, 208, 255, 0.2)',
          text: 'rgb(243, 243, 243)',
          'text-hover': 'rgb(249, 249, 249)',
        },
        table: {
          header: 'rgb(241, 241, 241)',
          'row-light': 'rgb(255, 255, 255)',
          'row-dark': 'rgb(249, 249, 249)',
          seperator: 'rgba(0, 0, 0, 0.10)',
          't-strong': 'rgba(0, 0, 0, 0.65)',
          't-weak': 'rgba(0, 0, 0, 0.45)',
          't-stronger': 'rgb(17, 24, 39)',
        },
        'table-pagination': {
          'button-active': 'rgb(25, 100, 160)',
          button: 'rgb(109, 109, 109)',
        },
      },
    },
  },
  variants: {
    scrollbar: ['rounded', 'group-hover'],

    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}
