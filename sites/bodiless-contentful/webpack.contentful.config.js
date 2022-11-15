const webpack = require('webpack');
const { addTokenShadowPlugin } = require('@bodiless/webpack');
const shadow = require('--vital--/shadow');
const contentfulShadown = require('@vital/contentful-editor/shadow');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');
const babelConfig = require('./babel.config');

module.exports=(env) => {
  const isPackagingMode = env.packaging || false;

  const tokenShadowPlugin = addTokenShadowPlugin({}, { resolvers: [contentfulShadown, shadow] });
  process.env.BODILESS_TAILWIND_THEME_ENABLED=1;

  const postCssPlugins = (configFile) => [
    // eslint-disable-next-line global-require
    require('tailwindcss')(configFile),
    // eslint-disable-next-line global-require
    require('autoprefixer')(),
  ];

  const webPackConf = {
    entry: './src/app.tsx',
    devtool: isPackagingMode ? false : 'source-map',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'index.js',
    },
    resolve: {
      alias: {
        './bodiless.index.css': false,
      },
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
          test: /edit\.css$/,
          sideEffects: true,
          use: [
            { loader: isPackagingMode ? MiniCssExtractPlugin.loader : 'style-loader'},
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: postCssPlugins('edit.tailwind.config.js'),
                }
              }
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /edit\.css$/,
          sideEffects: true,
          use: [
            { loader: isPackagingMode ? MiniCssExtractPlugin.loader : 'style-loader'},
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: postCssPlugins('style.tailwind.config.js'),
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
        filename: isPackagingMode ? '[name].[contenthash].css' : '[name].css',
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

  if (!isPackagingMode) {
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

  return webPackConf;
};
