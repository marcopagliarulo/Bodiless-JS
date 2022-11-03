const webpack = require('webpack');
const { addTokenShadowPlugin } = require('@bodiless/webpack');
const shadow = require('--vital--/shadow');
const contentfulShadown = require('@vital/contentful-editor/shadow');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const getbuildCSSPlugins = require('@bodiless/gatsby-theme-bodiless/build-css');
const babelConfig = require('./babel.config');

const getTailwindConfig = () => {
  const processDirFile = path.resolve(process.cwd(), 'tailwind.config.js');
  if (fs.existsSync(processDirFile)) {
    return processDirFile;
  }
  const siteDirFile = path.resolve(__dirname, 'tailwind.config.js');
  if (fs.existsSync(siteDirFile)) {
    return siteDirFile;
  }
  return false;
};

const tokenShadowPlugin = addTokenShadowPlugin({}, { resolvers: [contentfulShadown, shadow] });
process.env.BODILESS_TAILWIND_THEME_ENABLED=1;
const tailWindConfigFile = getTailwindConfig();
console.log(tailWindConfigFile);
const postCssPlugins = tailWindConfigFile ? [
  // eslint-disable-next-line global-require
  require('tailwindcss')(tailWindConfigFile),
  // eslint-disable-next-line global-require
  require('autoprefixer')(),
] : [];

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 8000,
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      // stream is required for crypto
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      fs: false,
      os: false,
    },
    extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postCssPlugins,
              }
            }
          },
        ],
      },
      {
        test: (file) => file.endsWith('js') && file.includes('gatsby/cache-dir'),
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: [/\.jpeg?$/, /\.jpg?$/, /\.svg?$/, /\.png?$/, /\.woff?$/, /\.woff2?$/, /\.eot?$/, /\.ttf?$/],
        loader: require.resolve('url-loader'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // @todo serializing the whole env is not a good idea -- it's likely to contain credentials.
      'process.env': JSON.stringify(process.env),
      HAS_REACT_18: false
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    ...tokenShadowPlugin.plugins
  ],
  optimization: {
    splitChunks: false,
  },
};
