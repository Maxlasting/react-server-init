const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: [path.join(__dirname, '../node_modules')],
      },
      {
        test: /\.jsx?$/,
        exclude: [path.join(__dirname, '../node_modules')],
        loader: 'babel-loader'
      }
    ]
  }
};
