module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),
  ],
}
