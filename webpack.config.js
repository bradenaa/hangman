require('dotenv').config();

const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PORT } = process.env;

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const defaultInclude = [SRC_DIR];
module.exports = {
  // mode: 'development',
  entry: [`${SRC_DIR}/client/index.js`],
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: 'webpack-bundle.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: `https://localhost:${PORT}`,
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // {
      //   test: /\.(jpe?g|png|gif|ttf|svg|mp4)(\?[a-z0-9=.]+)?$/,
      //   use: [{ loader: 'file-loader' }],
      //   include: defaultInclude,
      // },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],

};
