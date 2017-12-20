const express = require('express')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
// const path = require('path')

const app = express()

// app.use(favicon(path.resolve(__dirname, '../public/favicon.ico'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 1000 * 60,
  name: 'sid',
  resave: false,
  secret: 'fq-master',
  saveUninitialized: false
}))

if (process.env.NODE_ENV === 'production') {
  require('./build/production')(app)
}

if (process.env.NODE_ENV === 'development') {
  require('./build/development')(app)
}

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('500 Server Error.')
})

const port = process.env.PORT || require('../config/config').serverPort

app.listen(port, () => {
  console.log(`Server is running at port %d`, port)
})
