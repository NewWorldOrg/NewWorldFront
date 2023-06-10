// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  sourceMap: true,
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-nesting': {},
    cssnano: { preset: 'default', autoprefixer: false }
  },
  autoprefixer: {},
}
