module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-transform-runtime'],
  ],
  env: {
    test: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};
