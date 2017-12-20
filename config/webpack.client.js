const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const resolved = require('./resolve')
const config = require('./config')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const clientConfig = webpackMerge(baseConfig, {
  entry: {
    app: resolved('../client/index.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlPlugin({
      template: resolved('../public/index.html'),
      filename: 'index.html'
    }),
    new HtmlPlugin({
      template: '!!ejs-compiled-loader!' + resolved('../public/index.ejs'),
      filename: 'index.ejs'
    })
  ]
})

if (process.env.NODE_ENV === 'development') {
  // 注入热加载模块
  clientConfig.entry.app = ['react-hot-loader/patch'].concat([clientConfig.entry.app])
  // 启用热替换插件
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  // 加入服务器配置
  clientConfig.devServer = {
    host: config.host,
    port: config.clientPort,
    open: config.openBrowser,
    hot: true,
    contentBase: resolved('../dist'),
    overlay: {
      errors: true
    },
    publicPath: clientConfig.output.publicPath,
    historyApiFallback: {
      index: clientConfig.output.publicPath + 'index.html'
    },
    proxy: config.proxy
  }
}

module.exports = clientConfig
