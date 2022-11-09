const webpack = require('webpack');
const { addTokenShadowPlugin } = require('@bodiless/webpack');
const shadow = require('--vital--/shadow');
const contentfulShadown = require('@vital/contentful-editor/shadow');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');
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

const isProductionMode = process.env.NODE_ENV === 'production';

const tokenShadowPlugin = addTokenShadowPlugin({}, { resolvers: [contentfulShadown, shadow] });
process.env.BODILESS_TAILWIND_THEME_ENABLED=1;
const tailWindConfigFile = getTailwindConfig();

const postCssPlugins = [
  // eslint-disable-next-line global-require
  require('tailwindcss')(tailWindConfigFile),
  // eslint-disable-next-line global-require
  require('autoprefixer')(),
];

const webPackConf = {
  entry: './src/app.tsx',
  devtool: isProductionMode ? false : 'source-map',
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
          { loader: isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader'},
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
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    ...tokenShadowPlugin.plugins,
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    concatenateModules: false,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    minimize: true,
  },
};

if (!isProductionMode) {
  webPackConf.devServer = {
    compress: true,
    port: 8000,
    index: '/index.html',
    historyApiFallback: {
      rewrites: [
        { from: /^\/.?$/, to: '/index.html' },
      ],
    },
  };
}

module.exports=webPackConf;
