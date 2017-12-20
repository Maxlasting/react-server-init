const resolved = require('./resolve')
const config = require('./config.js')

module.exports = {
  output: {
    path: resolved('../dist'),
    publicPath: config.publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: [config.modulePath],
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: [config.modulePath],
        loader: 'babel-loader'
      }
    ]
  }
}
