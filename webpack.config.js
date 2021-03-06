const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
  {
    name: 'client',
    mode: 'production',
    entry: {
      javascript: ['@babel/polyfill', './src/index.js'],
    },
    output: {
      filename: './js/bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'eval-source-map',
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
];
