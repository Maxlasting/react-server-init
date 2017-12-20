const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const config = require('../../config/config')
const serverRender = require('./server-render')
const bundle = require('../../dist/index-server')

const template = fs.readFileSync(path.join(__dirname, '../../dist/index.ejs'), 'utf8')

router.get('*', (req, res) => {
  serverRender(req, res, template, bundle)
})

module.exports = (app) => {
  app.use(config.publicPath, express.static(path.join(__dirname, '../../dist')))
  app.use(router)
}
