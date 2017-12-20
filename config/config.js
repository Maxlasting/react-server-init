const resolved = require('./resolve')

module.exports = {
  publicPath: '/public/',
  modulePath: resolved('../node_modules/'),
  host: 'localhost',
  clientPort: '8081',
  serverPort: '8080',
  openBrowser: true,
  proxy: {}
}
