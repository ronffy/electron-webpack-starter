const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// 提取css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        // use: ['style-loader', 'css-loader?minimize', 'postcss-loader']
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        })
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
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`,// 给输出的 CSS 文件名称加上 Hash 值
    }),
  ]
}
