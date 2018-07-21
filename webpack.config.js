const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'electron-renderer',
  entry: {
    index: './src/pages/index.js',
    login: './src/pages/login.js',
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
  ]
}
