const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}))

app.use(webpackHotMiddleware(compiler))

app.get('/api/messages', (req, res) => {
  res.sendFile(path.join(__dirname, './api/messages.json'))
})

app.get('/api/chats', (req, res) => {
  res.sendFile(path.join(__dirname, './api/chats.json'))
})

app.get('/notifications.js', (req, res) => {
  res.sendFile(path.join(__dirname, './notifications.js'))
})

app.get('/manifest/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, './manifest/manifest.json'))
})

app.get('/manifest/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `./manifest/${req.params.file}`))
})

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, './service-worker.js'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080, (err) => {
  if (err) {
    return console.error(err) // eslint-disable-line no-console
  }
  console.log('Listening at http://localhost:8080') // eslint-disable-line no-console
})
