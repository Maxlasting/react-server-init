const resolved = require('./resolve')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const packageJson = require('../package.json')

const serverConfig = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: resolved('../client/index-server.js')
  },
  externals: Object.keys(packageJson.dependencies),
  output: {
    filename: 'index-server.js',
    libraryTarget: 'commonjs2'
  }
})

module.exports = serverConfig
