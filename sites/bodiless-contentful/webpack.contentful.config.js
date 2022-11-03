const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const babelConfig = require('./babel.config');

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
          { loader: 'postcss-loader' },
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
        test: [/\.jpeg?$/, /\.jpg?$/, /\.svg?$/, /\.png?$/],
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
    })
  ],
  optimization: {
    splitChunks: false,
  },
};
