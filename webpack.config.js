const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: 'electron-renderer',
  entry: {
    index: './src/pages/index',
    login: './src/pages/login',
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2'],
            plugins: [['transform-runtime', {
              "polyfill": true
            }]]
          },
        },
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: '首页',
      filename: 'index.html',
      template: './src/entry.ejs',
      excludeChunks: ['login']
    }),
    new htmlWebpackPlugin({
      title: '登录页',
      filename: 'login.html',
      template: './src/entry.ejs',
      excludeChunks: ['index']
    }),
        new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
